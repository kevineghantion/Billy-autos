import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Trash2, MessageCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import { CarDrawer } from '@/components/CarDrawer';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useFleetContext } from '@/contexts/FleetContext';
import { Car } from '@/data/fleet';

const FavoritesPage = () => {
    const { favorites, removeFavorite, clearFavorites } = useFavorites();
    const { cars } = useFleetContext();
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);

    // Get the actual car objects for favorites
    const favoriteCars = cars.filter((car) => favorites.includes(car.id));

    const handleWhatsAppInquiry = (carName: string) => {
        const message = encodeURIComponent(
            `Hello Billy Autos, I'm interested in the ${carName} from my wishlist. Is it still available?`
        );
        window.open(`https://wa.me/96181999598?text=${message}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-background">
            <SEOHead
                title="My Favorites | Billy Autos"
                description="View your saved favorite cars from Billy Autos luxury collection."
            />
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-12 bg-gradient-to-b from-card to-background">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <p className="text-primary font-display text-sm tracking-[0.3em] mb-4">
                            YOUR COLLECTION
                        </p>
                        <h1 className="font-display text-4xl md:text-6xl font-black text-foreground mb-4">
                            <Heart className="inline-block w-10 h-10 md:w-14 md:h-14 text-red-500 mr-4 fill-red-500" />
                            MY FAVORITES
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            {favoriteCars.length > 0
                                ? `You have ${favoriteCars.length} car${favoriteCars.length > 1 ? 's' : ''} saved to your wishlist.`
                                : "You haven't saved any cars yet. Browse our fleet to find your dream car!"}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Favorites Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {favoriteCars.length > 0 ? (
                        <>
                            <div className="flex justify-end mb-6">
                                <Button
                                    onClick={clearFavorites}
                                    variant="outline"
                                    className="btn-glass text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Clear All
                                </Button>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {favoriteCars.map((car, index) => (
                                    <motion.div
                                        key={car.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="glass-card overflow-hidden group"
                                    >
                                        {/* Car Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={car.images[0] || '/placeholder.svg'}
                                                alt={`${car.make} ${car.model}`}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            {car.status === 'sold' && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <span className="text-white font-display text-2xl font-bold tracking-wider">
                                                        SOLD
                                                    </span>
                                                </div>
                                            )}
                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFavorite(car.id)}
                                                className="absolute top-3 right-3 p-2 glass-card text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                            >
                                                <Heart className="w-5 h-5 fill-current" />
                                            </button>
                                        </div>

                                        {/* Car Info */}
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-display font-bold text-foreground text-lg">
                                                        {car.make} {car.model}
                                                    </h3>
                                                    <p className="text-muted-foreground text-sm">
                                                        {car.year} • {car.mileage.toLocaleString()} km
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-display font-bold text-primary text-lg">
                                                        {car.price === 0
                                                            ? 'P.O.A.'
                                                            : `$${car.price.toLocaleString()}`}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 mt-4">
                                                <Button
                                                    onClick={() =>
                                                        handleWhatsAppInquiry(`${car.make} ${car.model}`)
                                                    }
                                                    className="flex-1 btn-gold"
                                                    disabled={car.status === 'sold'}
                                                >
                                                    <MessageCircle className="w-4 h-4 mr-2" />
                                                    Inquire
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="flex-1 btn-glass"
                                                    onClick={() => setSelectedCar(car)}
                                                >
                                                    <Info className="w-4 h-4 mr-2" />
                                                    About Car
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <Heart className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                                No Favorites Yet
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                Start building your dream garage! Browse our collection and tap
                                the heart icon to save cars you love.
                            </p>
                            <Link to="/fleet">
                                <Button className="btn-gold">Browse the Fleet</Button>
                            </Link>
                        </motion.div>
                    )}
                </div>
            </section>

            <Footer />
            <WhatsAppWidget />

            {/* Car Details Drawer */}
            <CarDrawer car={selectedCar} onClose={() => setSelectedCar(null)} />
        </div>
    );
};

export default FavoritesPage;

