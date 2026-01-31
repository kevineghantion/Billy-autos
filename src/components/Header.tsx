import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Heart, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/contexts/FavoritesContext';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'The Fleet', href: '/fleet' },
  { name: 'Sell Your Car', href: '/sell' },
  { name: 'Contact', href: '/contact' },
];

// Custom TikTok icon since lucide-react doesn't have one
const TikTok = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/billyautoslb/', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/billyautoslb/', label: 'Instagram' },
  { icon: TikTok, href: 'https://www.tiktok.com/@billyautoslb3', label: 'TikTok' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { favoritesCount } = useFavorites();

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
            {/* Favorites Link - Only show when there are favorites */}
            {favoritesCount > 0 && (
              <Link
                to="/favorites"
                className={`relative font-display text-sm tracking-wider transition-all duration-300 flex items-center gap-2 group ${location.pathname === '/favorites'
                  ? 'text-primary'
                  : 'text-foreground/80 hover:text-foreground'
                  }`}
              >
                <span className="relative">
                  <Heart className="w-4 h-4 fill-primary text-primary transition-transform group-hover:scale-110" />
                </span>
                FAVORITES
                <span className="bg-gradient-to-r from-primary to-gold-light text-black text-[10px] font-black px-2 py-0.5 rounded-md shadow-lg shadow-primary/20">
                  {favoritesCount}
                </span>
                {location.pathname === '/favorites' && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            )}
          </nav>

          {/* Phone & Social Links */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+96181999598"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>+961 81 999 598</span>
            </a>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Favorites Icon - Only show when there are favorites */}
            {favoritesCount > 0 && (
              <Link
                to="/favorites"
                className="relative p-2 text-foreground group"
              >
                <Heart className="w-6 h-6 fill-primary text-primary transition-transform group-hover:scale-110" />
                <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-primary to-gold-light text-black text-[10px] font-black min-w-[18px] h-[18px] flex items-center justify-center rounded-md shadow-lg shadow-primary/30">
                  {favoritesCount}
                </span>
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
                {/* Favorites in mobile menu - Only show when there are favorites */}
                {favoritesCount > 0 && (
                  <Link
                    to="/favorites"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-display text-lg tracking-wider flex items-center gap-3 group ${location.pathname === '/favorites'
                      ? 'text-primary'
                      : 'text-foreground/80'
                      }`}
                  >
                    <Heart className="w-5 h-5 fill-primary text-primary transition-transform group-hover:scale-110" />
                    FAVORITES
                    <span className="bg-gradient-to-r from-primary to-gold-light text-black text-[10px] font-black px-2 py-0.5 rounded-md shadow-lg shadow-primary/20">
                      {favoritesCount}
                    </span>
                  </Link>
                )}
                <div className="flex items-center justify-center gap-4 mt-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

