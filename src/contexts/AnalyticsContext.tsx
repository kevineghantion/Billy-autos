import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, updateDoc, increment, setDoc, getDoc } from 'firebase/firestore';

interface CarAnalytics {
    views: number;
    inquiries: number;
    lastViewed?: string;
}

interface AnalyticsData {
    cars: Record<string, CarAnalytics>;
    totalViews: number; // Car views
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

export function AnalyticsProvider({ children }: { children: ReactNode }) {
    const [analytics, setAnalytics] = useState<AnalyticsData>(defaultAnalytics);

    // Sync with Firestore
    useEffect(() => {
        // Subscribe to global stats
        const unsubGlobal = onSnapshot(doc(db, 'analytics', 'global'), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setAnalytics(prev => ({
                    ...prev,
                    totalViews: data.totalViews || 0,
                    totalInquiries: data.totalInquiries || 0,
                    siteVisits: data.siteVisits || 0,
                }));
            } else {
                // Create if doesn't exist
                setDoc(doc(db, 'analytics', 'global'), {
                    totalViews: 0,
                    totalInquiries: 0,
                    siteVisits: 0
                });
            }
        });

        // Subscribe to car stats (fetching all for now as fleet is manageable)
        // In a large app, we'd only fetch needed ones or top lists.
        const unsubCars = onSnapshot(doc(db, 'analytics', 'cars'), (docSnap) => {
            if (docSnap.exists()) {
                setAnalytics(prev => ({
                    ...prev,
                    cars: docSnap.data() as Record<string, CarAnalytics>
                }));
            } else {
                setDoc(doc(db, 'analytics', 'cars'), {});
            }
        });

        return () => {
            unsubGlobal();
            unsubCars();
        };
    }, []);

    const trackSiteVisit = useCallback(async () => {
        try {
            await updateDoc(doc(db, 'analytics', 'global'), {
                siteVisits: increment(1)
            });
        } catch (error) {
            console.error("Error tracking visit:", error);
        }
    }, []);

    const trackView = useCallback(async (carId: string) => {
        try {
            // Update global
            await updateDoc(doc(db, 'analytics', 'global'), {
                totalViews: increment(1)
            });
            // Update car stats (using nested object notation for 'cars' document)
            // Note: For massive scale, use a subcollection. For this scale, a single map document is cheaper/easier.
            await setDoc(doc(db, 'analytics', 'cars'), {
                [carId]: {
                    views: increment(1),
                    lastViewed: new Date().toISOString()
                }
            }, { merge: true });
        } catch (error) {
            console.error("Error tracking view:", error);
        }
    }, []);

    const trackInquiry = useCallback(async (carId: string) => {
        try {
            await updateDoc(doc(db, 'analytics', 'global'), {
                totalInquiries: increment(1)
            });
            await setDoc(doc(db, 'analytics', 'cars'), {
                [carId]: {
                    inquiries: increment(1)
                }
            }, { merge: true });
        } catch (error) {
            console.error("Error tracking inquiry:", error);
        }
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
                .map(([carId, data]) => ({ carId, views: data.views || 0 }))
                .sort((a, b) => b.views - a.views)
                .slice(0, limit);
        },
        [analytics]
    );

    const getTopInquired = useCallback(
        (limit: number = 5): Array<{ carId: string; inquiries: number }> => {
            return Object.entries(analytics.cars)
                .map(([carId, data]) => ({ carId, inquiries: data.inquiries || 0 }))
                .filter((item) => item.inquiries > 0)
                .sort((a, b) => b.inquiries - a.inquiries)
                .slice(0, limit);
        },
        [analytics]
    );

    const resetAnalytics = useCallback(() => {
        // Admin only function - could implement clear logic here if needed
        console.log("Reset not implemented for live DB");
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
