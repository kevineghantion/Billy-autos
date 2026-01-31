import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SellYourCar() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&auto=format&fit=crop"
          alt="Luxury car interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-4">
            CONSIGNMENT SERVICES
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-6">
            WANT TO SELL
            <br />
            <span className="gold-text">YOUR CAR?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Receive the best value for your trade-in vehicle. We even handle all
            paperwork. Get your car evaluated today and join the Billy Autos family.
          </p>
          <a href="/sell">
            <Button className="btn-gold px-8 py-6 font-display tracking-wider text-lg group">
              SELL YOUR CAR
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
