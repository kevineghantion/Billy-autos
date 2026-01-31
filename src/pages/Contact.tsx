import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import { Button } from '@/components/ui/button';

const ContactPage = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello Billy Autos, I would like to inquire about your services."
    );
    window.open(`https://wa.me/96181999598?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
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
              GET IN TOUCH
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-black text-foreground mb-4">
              CONTACT US
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Visit our showroom in the heart of Beirut or reach out to us directly.
              Our  team is ready to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MapPin,
                title: 'SHOWROOM',
                info: 'Downtown Beirut, Lebanon',
                subInfo: "Martyrs' Square, Block A",
              },
              {
                icon: Phone,
                title: 'PHONE',
                info: '+961 81 999 598',

              },
              {
                icon: Mail,
                title: 'EMAIL',
                info: 'billy970174@gmail.com',

              },
              {
                icon: Clock,
                title: 'HOURS',
                info: 'Mon - Sat: 10AM - 6PM',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-foreground text-sm">{item.info}</p>
                <p className="text-muted-foreground text-sm">{item.subInfo}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Contact */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] lg:h-full min-h-[400px] glass-card overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.174986!2d35.502785!3d33.8968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17000000000%3A0x0!2sDowntown%20Beirut!5e0!3m2!1sen!2slb!4v1640000000000!5m2!1sen!2slb"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Billy Autos Location"
              />
            </motion.div>

            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-black text-foreground mb-6">
                HAVE ANY QUESTION?
                <br />
                <span className="gold-text">FEEL FREE TO ASK...</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Our  team is available to answer all your questions about our
                inventory, services, or to schedule a private viewing. Reach out
                via WhatsApp for the fastest response.
              </p>

              <div className="space-y-4">
                <Button
                  onClick={handleWhatsApp}
                  className="w-full md:w-auto btn-gold h-14 px-8 font-display tracking-wider text-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  CHAT ON WHATSAPP
                </Button>

                <div className="flex flex-col md:flex-row gap-4">
                  <a href="tel:+96181999598" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full btn-glass h-12 font-display tracking-wider"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      +961 81 999 598
                    </Button>
                  </a>
                  <a href="mailto:billy970174@gmail.com" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full btn-glass h-12 font-display tracking-wider"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email Us
                    </Button>
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-12 glass-card p-6">
                <h3 className="font-display font-bold text-foreground mb-4">
                  BUSINESS HOURS
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Saturday</span>
                    <span className="text-foreground">10:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
};

export default ContactPage;
