import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Car, FLEET as FALLBACK_FLEET } from '@/data/fleet';

const STORAGE_KEY = 'billy_autos_fleet';

// Initial seed data - 6 high-quality cars
const INITIAL_FLEET: Car[] = FALLBACK_FLEET.slice(0, 6).map(car => ({
  ...car,
  status: 'available' as const,
}));

// Type for admin-stored cars
interface StoredCarData {
  id: string;
  name: string;
  make: string;
  year: number;
  price: number;
  status: 'available' | 'sold';
  bodyType: string;
  color: string;
  interiorColor: string;
  coverImage: string;
  gallery: string[];
  specs: {
    mileage: number;
    horsepower: number;
    engine: string;
    acceleration: string;
    topSpeed: string;
    transmission: string;
    drivetrain: string;
    fuelType: string;
    torque: string;
    seats: number;
  };
  featured: boolean;
  isNew: boolean;
}

// Convert stored data to Car format
function storedToCar(data: StoredCarData): Car {
  return {
    id: data.id,
    make: data.make,
    model: data.name.replace(data.make, '').trim() || data.name,
    year: data.year,
    price: data.price,
    mileage: data.specs.mileage,
    bodyType: data.bodyType as Car['bodyType'],
    engine: data.specs.engine,
    horsepower: data.specs.horsepower,
    acceleration: data.specs.acceleration || '3.0s',
    transmission: data.specs.transmission || 'Automatic',
    color: data.color,
    interiorColor: data.interiorColor || 'Black',
    fuelType: data.specs.fuelType || 'Petrol',
    images: [data.coverImage, ...data.gallery].filter(Boolean),
    featured: data.featured,
    new: data.isNew,
    status: data.status,
    specs: {
      topSpeed: data.specs.topSpeed || '300 km/h',
      torque: data.specs.torque || '700 Nm',
      drivetrain: data.specs.drivetrain || 'RWD',
      seats: data.specs.seats || 2,
    },
  };
}

// Convert Car to stored format
function carToStored(car: Car): StoredCarData {
  return {
    id: car.id,
    name: `${car.make} ${car.model}`,
    make: car.make,
    year: car.year,
    price: car.price,
    status: car.status || 'available',
    bodyType: car.bodyType,
    color: car.color,
    interiorColor: car.interiorColor,
    coverImage: car.images[0] || '',
    gallery: car.images.slice(1),
    specs: {
      mileage: car.mileage,
      horsepower: car.horsepower,
      engine: car.engine,
      acceleration: car.acceleration,
      topSpeed: car.specs.topSpeed,
      transmission: car.transmission,
      drivetrain: car.specs.drivetrain,
      fuelType: car.fuelType,
      torque: car.specs.torque,
      seats: car.specs.seats,
    },
    featured: car.featured,
    isNew: car.new,
  };
}

interface FleetContextType {
  cars: Car[];
  makes: string[];
  bodyTypes: string[];
  years: number[];
  addCar: (car: Omit<Car, 'id'>) => void;
  updateCar: (id: string, car: Partial<Car>) => void;
  deleteCar: (id: string) => void;
  getCarById: (id: string) => Car | undefined;
  getFeaturedCars: () => Car[];
  getFilteredCars: (filters: { make?: string; bodyType?: string; year?: number | string; status?: string }) => Car[];
}

const FleetContext = createContext<FleetContextType | undefined>(undefined);

export function FleetProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: StoredCarData[] = JSON.parse(stored);
        if (parsed.length > 0) {
          return parsed.map(storedToCar);
        }
      }
      // CRITICAL FALLBACK: Seed with initial fleet if empty
      const seededCars = INITIAL_FLEET;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seededCars.map(carToStored)));
      return seededCars;
    } catch {
      return INITIAL_FLEET;
    }
  });

  // Persist to localStorage whenever cars change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cars.map(carToStored)));
  }, [cars]);

  // Extract unique makes dynamically
  const makes = [...new Set(cars.map((car) => car.make))].sort();

  // Extract unique body types dynamically
  const bodyTypes = [...new Set(cars.map((car) => car.bodyType))].sort();

  // Extract unique years dynamically
  const years = [...new Set(cars.map((car) => car.year))].sort((a, b) => b - a);

  const addCar = useCallback((carData: Omit<Car, 'id'>) => {
    const newCar: Car = {
      ...carData,
      id: `car-${Date.now()}`,
    };
    setCars((prev) => [...prev, newCar]);
  }, []);

  const updateCar = useCallback((id: string, updates: Partial<Car>) => {
    setCars((prev) =>
      prev.map((car) => (car.id === id ? { ...car, ...updates } : car))
    );
  }, []);

  const deleteCar = useCallback((id: string) => {
    setCars((prev) => prev.filter((car) => car.id !== id));
  }, []);

  const getCarById = useCallback(
    (id: string) => cars.find((car) => car.id === id),
    [cars]
  );

  const getFeaturedCars = useCallback(
    () => cars.filter((car) => car.featured),
    [cars]
  );

  const getFilteredCars = useCallback(
    (filters: { make?: string; bodyType?: string; year?: number | string; status?: string }) => {
      let result = [...cars];

      if (filters.make && filters.make !== 'all') {
        result = result.filter((car) => car.make === filters.make);
      }

      if (filters.bodyType && filters.bodyType !== 'all') {
        result = result.filter((car) => car.bodyType === filters.bodyType);
      }

      if (filters.year && filters.year !== 'all') {
        const yearNum = typeof filters.year === 'string' ? parseInt(filters.year) : filters.year;
        result = result.filter((car) => car.year === yearNum);
      }

      if (filters.status && filters.status !== 'all') {
        result = result.filter((car) => car.status === filters.status);
      }

      return result;
    },
    [cars]
  );

  return (
    <FleetContext.Provider
      value={{
        cars,
        makes,
        bodyTypes,
        years,
        addCar,
        updateCar,
        deleteCar,
        getCarById,
        getFeaturedCars,
        getFilteredCars,
      }}
    >
      {children}
    </FleetContext.Provider>
  );
}

export function useFleetContext() {
  const context = useContext(FleetContext);
  if (!context) {
    throw new Error('useFleetContext must be used within a FleetProvider');
  }
  return context;
}
