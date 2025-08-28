import asyncio
import aiohttp
import subprocess
import json
import re
import logging
from typing import Dict, List, Any, Optional
import tempfile
import os

logger = logging.getLogger(__name__)

class OSINTTools:
    def __init__(self):
        self.whois_api_key = "9e2313b1509f3fc2bb2354f96566ac81cd2172e35df492bb82ce4dac4c9dfc88"
    
    async def check_whois(self, domain: str) -> Dict[str, Any]:
        """Check domain WHOIS information"""
        try:
            url = f"https://whoisjson.com/api/v1/whois?domain={domain}"
            headers = {
                'Authorization': f'Bearer {self.whois_api_key}',
                'Accept': 'application/json'
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers, timeout=10) as response:
                    if response.status == 200:
                        data = await response.json()
                        return {
                            'registered': True,
                            'registrar': data.get('registrar', 'Unknown'),
                            'creation_date': data.get('creation_date', 'Unknown'),
                            'expiration_date': data.get('expiration_date', 'Unknown'),
                            'status': data.get('status', []),
                            'raw_data': data
                        }
                    else:
                        return {'registered': False, 'error': f'HTTP {response.status}'}
        except Exception as e:
            logger.error(f"WHOIS check failed for {domain}: {str(e)}")
            return {'registered': False, 'error': str(e)}
    
    async def check_sherlock(self, username: str) -> List[str]:
        """Check username across platforms using Sherlock"""
        try:
            # Create temporary directory for output
            with tempfile.TemporaryDirectory() as temp_dir:
                output_file = os.path.join(temp_dir, "sherlock_results.txt")
                
                # Install Sherlock if not available
                try:
                    subprocess.run(['sherlock', '--version'], capture_output=True, check=True, timeout=5)
                except (subprocess.CalledProcessError, FileNotFoundError):
                    # Install Sherlock via pip
                    subprocess.run(['pip', 'install', 'sherlock-project'], check=True, timeout=60)
                
                # Run Sherlock with timeout and output to file
                cmd = [
                    'sherlock', username,
                    '--timeout', '10',
                    '--output', output_file,
                    '--print-found'
                ]
                
                process = subprocess.run(
                    cmd, 
                    capture_output=True, 
                    text=True, 
                    timeout=30  # 30 seconds timeout
                )
                
                # Parse results
                platforms_found = []
                if process.stdout:
                    lines = process.stdout.split('\n')
                    for line in lines:
                        if '[+]' in line and 'http' in line:
                            # Extract platform name from URL
                            match = re.search(r'https?://(?:www\.)?([^./]+)', line)
                            if match:
                                platform = match.group(1).replace('www.', '').title()
                                if platform not in platforms_found:
                                    platforms_found.append(platform)
                
                # Also try to read from output file if it exists
                if os.path.exists(output_file):
                    try:
                        with open(output_file, 'r') as f:
                            content = f.read()
                            lines = content.split('\n')
                            for line in lines:
                                if 'http' in line and username in line:
                                    match = re.search(r'https?://(?:www\.)?([^./]+)', line)
                                    if match:
                                        platform = match.group(1).replace('www.', '').title()
                                        if platform not in platforms_found:
                                            platforms_found.append(platform)
                    except Exception as e:
                        logger.error(f"Error reading Sherlock output file: {str(e)}")
                
                return platforms_found[:20]  # Limit to 20 results
                
        except subprocess.TimeoutExpired:
            logger.error(f"Sherlock timeout for username: {username}")
            return []
        except Exception as e:
            logger.error(f"Sherlock check failed for {username}: {str(e)}")
            return []
    
    async def check_holehe(self, email: str) -> List[str]:
        """Check email registration across platforms using Holehe"""
        try:
            # Install Holehe if not available
            try:
                subprocess.run(['holehe', '--help'], capture_output=True, check=True, timeout=5)
            except (subprocess.CalledProcessError, FileNotFoundError):
                # Install Holehe via pip
                subprocess.run(['pip', 'install', 'holehe'], check=True, timeout=60)
            
            # Run Holehe
            cmd = ['holehe', email, '--only-used']
            
            process = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=30  # 30 seconds timeout
            )
            
            platforms_found = []
            if process.stdout:
                lines = process.stdout.split('\n')
                for line in lines:
                    # Look for [+] indicating found platforms
                    if '[+]' in line:
                        # Extract platform name
                        parts = line.split()
                        for part in parts:
                            if part not in ['[+]', email, 'used', 'on'] and len(part) > 2:
                                platform = part.strip('.,!').title()
                                if platform and platform not in platforms_found:
                                    platforms_found.append(platform)
            
            return platforms_found[:15]  # Limit to 15 results
            
        except subprocess.TimeoutExpired:
            logger.error(f"Holehe timeout for email: {email}")
            return []
        except Exception as e:
            logger.error(f"Holehe check failed for {email}: {str(e)}")
            return []
    
    def calculate_privacy_score(self, results: Dict[str, Any]) -> int:
        """Calculate privacy exposure score (0-100, higher = more exposed)"""
        score = 0
        
        # WHOIS results (domain exposure)
        if results.get('whois', {}).get('registered'):
            score += 20  # Domain is registered and publicly visible
        
        # Sherlock results (username exposure)
        sherlock_count = len(results.get('sherlock', []))
        if sherlock_count > 0:
            # 5 points per platform, up to 40 points maximum
            score += min(sherlock_count * 5, 40)
        
        # Holehe results (email exposure)
        holehe_count = len(results.get('holehe', []))
        if holehe_count > 0:
            # 4 points per platform, up to 40 points maximum
            score += min(holehe_count * 4, 40)
        
        # Cap at 100
        return min(score, 100)
    
    def generate_summary(self, results: Dict[str, Any], score: int) -> str:
        """Generate a human-readable summary"""
        sherlock_count = len(results.get('sherlock', []))
        holehe_count = len(results.get('holehe', []))
        whois_registered = results.get('whois', {}).get('registered', False)
        
        if score < 20:
            risk_level = "Very Low"
            advice = "Your digital footprint is minimal. Consider this a good privacy baseline."
        elif score < 40:
            risk_level = "Low"
            advice = "Limited exposure detected. Review the found accounts and consider privacy settings."
        elif score < 60:
            risk_level = "Medium"
            advice = "Moderate exposure found. Consider reviewing privacy settings on detected platforms."
        elif score < 80:
            risk_level = "High"
            advice = "Significant exposure detected. Strongly consider enhancing your privacy measures."
        else:
            risk_level = "Very High"
            advice = "Extensive digital footprint found. Immediate privacy review recommended."
        
        summary_parts = [
            f"Privacy Risk: {risk_level} ({score}/100)."
        ]
        
        if whois_registered:
            summary_parts.append("Domain registration is publicly visible.")
        
        if sherlock_count > 0:
            summary_parts.append(f"Username found on {sherlock_count} platforms.")
        
        if holehe_count > 0:
            summary_parts.append(f"Email registered on {holehe_count} services.")
        
        summary_parts.append(advice)
        
        return " ".join(summary_parts)

# Global instance
osint_tools = OSINTTools()