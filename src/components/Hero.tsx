import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
import { SearchBar } from './SearchBar';

export function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Ken Burns */}
      <div className="absolute inset-0">
        <motion.img
          src={heroBg}
          alt="Luxury supercar"
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Tagline */}
          <motion.p
            className="text-primary font-display text-sm md:text-base tracking-[0.4em] mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            BEIRUT'S PREMIUM SELECTION CARS
          </motion.p>

          {/* Main Headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-tight mb-8 text-shadow-luxury">
            DRIVE
            <br />
            <span className="gold-text">UNCOMPROMISED</span>
            <br />
            QUALITY
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Curating the world's most exclusive hypercars and luxury vehicles
            for discerning collectors in the Middle East.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SearchBar />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, y: { repeat: Infinity, duration: 1.5 } }}
      >
        <ChevronDown className="w-8 h-8 text-primary" />
      </motion.div>
    </section>
  );
}
