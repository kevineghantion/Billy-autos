import { useMemo } from 'react';
import { FLEET as FALLBACK_FLEET, Car } from '@/data/fleet';

const STORAGE_KEY = 'billy_autos_fleet';

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

// Load cars from localStorage (admin panel storage)
function loadStoredCars(): Car[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed: StoredCarData[] = JSON.parse(stored);
    return parsed.map((data) => ({
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
    }));
  } catch {
    return [];
  }
}

export interface UseFleetOptions {
  make?: string;
  bodyType?: string;
  year?: number | string;
  status?: 'available' | 'sold' | 'all';
  featured?: boolean;
}

export interface UseFleetReturn {
  cars: Car[];
  filteredCars: Car[];
  makes: string[];
  bodyTypes: string[];
  years: number[];
  isLoading: boolean;
}

export function useFleet(options: UseFleetOptions = {}): UseFleetReturn {
  const { make, bodyType, year, status = 'all', featured } = options;

  // Load cars from admin storage, fallback to static data if none exist
  const allCars = useMemo(() => {
    const storedCars = loadStoredCars();

    // If we have stored cars, use them; otherwise use fallback
    if (storedCars.length > 0) {
      return storedCars;
    }

    // Add status to fallback cars
    return FALLBACK_FLEET.map(car => ({
      ...car,
      status: 'available' as const,
    }));
  }, []);

  // Extract unique makes dynamically
  const makes = useMemo(() => {
    const uniqueMakes = [...new Set(allCars.map((car) => car.make))];
    return uniqueMakes.sort();
  }, [allCars]);

  // Extract unique body types dynamically
  const bodyTypes = useMemo(() => {
    const uniqueTypes = [...new Set(allCars.map((car) => car.bodyType))];
    return uniqueTypes.sort();
  }, [allCars]);

  // Extract unique years dynamically
  const years = useMemo(() => {
    const uniqueYears = [...new Set(allCars.map((car) => car.year))];
    return uniqueYears.sort((a, b) => b - a);
  }, [allCars]);

  // Apply filters
  const filteredCars = useMemo(() => {
    let result = [...allCars];

    if (make && make !== 'all') {
      result = result.filter((car) => car.make === make);
    }

    if (bodyType && bodyType !== 'all') {
      result = result.filter((car) => car.bodyType === bodyType);
    }

    if (year && year !== 'all') {
      const yearNum = typeof year === 'string' ? parseInt(year) : year;
      result = result.filter((car) => car.year === yearNum);
    }

    if (status !== 'all') {
      result = result.filter((car) => car.status === status);
    }

    if (featured !== undefined) {
      result = result.filter((car) => car.featured === featured);
    }

    return result;
  }, [allCars, make, bodyType, year, status, featured]);

  return {
    cars: allCars,
    filteredCars,
    makes,
    bodyTypes,
    years,
    isLoading: false,
  };
}
