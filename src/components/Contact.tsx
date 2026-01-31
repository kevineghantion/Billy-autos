import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Contact() {
  return (
    <section className="py-20 bg-card" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-4">
              VISIT OUR SHOWROOM
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-8">
              HAVE ANY QUESTION?
              <br />
              <span className="gold-text">FEEL FREE TO ASK...</span>
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 glass-card">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-foreground mb-1">
                    SHOWROOM LOCATION
                  </h4>
                  <p className="text-muted-foreground">
                    Downtown Beirut, Lebanon
                    <br />
                    Martyrs' Square, Block A
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 glass-card">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-foreground mb-1">
                    PHONE NUMBER
                  </h4>
                  <p className="text-muted-foreground">
                    <a href="tel:+96181999598" className="hover:text-primary transition-colors">
                      +961 81 999 598
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 glass-card">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-foreground mb-1">
                    EMAIL ADDRESS
                  </h4>
                  <p className="text-muted-foreground">
                    <a
                      href="mailto:billy970174@gmail.com"
                      className="hover:text-primary transition-colors"
                    >
                      billy970174@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 glass-card">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-foreground mb-1">
                    WORKING HOURS
                  </h4>
                  <p className="text-muted-foreground">
                    Mon - Sat: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] lg:h-[500px] glass-card overflow-hidden"
          >
            {/* Lebanon Map Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-background flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  BILLY AUTOS
                </h3>
                <p className="text-muted-foreground">
                  Downtown Beirut, Lebanon
                </p>
                <a
                  href="https://maps.google.com/?q=Downtown+Beirut+Lebanon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-primary hover:underline font-display text-sm tracking-wider"
                >
                  OPEN IN GOOGLE MAPS →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
