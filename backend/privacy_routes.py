from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, validator
from typing import Literal, Dict, Any
import asyncio
import re
import logging
from osint_tools import osint_tools
from mock_osint import mock_osint

logger = logging.getLogger(__name__)

privacy_router = APIRouter(prefix="/api", tags=["privacy"])

class PrivacyCheckRequest(BaseModel):
    type: Literal["email", "username", "domain"]
    value: str
    
    @validator('value')
    def validate_input(cls, v, values):
        input_type = values.get('type')
        v = v.strip()
        
        if not v:
            raise ValueError("Input value cannot be empty")
        
        if input_type == "email":
            # Basic email validation
            if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', v):
                raise ValueError("Invalid email format")
        elif input_type == "username":
            # Username validation - alphanumeric, dots, hyphens, underscores
            if not re.match(r'^[a-zA-Z0-9._-]+$', v) or len(v) < 2 or len(v) > 50:
                raise ValueError("Invalid username format (2-50 chars, alphanumeric with ._- allowed)")
        elif input_type == "domain":
            # Domain validation
            if not re.match(r'^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', v):
                raise ValueError("Invalid domain format")
        
        return v

class ReportRequest(BaseModel):
    results: Dict[str, Any]
    format: Literal["pdf", "html"]
    inputType: str
    inputValue: str

@privacy_router.post("/privacy-check")
async def check_privacy_exposure(request: PrivacyCheckRequest):
    """
    Perform OSINT privacy exposure check
    """
    try:
        results = {}
        
        # Run appropriate checks based on input type
        # Use mock data for demo purposes (faster and more reliable)
        # In production, you can switch to real OSINT tools
        USE_MOCK = True  # Set to False for real OSINT tools
        
        if USE_MOCK:
            if request.type == "email":
                # Use mock data for email
                logger.info(f"Using mock Holehe check for email: {request.value}")
                holehe_results = mock_osint.get_mock_holehe_results(request.value)
                results['holehe'] = holehe_results
                
                # Also check username part
                username_part = request.value.split('@')[0]
                if len(username_part) >= 3:
                    logger.info(f"Using mock Sherlock check for username part: {username_part}")
                    sherlock_results = mock_osint.get_mock_sherlock_results(username_part)
                    results['sherlock'] = sherlock_results
            
            elif request.type == "username":
                # Use mock data for username
                logger.info(f"Using mock Sherlock check for username: {request.value}")
                sherlock_results = mock_osint.get_mock_sherlock_results(request.value)
                results['sherlock'] = sherlock_results
            
            elif request.type == "domain":
                # Use mock data for domain (but real WHOIS for demonstration)
                logger.info(f"Running WHOIS check for domain: {request.value}")
                whois_results = await osint_tools.check_whois(request.value)
                if whois_results.get('error'):
                    # Fallback to mock data if WHOIS fails
                    whois_results = mock_osint.get_mock_whois_results(request.value)
                results['whois'] = whois_results
        else:
            # Real OSINT tools (original implementation)
            if request.type == "email":
                # Run Holehe for email
                logger.info(f"Running Holehe check for email: {request.value}")
                holehe_results = await osint_tools.check_holehe(request.value)
                results['holehe'] = holehe_results
                
                # Also check username part for Sherlock
                username_part = request.value.split('@')[0]
                if len(username_part) >= 3:  # Only check if username is meaningful
                    logger.info(f"Running Sherlock check for username part: {username_part}")
                    sherlock_results = await osint_tools.check_sherlock(username_part)
                    results['sherlock'] = sherlock_results
            
            elif request.type == "username":
                # Run Sherlock for username
                logger.info(f"Running Sherlock check for username: {request.value}")
                sherlock_results = await osint_tools.check_sherlock(request.value)
                results['sherlock'] = sherlock_results
            
            elif request.type == "domain":
                # Run WHOIS for domain
                logger.info(f"Running WHOIS check for domain: {request.value}")
                whois_results = await osint_tools.check_whois(request.value)
                results['whois'] = whois_results
        
        # Calculate privacy exposure score
        score = osint_tools.calculate_privacy_score(results)
        
        # Generate summary
        summary = osint_tools.generate_summary(results, score)
        
        response = {
            'score': score,
            'summary': summary,
            'timestamp': asyncio.get_event_loop().time(),
            **results
        }
        
        logger.info(f"Privacy check completed for {request.type}: {request.value}, Score: {score}")
        return response
        
    except Exception as e:
        logger.error(f"Privacy check failed for {request.type}: {request.value} - {str(e)}")
        raise HTTPException(status_code=500, detail=f"Privacy check failed: {str(e)}")

