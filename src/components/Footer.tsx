import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

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

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Inventory', href: '/fleet' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Sell a Car', href: '/sell' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/billyautoslb/' },
  { icon: Instagram, href: 'https://www.instagram.com/billyautoslb/' },
  { icon: TikTok, href: 'https://www.tiktok.com/@billyautoslb3' },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/10">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-gold-light rounded flex items-center justify-center">
                <span className="text-black font-display font-black text-xl">BA</span>
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  BILLY
                </h2>
                <p className="text-xs tracking-[0.3em] text-primary font-medium -mt-1">
                  AUTOS
                </p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-md mb-6">
              Known as Lebanon's premier luxury car showroom. With our collection of
              luxury cars and supercars, we aim to meet our clients' needs and
              expectations. We are specialized in offering new and used cars having
              great years of experience.
            </p>
            <p className="text-muted-foreground text-sm">
              Looking for selling your car or want to buy a car? Have a visit to our
              Showroom.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-bold text-foreground mb-6 tracking-wider">
              NAVIGATION
            </h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display font-bold text-foreground mb-6 tracking-wider">
              SOCIAL NETWORK
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="p-3 glass-card text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 | ALL RIGHTS ARE RESERVED | BILLY AUTOS
            </p>
            <div className="flex gap-4">
              {socialLinks.slice(0, 4).map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
