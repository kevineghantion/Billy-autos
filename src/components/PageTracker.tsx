import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

export function PageTracker() {
    const location = useLocation();

    useEffect(() => {
        // Log page view on route change
        logEvent(analytics, 'page_view', {
            page_path: location.pathname + location.search,
            page_location: window.location.href,
            page_title: document.title
        });
    }, [location]);

    return null;
}
