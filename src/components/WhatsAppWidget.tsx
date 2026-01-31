import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function WhatsAppWidget() {
  return (
    <motion.a
      href="https://wa.me/96181999598?text=Hello%20Billy%20Autos%2C%20I%20am%20interested%20in%20your%20luxury%20vehicles.%20Please%20assist%20me."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
        <span className="absolute -inset-1 rounded-full bg-green-500/20 animate-pulse" />

        {/* Button */}
        <div className="relative flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg shadow-green-500/30 transition-colors">
          <MessageCircle className="w-6 h-6" />
          <span className="font-display font-semibold tracking-wide hidden sm:block">
            LIVE CHAT
          </span>
        </div>
      </div>
    </motion.a>
  );
}
