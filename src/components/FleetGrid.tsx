import { useState } from 'react';
import { motion } from 'framer-motion';
import { Car } from '@/data/fleet';
import { CarCard } from './CarCard';
import { CarDrawer } from './CarDrawer';
import { useFleetContext } from '@/contexts/FleetContext';

interface FleetGridProps {
  cars?: Car[];
  title?: string;
  subtitle?: string;
  showAll?: boolean;
}

export function FleetGrid({
  cars: propCars,
  title = 'THE VAULT',
  subtitle = 'Explore Our Collection of Luxury Cars',
  showAll = false,
}: FleetGridProps) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  
  // Use provided cars or get from context
  const { cars: contextCars } = useFleetContext();
  const cars = propCars || contextCars;
  const displayCars = showAll ? cars : cars.slice(0, 6);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg">{subtitle}</p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCars.map((car, index) => (
            <CarCard
              key={car.id}
              car={car}
              index={index}
              onQuickView={setSelectedCar}
            />
          ))}
        </div>

        {/* View All Button */}
        {!showAll && cars.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="/fleet"
              className="inline-block btn-glass px-8 py-4 font-display tracking-wider text-foreground hover:text-primary transition-colors rounded-lg"
            >
              VIEW ENTIRE COLLECTION →
            </a>
          </motion.div>
        )}
      </div>

      {/* Quick View Drawer */}
      <CarDrawer car={selectedCar} onClose={() => setSelectedCar(null)} />
    </section>
  );
}