@privacy_router.post("/generate-report")
async def generate_report(request: ReportRequest):
    """
    Generate downloadable privacy report
    """
    try:
        if request.format == "html":
            return await generate_html_report(request)
        elif request.format == "pdf":
            return await generate_pdf_report(request)
        else:
            raise HTTPException(status_code=400, detail="Unsupported format")
    
    except Exception as e:
        logger.error(f"Report generation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Report generation failed: {str(e)}")

async def generate_html_report(request: ReportRequest):
    """Generate HTML report"""
    from fastapi.responses import HTMLResponse
    
    results = request.results
    
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ICU Privacy Exposure Report</title>
        <style>
            body {{ font-family: 'Arial', sans-serif; background: #0a0a0a; color: #ffffff; margin: 0; padding: 20px; }}
            .container {{ max-width: 800px; margin: 0 auto; }}
            .header {{ text-align: center; margin-bottom: 40px; }}
            .logo {{ color: #00ffff; font-size: 2.5em; font-weight: bold; }}
            .score {{ font-size: 3em; color: #00ffff; margin: 20px 0; }}
            .section {{ background: rgba(255,255,255,0.1); padding: 20px; margin: 20px 0; border-radius: 10px; }}
            .risk-high {{ color: #ff4444; }}
            .risk-medium {{ color: #ffaa00; }}
            .risk-low {{ color: #44ff44; }}
            .platform {{ background: rgba(0,255,255,0.2); padding: 5px 10px; margin: 5px; border-radius: 5px; display: inline-block; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">ICU PRIVACY REPORT</div>
                <p>Privacy Exposure Analysis for: <strong>{request.inputValue}</strong></p>
                <p>Generated on: {asyncio.get_event_loop().time()}</p>
            </div>
            
            <div class="section">
                <h2>Privacy Exposure Score</h2>
                <div class="score {'risk-high' if results.get('score', 0) >= 60 else 'risk-medium' if results.get('score', 0) >= 30 else 'risk-low'}">
                    {results.get('score', 0)}/100
                </div>
                <p>{results.get('summary', 'No summary available')}</p>
            </div>
            
            {f'''
            <div class="section">
                <h3>Domain Information (WHOIS)</h3>
                <p><strong>Registered:</strong> {'Yes' if results.get('whois', {}).get('registered') else 'No'}</p>
                {f"<p><strong>Registrar:</strong> {results['whois'].get('registrar', 'Unknown')}</p>" if results.get('whois', {}).get('registrar') else ''}
                {f"<p><strong>Creation Date:</strong> {results['whois'].get('creation_date', 'Unknown')}</p>" if results.get('whois', {}).get('creation_date') else ''}
            </div>
            ''' if results.get('whois') else ''}
            
            {f'''
            <div class="section">
                <h3>Username Found On Platforms</h3>
                <div>
                    {' '.join([f'<span class="platform">{platform}</span>' for platform in results.get('sherlock', [])])}
                </div>
                <p>Total platforms: {len(results.get('sherlock', []))}</p>
            </div>
            ''' if results.get('sherlock') else ''}
            
            {f'''
            <div class="section">
                <h3>Email Registered On Services</h3>
                <div>
                    {' '.join([f'<span class="platform">{platform}</span>' for platform in results.get('holehe', [])])}
                </div>
                <p>Total services: {len(results.get('holehe', []))}</p>
            </div>
            ''' if results.get('holehe') else ''}
            
            <div class="section">
                <h3>Privacy Recommendations</h3>
                <ul>
                    <li>Review privacy settings on all discovered platforms</li>
                    <li>Consider using different usernames for different services</li>
                    <li>Enable two-factor authentication where available</li>
                    <li>Regularly audit your digital footprint</li>
                    <li>Use privacy-focused email services for sensitive accounts</li>
                </ul>
            </div>
            
            <div class="section">
                <p style="text-align: center; color: #666;">
                    Generated by ICU Privacy Mirror - No data stored, completely ephemeral
                </p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return HTMLResponse(content=html_content)

async def generate_pdf_report(request: ReportRequest):
    """Generate PDF report (placeholder - would need additional dependencies)"""
    # For now, return HTML as PDF generation requires additional libraries
    # In production, you'd use libraries like weasyprint or reportlab
    return await generate_html_report(request)