import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

const FAVORITES_STORAGE_KEY = 'billy_autos_favorites';

interface FavoritesContextType {
    favorites: string[];
    isFavorite: (carId: string) => boolean;
    toggleFavorite: (carId: string) => void;
    addFavorite: (carId: string) => void;
    removeFavorite: (carId: string) => void;
    clearFavorites: () => void;
    favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>(() => {
        try {
            const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // Persist to localStorage whenever favorites change
    useEffect(() => {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const isFavorite = useCallback(
        (carId: string) => favorites.includes(carId),
        [favorites]
    );

    const addFavorite = useCallback((carId: string) => {
        setFavorites((prev) => {
            if (prev.includes(carId)) return prev;
            return [...prev, carId];
        });
    }, []);

    const removeFavorite = useCallback((carId: string) => {
        setFavorites((prev) => prev.filter((id) => id !== carId));
    }, []);

    const toggleFavorite = useCallback((carId: string) => {
        setFavorites((prev) => {
            if (prev.includes(carId)) {
                return prev.filter((id) => id !== carId);
            }
            return [...prev, carId];
        });
    }, []);

    const clearFavorites = useCallback(() => {
        setFavorites([]);
    }, []);

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                isFavorite,
                toggleFavorite,
                addFavorite,
                removeFavorite,
                clearFavorites,
                favoritesCount: favorites.length,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
