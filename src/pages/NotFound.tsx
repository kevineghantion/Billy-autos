import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <h1 className="font-display text-8xl md:text-9xl font-black text-primary mb-4">
          404
        </h1>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
          PAGE NOT FOUND
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="btn-gold font-display tracking-wider">
              <Home className="w-4 h-4 mr-2" />
              BACK TO HOME
            </Button>
          </Link>
          <Link to="/fleet">
            <Button variant="outline" className="btn-glass font-display tracking-wider">
              <ArrowLeft className="w-4 h-4 mr-2" />
              VIEW FLEET
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
