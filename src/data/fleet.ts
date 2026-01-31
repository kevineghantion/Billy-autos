export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  bodyType: 'Hypercar' | 'Supercar' | 'SUV' | 'Sedan' | 'Coupe' | 'Convertible';
  engine: string;
  horsepower: number;
  acceleration: string; // 0-100 km/h
  transmission: string;
  color: string;
  interiorColor: string;
  fuelType: string;
  images: string[];
  featured: boolean;
  new: boolean;
  status?: 'available' | 'sold';
  specs: {
    topSpeed: string;
    torque: string;
    drivetrain: string;
    seats: number;
  };
}

export const FLEET: Car[] = [
  {
    id: 'ferrari-sf90-stradale',
    make: 'Ferrari',
    model: 'SF90 Stradale',
    year: 2024,
    price: 750000,
    mileage: 0,
    bodyType: 'Hypercar',
    engine: '4.0L V8 Twin-Turbo Hybrid',
    horsepower: 986,
    acceleration: '2.5s',
    transmission: '8-Speed Dual-Clutch',
    color: 'Rosso Corsa',
    interiorColor: 'Black Alcantara',
    fuelType: 'Hybrid',
    images: [
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&auto=format&fit=crop',
    ],
    featured: true,
    new: true,
    specs: {
      topSpeed: '340 km/h',
      torque: '800 Nm',
      drivetrain: 'AWD',
      seats: 2,
    },
  },
  {
    id: 'lamborghini-revuelto',
    make: 'Lamborghini',
    model: 'Revuelto',
    year: 2024,
    price: 620000,
    mileage: 0,
    bodyType: 'Hypercar',
    engine: '6.5L V12 Hybrid',
    horsepower: 1015,
    acceleration: '2.5s',
    transmission: '8-Speed Dual-Clutch',
    color: 'Verde Mantis',
    interiorColor: 'Nero Ade',
    fuelType: 'Hybrid',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop',
    ],
    featured: true,
    new: true,
    specs: {
      topSpeed: '350 km/h',
      torque: '725 Nm',
      drivetrain: 'AWD',
      seats: 2,
    },
  },
  {
    id: 'porsche-911-gt3-rs',
    make: 'Porsche',
    model: '911 GT3 RS',
    year: 2024,
    price: 320000,
    mileage: 500,
    bodyType: 'Supercar',
    engine: '4.0L Flat-6',
    horsepower: 518,
    acceleration: '3.2s',
    transmission: '7-Speed PDK',
    color: 'GT Silver',
    interiorColor: 'Black Leather',
    fuelType: 'Petrol',
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop',
    ],
    featured: true,
    new: false,
    specs: {
      topSpeed: '296 km/h',
      torque: '465 Nm',
      drivetrain: 'RWD',
      seats: 2,
    },
  },
  {
    id: 'mclaren-750s',
    make: 'McLaren',
    model: '750S',
    year: 2024,
    price: 450000,
    mileage: 0,
    bodyType: 'Supercar',
    engine: '4.0L V8 Twin-Turbo',
    horsepower: 750,
    acceleration: '2.8s',
    transmission: '7-Speed SSG',
    color: 'Papaya Spark',
    interiorColor: 'Carbon Black',
    fuelType: 'Petrol',
    images: [
      'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&auto=format&fit=crop',
    ],
    featured: true,
    new: true,
    specs: {
      topSpeed: '332 km/h',
      torque: '800 Nm',
      drivetrain: 'RWD',
      seats: 2,
    },
  },
  {
    id: 'rolls-royce-cullinan',
    make: 'Rolls-Royce',
    model: 'Cullinan Black Badge',
    year: 2024,
    price: 480000,
    mileage: 200,
    bodyType: 'SUV',
    engine: '6.75L V12 Twin-Turbo',
    horsepower: 600,
    acceleration: '4.8s',
    transmission: '8-Speed Automatic',
    color: 'Black Diamond',
    interiorColor: 'Mandarin Orange',
    fuelType: 'Petrol',
    images: [
      'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&auto=format&fit=crop',
    ],
    featured: true,
    new: false,
    specs: {
      topSpeed: '280 km/h',
      torque: '900 Nm',
      drivetrain: 'AWD',
      seats: 5,
    },
  },
  {
    id: 'bentley-continental-gt',
    make: 'Bentley',
    model: 'Continental GT Speed',
    year: 2024,
    price: 380000,
    mileage: 0,
    bodyType: 'Coupe',
    engine: '6.0L W12 Twin-Turbo',
    horsepower: 659,
    acceleration: '3.5s',
    transmission: '8-Speed Dual-Clutch',
    color: 'Glacier White',
    interiorColor: 'Beluga',
    fuelType: 'Petrol',
    images: [
      'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&auto=format&fit=crop',
    ],
    featured: false,
    new: true,
    specs: {
      topSpeed: '335 km/h',
      torque: '900 Nm',
      drivetrain: 'AWD',
      seats: 4,
    },
  },
  {
    id: 'mercedes-amg-gt-black',
    make: 'Mercedes-AMG',
    model: 'GT Black Series',
    year: 2023,
    price: 420000,
    mileage: 1200,
    bodyType: 'Supercar',
    engine: '4.0L V8 Twin-Turbo',
    horsepower: 730,
    acceleration: '3.1s',
    transmission: '7-Speed AMG Speedshift',
    color: 'Magno Grey',
    interiorColor: 'Black Nappa',
    fuelType: 'Petrol',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop',
    ],
    featured: false,
    new: false,
    specs: {
      topSpeed: '325 km/h',
      torque: '800 Nm',
      drivetrain: 'RWD',
      seats: 2,
    },
  },
  {
    id: 'aston-martin-dbs',
    make: 'Aston Martin',
    model: 'DBS Superleggera',
    year: 2024,
    price: 390000,
    mileage: 0,
    bodyType: 'Coupe',
    engine: '5.2L V12 Twin-Turbo',
    horsepower: 715,
    acceleration: '3.4s',
    transmission: '8-Speed Automatic',
    color: 'Quantum Silver',
    interiorColor: 'Obsidian Black',
    fuelType: 'Petrol',
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop',
    ],
    featured: false,
    new: true,
    specs: {
      topSpeed: '340 km/h',
      torque: '900 Nm',
      drivetrain: 'RWD',
      seats: 4,
    },
  },
  {
    id: 'bugatti-chiron',
    make: 'Bugatti',
    model: 'Chiron Sport',
    year: 2023,
    price: 3200000,
    mileage: 800,
    bodyType: 'Hypercar',
    engine: '8.0L W16 Quad-Turbo',
    horsepower: 1500,
    acceleration: '2.4s',
    transmission: '7-Speed Dual-Clutch',
    color: 'French Racing Blue',
    interiorColor: 'Cognac Leather',
    fuelType: 'Petrol',
    images: [
      'https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=800&auto=format&fit=crop',
    ],
    featured: true,
    new: false,
    specs: {
      topSpeed: '420 km/h',
      torque: '1600 Nm',
      drivetrain: 'AWD',
      seats: 2,
    },
  },
];

export const MAKES = [...new Set(FLEET.map((car) => car.make))];
export const BODY_TYPES = [...new Set(FLEET.map((car) => car.bodyType))];
export const YEARS = [...new Set(FLEET.map((car) => car.year))].sort((a, b) => b - a);

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const generateWhatsAppLink = (car: Car): string => {
  const message = encodeURIComponent(
    `Hello Billy Autos, I am interested in the ${car.year} ${car.make} ${car.model} I saw on your website. Please provide more details.`
  );
  return `https://wa.me/96181999598?text=${message}`;
};
