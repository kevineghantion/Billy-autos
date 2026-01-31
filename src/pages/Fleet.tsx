import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import { SearchBar } from '@/components/SearchBar';
import { CarCard } from '@/components/CarCard';
import { CarDrawer } from '@/components/CarDrawer';
import { SEOHead } from '@/components/SEOHead';
import { useFleetContext } from '@/contexts/FleetContext';
import { Car } from '@/data/fleet';

const FleetPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const { getFilteredCars } = useFleetContext();

  // Get filter params from URL (deep linking)
  const make = searchParams.get('make') || undefined;
  const bodyType = searchParams.get('bodyType') || undefined;
  const year = searchParams.get('year') || undefined;

  // Get filtered cars from context
  const filteredCars = getFilteredCars({
    make: make === 'all' ? undefined : make,
    bodyType: bodyType === 'all' ? undefined : bodyType,
    year: year === 'all' ? undefined : year,
  });

  // Build SEO title based on filters
  const seoTitle = make && make !== 'all'
    ? `${make} Luxury Cars | Billy Autos Lebanon`
    : 'The Fleet | Billy Autos Lebanon';

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={seoTitle}
        description={`Browse ${filteredCars.length} luxury vehicles. ${make ? `${make} collection available.` : 'Ferrari, Lamborghini, Porsche and more.'}`}
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-4">
              EXPLORE OUR COLLECTION
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-black text-foreground mb-4">
              THE FLEET
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Browse our curated selection of the world's most exclusive hypercars,
              supercars, and luxury vehicles available in Lebanon.
            </p>
          </motion.div>

          <SearchBar compact onFleetPage />
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Count */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-semibold">{filteredCars.length}</span> vehicles
              {make && make !== 'all' && (
                <span className="text-primary ml-2">• {make}</span>
              )}
            </p>
          </div>

          {/* Grid */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car, index) => (
                <CarCard
                  key={car.id}
                  car={car}
                  index={index}
                  onQuickView={setSelectedCar}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl font-display text-muted-foreground mb-4">
                No vehicles match your criteria
              </p>
              <p className="text-muted-foreground">
                Try adjusting your filters or{' '}
                <a href="/fleet" className="text-primary hover:underline">
                  view all vehicles
                </a>
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />

      {/* Quick View Drawer */}
      <CarDrawer car={selectedCar} onClose={() => setSelectedCar(null)} />
    </div>
  );
};

export default FleetPage;
