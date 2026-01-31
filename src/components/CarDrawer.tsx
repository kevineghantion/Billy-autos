import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Calendar, Gauge, Fuel, Settings, Users } from 'lucide-react';
import { Car, formatPrice, generateWhatsAppLink } from '@/data/fleet';
import { Button } from '@/components/ui/button';

interface CarDrawerProps {
  car: Car | null;
  onClose: () => void;
}

export function CarDrawer({ car, onClose }: CarDrawerProps) {
  if (!car) return null;

  return (
    <AnimatePresence>
      {car && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-xl bg-card border-l border-white/10 z-50 overflow-y-auto scrollbar-luxury"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="relative aspect-video">
              <img
                src={car.images[0]}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              
              {/* Price Overlay */}
              <div className="absolute bottom-4 left-4">
                <p className="text-sm text-primary font-display tracking-wider mb-1">
                  STARTING FROM
                </p>
                <p className="text-3xl font-display font-bold text-foreground">
                  {formatPrice(car.price)}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Header */}
              <div className="mb-6">
                <p className="text-primary text-sm tracking-[0.2em] font-medium mb-2">
                  {car.year} {car.bodyType.toUpperCase()}
                </p>
                <h2 className="font-display text-3xl font-bold text-foreground">
                  {car.make} {car.model}
                </h2>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="glass-card p-4 text-center">
                  <Gauge className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-display font-bold text-foreground">
                    {car.horsepower}
                  </p>
                  <p className="text-xs text-muted-foreground">HORSEPOWER</p>
                </div>
                <div className="glass-card p-4 text-center">
                  <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-display font-bold text-foreground">
                    {car.acceleration}
                  </p>
                  <p className="text-xs text-muted-foreground">0-100 KM/H</p>
                </div>
                <div className="glass-card p-4 text-center">
                  <Settings className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-display font-bold text-foreground">
                    {car.specs.topSpeed.replace(' km/h', '')}
                  </p>
                  <p className="text-xs text-muted-foreground">TOP SPEED</p>
                </div>
              </div>

              {/* Specs Table */}
              <div className="glass-card p-4 mb-8">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">
                  SPECIFICATIONS
                </h3>
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div className="text-muted-foreground">Engine</div>
                  <div className="text-foreground text-right">{car.engine}</div>
                  
                  <div className="text-muted-foreground">Transmission</div>
                  <div className="text-foreground text-right">{car.transmission}</div>
                  
                  <div className="text-muted-foreground">Drivetrain</div>
                  <div className="text-foreground text-right">{car.specs.drivetrain}</div>
                  
                  <div className="text-muted-foreground">Exterior Color</div>
                  <div className="text-foreground text-right">{car.color}</div>
                  
                  <div className="text-muted-foreground">Interior</div>
                  <div className="text-foreground text-right">{car.interiorColor}</div>
                  
                  <div className="text-muted-foreground">Mileage</div>
                  <div className="text-foreground text-right">
                    {car.mileage === 0 ? 'Brand New' : `${car.mileage.toLocaleString()} km`}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                href={generateWhatsAppLink(car)}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full btn-gold h-14 font-display tracking-wider text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  INQUIRE VIA WHATSAPP
                </Button>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
