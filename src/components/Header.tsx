import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'The Fleet', href: '/fleet' },
  { name: 'Sell Your Car', href: '/sell' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.svg"
              alt="Billy Autos"
              className="h-16 w-auto object-contain hidden sm:block"
            />
            <div>
              <h1 className="font-display text-xl font-bold tracking-wider text-foreground">
                BILLY
              </h1>
              <p className="text-[10px] tracking-[0.3em] text-primary font-medium -mt-1">
                AUTOS
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative font-display text-sm tracking-wider transition-colors duration-300 ${location.pathname === link.href
                  ? 'text-primary'
                  : 'text-foreground/80 hover:text-foreground'
                  }`}
              >
                {link.name.toUpperCase()}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA & Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+96181999598"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>+961 81 999 598</span>
            </a>
            <Button className="btn-gold font-display tracking-wider">
              <a href="https://wa.me/96181999598" target="_blank" rel="noopener noreferrer">
                GET VIP ACCESS
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4"
            >
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-display text-lg tracking-wider ${location.pathname === link.href
                      ? 'text-primary'
                      : 'text-foreground/80'
                      }`}
                  >
                    {link.name.toUpperCase()}
                  </Link>
                ))}
                <Button className="btn-gold font-display tracking-wider w-full mt-4">
                  <a href="https://wa.me/96181999598" target="_blank" rel="noopener noreferrer">
                    GET VIP ACCESS
                  </a>
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
