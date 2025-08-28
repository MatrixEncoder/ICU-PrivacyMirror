"""
Mock OSINT data for testing and demonstration purposes
"""
import random
from typing import Dict, List, Any

class MockOSINT:
    def __init__(self):
        self.mock_sherlock_platforms = [
            "GitHub", "Twitter", "Instagram", "Facebook", "LinkedIn", "Reddit", "TikTok",
            "YouTube", "Snapchat", "Pinterest", "Telegram", "Discord", "Twitch", 
            "Steam", "PlayStation", "Xbox", "Behance", "DeviantArt", "Flickr",
            "SoundCloud", "Spotify", "Last.fm", "Goodreads", "Medium"
        ]
        
        self.mock_holehe_platforms = [
            "Gmail", "Yahoo", "Outlook", "Apple", "Facebook", "Twitter", "Instagram",
            "Netflix", "Amazon", "Spotify", "Adobe", "Dropbox", "OneDrive",
            "PayPal", "eBay", "LinkedIn", "GitHub", "Discord", "Telegram",
            "WhatsApp", "Signal", "Zoom", "Skype", "Slack"
        ]
    
    def get_mock_sherlock_results(self, username: str) -> List[str]:
        """Generate mock Sherlock results based on username"""
        # Simulate realistic results based on username characteristics
        if len(username) < 5:
            # Short usernames are often taken on many platforms
            return random.sample(self.mock_sherlock_platforms, random.randint(8, 15))
        elif username.startswith("test") or username.startswith("demo"):
            # Test/demo accounts are commonly found
            return random.sample(self.mock_sherlock_platforms, random.randint(5, 10))
        elif any(char.isdigit() for char in username):
            # Usernames with numbers are somewhat common
            return random.sample(self.mock_sherlock_platforms, random.randint(3, 8))
        else:
            # Unique usernames might have fewer matches
            return random.sample(self.mock_sherlock_platforms, random.randint(1, 5))
    
    def get_mock_holehe_results(self, email: str) -> List[str]:
        """Generate mock Holehe results based on email"""
        domain = email.split('@')[1].lower() if '@' in email else 'unknown'
        
        if domain in ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']:
            # Popular email providers often have many registrations
            return random.sample(self.mock_holehe_platforms, random.randint(6, 12))
        elif domain in ['protonmail.com', 'tutanota.com', 'encrypted.com']:
            # Privacy-focused emails might have fewer registrations
            return random.sample(self.mock_holehe_platforms, random.randint(2, 6))
        elif 'test' in email or 'demo' in email:
            # Test/demo emails
            return random.sample(self.mock_holehe_platforms, random.randint(4, 8))
        else:
            # Other domains
            return random.sample(self.mock_holehe_platforms, random.randint(3, 9))
    
    def get_mock_whois_results(self, domain: str) -> Dict[str, Any]:
        """Generate mock WHOIS results based on domain"""
        well_known_domains = [
            'google.com', 'facebook.com', 'twitter.com', 'github.com', 'amazon.com',
            'microsoft.com', 'apple.com', 'netflix.com', 'spotify.com', 'adobe.com'
        ]
        
        if domain.lower() in well_known_domains:
            return {
                'registered': True,
                'registrar': 'MarkMonitor Inc.',
                'creation_date': '1997-09-15',
                'expiration_date': '2028-09-14',
                'status': ['clientDeleteProhibited', 'clientTransferProhibited', 'clientUpdateProhibited']
            }
        elif domain.endswith('.com') or domain.endswith('.org'):
            return {
                'registered': True,
                'registrar': 'GoDaddy.com LLC',
                'creation_date': '2019-03-10',
                'expiration_date': '2025-03-10',
                'status': ['clientTransferProhibited']
            }
        elif 'test' in domain or 'demo' in domain:
            return {
                'registered': True,
                'registrar': 'Namecheap Inc.',
                'creation_date': '2023-01-15',
                'expiration_date': '2024-01-15',
                'status': ['ok']
            }
        else:
            return {
                'registered': False,
                'error': 'Domain not found in registry'
            }

# Global instance
mock_osint = MockOSINT()