import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FeaturedCarousel } from '@/components/FeaturedCarousel';
import { FleetGrid } from '@/components/FleetGrid';
import { SellYourCar } from '@/components/SellYourCar';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import { SEOHead } from '@/components/SEOHead';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Billy Autos | #1 Luxury Dealership in Lebanon"
        description="Discover the finest collection of luxury and exotic vehicles in Lebanon. Ferrari, Lamborghini, Porsche, and more. VIP service guaranteed."
      />
      <Header />
      <Hero />
      <FeaturedCarousel />
      <FleetGrid
        title="RECENT CARS"
        subtitle="Explore Our Collection of Luxury Cars"
      />
      <SellYourCar />
      <Contact />
      <Footer />
      <WhatsAppWidget />
    </div>
  );
};

export default Index;
