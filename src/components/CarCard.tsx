import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Car, formatPrice, generateWhatsAppLink } from '@/data/fleet';
import { Button } from '@/components/ui/button';

interface CarCardProps {
  car: Car;
  index: number;
  onQuickView: (car: Car) => void;
}

export function CarCard({ car, index, onQuickView }: CarCardProps) {
  const isSold = car.status === 'sold';
  const isPOA = car.price === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative glass-card overflow-hidden dark-overlay-hover"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={car.images[0]}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover ken-burns"
        />

        {/* Dark Overlay */}
        <div className="dark-overlay" />

        {/* Spec Badge */}
        <div className="spec-badge">
          {car.year} • {car.mileage === 0 ? '0KM' : `${car.mileage.toLocaleString()}KM`}
        </div>

        {/* Price Tag - P.O.A. Logic */}
        <div className="absolute bottom-4 right-4 bg-destructive text-white px-4 py-2 font-display font-bold text-lg">
          {isPOA ? 'PRICE ON REQUEST' : formatPrice(car.price)}
        </div>

        {/* SOLD Overlay */}
        {isSold && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
            <div className="sold-ribbon">
              <span className="font-display text-2xl font-black tracking-widest text-white">
                SOLD
              </span>
            </div>
          </div>
        )}

        {/* Quick View Overlay - Only show if not sold */}
        {!isSold && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              onClick={() => onQuickView(car)}
              variant="outline"
              className="btn-glass font-display tracking-wider"
            >
              <Eye className="w-5 h-5 mr-2" />
              QUICK VIEW
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <p className="text-xs text-primary tracking-[0.2em] font-medium mb-1">
          {car.year} {car.bodyType.toUpperCase()}
        </p>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {car.make.toUpperCase()} {car.model.toUpperCase()}
        </h3>

        {/* Specs Row */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
            </svg>
            {car.horsepower} HP
          </span>
          <span>•</span>
          <span>{car.color}</span>
        </div>

        {/* CTA */}
        <a
          href={isSold ? undefined : generateWhatsAppLink(car)}
          target={isSold ? undefined : '_blank'}
          rel="noopener noreferrer"
          className={`block ${isSold ? 'pointer-events-none' : ''}`}
        >
          <Button
            className={`w-full font-display tracking-wider ${isSold ? 'btn-glass opacity-50' : 'btn-gold'}`}
            disabled={isSold}
          >
            {isSold ? 'SOLD' : 'REQUEST PRICE'}
          </Button>
        </a>
      </div>
    </motion.div>
  );
}
