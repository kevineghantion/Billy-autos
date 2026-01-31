import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Car, formatPrice } from '@/data/fleet';
import { useFleetContext } from '@/contexts/FleetContext';
import { Button } from '@/components/ui/button';

export function FeaturedCarousel() {
  const { getFeaturedCars } = useFleetContext();
  const featuredCars = getFeaturedCars();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredCars.length);
  }, [featuredCars.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + featuredCars.length) % featuredCars.length);
  }, [featuredCars.length]);

  // Auto-advance carousel
  useEffect(() => {
    if (featuredCars.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, featuredCars.length]);

  if (featuredCars.length === 0) return null;

  const currentCar = featuredCars[currentIndex];

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-5 h-5 text-primary fill-primary" />
            <p className="text-primary font-display text-sm tracking-[0.3em]">
              FEATURED COLLECTION
            </p>
            <Star className="w-5 h-5 text-primary fill-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-foreground">
            HANDPICKED EXCELLENCE
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCar.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass-card overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative aspect-video md:aspect-auto overflow-hidden">
                  <img
                    src={currentCar.images[0]}
                    alt={`${currentCar.make} ${currentCar.model}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 md:block hidden" />

                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 bg-primary text-black px-4 py-2 font-display font-bold text-sm flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    FEATURED
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">
                    {currentCar.year} {currentCar.bodyType.toUpperCase()}
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl font-black text-foreground mb-4">
                    {currentCar.make.toUpperCase()}
                    <br />
                    {currentCar.model.toUpperCase()}
                  </h3>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="glass-card p-4">
                      <p className="text-muted-foreground text-xs mb-1">HORSEPOWER</p>
                      <p className="font-display text-xl font-bold text-foreground">
                        {currentCar.horsepower} HP
                      </p>
                    </div>
                    <div className="glass-card p-4">
                      <p className="text-muted-foreground text-xs mb-1">0-100 KM/H</p>
                      <p className="font-display text-xl font-bold text-foreground">
                        {currentCar.acceleration}
                      </p>
                    </div>
                    <div className="glass-card p-4">
                      <p className="text-muted-foreground text-xs mb-1">ENGINE</p>
                      <p className="font-display text-sm font-bold text-foreground">
                        {currentCar.engine}
                      </p>
                    </div>
                    <div className="glass-card p-4">
                      <p className="text-muted-foreground text-xs mb-1">PRICE</p>
                      <p className="font-display text-xl font-bold text-primary">
                        {currentCar.price === 0 ? 'P.O.A.' : formatPrice(currentCar.price)}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button className="btn-gold font-display tracking-wider w-full md:w-auto">
                    <a
                      href={`https://wa.me/96181999598?text=I'm interested in the ${currentCar.year} ${currentCar.make} ${currentCar.model}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      REQUEST VIP VIEWING
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {featuredCars.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-card flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-card flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {featuredCars.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {featuredCars.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
