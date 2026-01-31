import { motion } from 'framer-motion';
import { Phone, Mail, Upload, Car, DollarSign, CheckCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import { Button } from '@/components/ui/button';

const SellPage = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello Billy Autos, I am interested in selling my car. Please assist me with the evaluation process."
    );
    window.open(`https://wa.me/96181999598?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&auto=format&fit=crop"
            alt="Luxury cars"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-4">
              CONSIGNMENT & TRADE-IN
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-black text-foreground mb-6">
              SELL YOUR
              <br />
              <span className="gold-text">LUXURY CAR</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Get the best value for your high-end vehicle. Our team of experts will
              provide a fair and transparent evaluation. We handle all paperwork and
              ensure a smooth transaction.
            </p>
            <Button
              onClick={handleWhatsApp}
              className="btn-gold px-8 py-6 font-display tracking-wider text-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              START EVALUATION
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
              HOW IT WORKS
            </h2>
            <p className="text-muted-foreground text-lg">
              A simple 3-step process to sell your vehicle
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Car,
                title: 'SUBMIT DETAILS',
                description:
                  'Share your vehicle information via WhatsApp or email. Include photos, mileage, and service history.',
              },
              {
                icon: DollarSign,
                title: 'GET VALUATION',
                description:
                  'Our experts will provide a competitive market valuation within 24 hours based on current market conditions.',
              },
              {
                icon: CheckCircle,
                title: 'CLOSE THE DEAL',
                description:
                  'Accept our offer and we handle all paperwork. Receive payment instantly upon vehicle handover.',
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass-card p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-5xl font-display font-black text-primary/20 mb-4">
                  0{index + 1}
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sell With Us */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary font-display text-sm tracking-[0.3em] mb-4">
                WHY CHOOSE US
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-6">
                THE BILLY AUTOS
                <br />
                <span className="gold-text">ADVANTAGE</span>
              </h2>
              <div className="space-y-4">
                {[
                  'Competitive market-based valuations',
                  'Fast and hassle-free process',
                  'All paperwork handled by our team',
                  'Immediate payment upon handover',
                  'Access to our network of VIP buyers',
                  'Transparent and professional service',
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                READY TO SELL?
              </h3>
              <p className="text-muted-foreground mb-6">
                Contact us directly via WhatsApp or email to begin your selling journey.
              </p>
              <div className="space-y-4">
                <Button
                  onClick={handleWhatsApp}
                  className="w-full btn-gold h-14 font-display tracking-wider text-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  WHATSAPP: +961 81 999 598
                </Button>
                <a href="mailto:billy970174@gmail.com" className="block">
                  <Button
                    variant="outline"
                    className="w-full btn-glass h-14 font-display tracking-wider"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    billy970174@gmail.com
                  </Button>
                </a>
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

export default SellPage;
