import { useEffect } from 'react';

interface PlatformTrackerProps {
  apiBaseUrl: string;
  pageUrl?: string;
}

const PlatformTracker: React.FC<PlatformTrackerProps> = ({ apiBaseUrl, pageUrl = '/' }) => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Get or create session ID
        let sessionId = localStorage.getItem('platform_session_id');
        if (!sessionId) {
          sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
          localStorage.setItem('platform_session_id', sessionId);
        }

        // Log the platform visit
        const response = await fetch(`${apiBaseUrl}/api/PlatformVisits`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: sessionId,
            pageUrl: pageUrl
          }),
        });

        if (response.ok) {
          const result = await response.json();

        }
      } catch (error) {
        // Silent fail - don't disrupt user experience

      }
    };

    // Track visit on component mount
    trackVisit();
  }, [apiBaseUrl, pageUrl]);

  // This component renders nothing - it's just for tracking
  return null;
};

export default PlatformTracker; 