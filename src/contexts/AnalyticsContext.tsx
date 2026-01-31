import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

const ANALYTICS_STORAGE_KEY = 'billy_autos_analytics';

interface CarAnalytics {
    views: number;
    inquiries: number;
    lastViewed?: string;
}

interface AnalyticsData {
    cars: Record<string, CarAnalytics>;
    totalViews: number;
    totalInquiries: number;
    siteVisits: number;
}

interface AnalyticsContextType {
    analytics: AnalyticsData;
    trackView: (carId: string) => void;
    trackInquiry: (carId: string) => void;
    trackSiteVisit: () => void;
    getCarAnalytics: (carId: string) => CarAnalytics;
    getTopViewed: (limit?: number) => Array<{ carId: string; views: number }>;
    getTopInquired: (limit?: number) => Array<{ carId: string; inquiries: number }>;
    resetAnalytics: () => void;
}

const defaultAnalytics: AnalyticsData = {
    cars: {},
    totalViews: 0,
    totalInquiries: 0,
    siteVisits: 0,
};

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

const getStoredAnalytics = (): AnalyticsData => {
    try {
        const stored = localStorage.getItem(ANALYTICS_STORAGE_KEY);
        // Migration: Add siteVisits if missing
        const parsed = stored ? JSON.parse(stored) : defaultAnalytics;
        return { ...defaultAnalytics, ...parsed };
    } catch {
        return defaultAnalytics;
    }
};

export function AnalyticsProvider({ children }: { children: ReactNode }) {
    const [analytics, setAnalytics] = useState<AnalyticsData>(getStoredAnalytics);

    // Persist to localStorage whenever analytics change
    useEffect(() => {
        localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(analytics));
    }, [analytics]);

    const trackSiteVisit = useCallback(() => {
        // Simple session check could be added here, but for now we track every "app load"
        // To be more accurate, we could check if we already tracked this session.
        // But the user just asked for "visits".
        const sessionKey = 'billy_autos_visited_session';
        if (!sessionStorage.getItem(sessionKey)) {
            sessionStorage.setItem(sessionKey, 'true');
            setAnalytics((prev) => ({
                ...prev,
                siteVisits: (prev.siteVisits || 0) + 1,
            }));
        }
    }, []);

    const trackView = useCallback((carId: string) => {
        setAnalytics((prev) => {
            const carData = prev.cars[carId] || { views: 0, inquiries: 0 };
            return {
                ...prev,
                totalViews: prev.totalViews + 1,
                cars: {
                    ...prev.cars,
                    [carId]: {
                        ...carData,
                        views: carData.views + 1,
                        lastViewed: new Date().toISOString(),
                    },
                },
            };
        });
    }, []);

    const trackInquiry = useCallback((carId: string) => {
        setAnalytics((prev) => {
            const carData = prev.cars[carId] || { views: 0, inquiries: 0 };
            return {
                ...prev,
                totalInquiries: prev.totalInquiries + 1,
                cars: {
                    ...prev.cars,
                    [carId]: {
                        ...carData,
                        inquiries: carData.inquiries + 1,
                    },
                },
            };
        });
    }, []);

    const getCarAnalytics = useCallback(
        (carId: string): CarAnalytics => {
            return analytics.cars[carId] || { views: 0, inquiries: 0 };
        },
        [analytics]
    );

    const getTopViewed = useCallback(
        (limit: number = 5): Array<{ carId: string; views: number }> => {
            return Object.entries(analytics.cars)
                .map(([carId, data]) => ({ carId, views: data.views }))
                .sort((a, b) => b.views - a.views)
                .slice(0, limit);
        },
        [analytics]
    );

    const getTopInquired = useCallback(
        (limit: number = 5): Array<{ carId: string; inquiries: number }> => {
            return Object.entries(analytics.cars)
                .map(([carId, data]) => ({ carId, inquiries: data.inquiries }))
                .filter((item) => item.inquiries > 0)
                .sort((a, b) => b.inquiries - a.inquiries)
                .slice(0, limit);
        },
        [analytics]
    );

    const resetAnalytics = useCallback(() => {
        setAnalytics(defaultAnalytics);
    }, []);

    return (
        <AnalyticsContext.Provider
            value={{
                analytics,
                trackView,
                trackInquiry,
                trackSiteVisit,
                getCarAnalytics,
                getTopViewed,
                getTopInquired,
                resetAnalytics,
            }}
        >
            {children}
        </AnalyticsContext.Provider>
    );
}

export function useAnalytics() {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error('useAnalytics must be used within an AnalyticsProvider');
    }
    return context;
}
