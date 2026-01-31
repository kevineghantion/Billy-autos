import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ADMIN_PIN = 'Joepaulnomi@7168915106072006@';
const SESSION_KEY = 'billy_autos_admin_token';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already authenticated
    const token = sessionStorage.getItem(SESSION_KEY);
    if (token === 'authenticated') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (pin === ADMIN_PIN) {
      sessionStorage.setItem(SESSION_KEY, 'authenticated');
      setIsAuthenticated(true);
    } else {
      setError('Invalid PIN. Access denied.');
      setPin('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">
          <ShieldCheck className="w-16 h-16 text-primary" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-gold-light rounded-lg flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-black" />
            </div>
            <h1 className="font-display text-3xl font-black text-foreground">
              ADMIN ACCESS
            </h1>
            <p className="text-muted-foreground mt-2">
              Enter your PIN to access the Fleet Manager
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="glass-card p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pin" className="text-foreground">
                  Security PIN
                </Label>
                <Input
                  id="pin"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter your PIN"
                  className="bg-background/50 text-center text-lg tracking-widest"
                  autoFocus
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <Button type="submit" className="w-full btn-gold font-display tracking-wider">
                <ShieldCheck className="w-4 h-4 mr-2" />
                UNLOCK DASHBOARD
              </Button>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-muted-foreground text-xs mt-6">
            Billy Autos Fleet Management System
          </p>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
