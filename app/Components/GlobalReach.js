'use client';

import { motion } from 'framer-motion';
import { Globe2, Truck, Clock } from 'lucide-react';

const features = [
  {
    icon: Globe2,
    title: 'GLOBAL NETWORK',
    description: 'Serving over 220 countries and territories with unparalleled precision and reliability.',
  },
  {
    icon: Truck,
    title: 'ADVANCED FLEET',
    description: 'Equipped with temperature-controlled and specialized vehicles for all transportation needs.',
  },
  {
    icon: Clock,
    title: 'RAPID TRANSIT',
    description: 'Optimized routing algorithms ensure your shipments arrive exactly when expected.',
  },
];

export default function GlobalReach() {
  return (
    <section className="relative bg-primary py-16 md:py-32 overflow-hidden border-t border-white/5">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-light/40 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-8 bg-secondary"></div>
              <span className="text-secondary text-sm font-bold tracking-[0.2em] uppercase">
                BEYOND BORDERS
              </span>
              <div className="h-px w-8 bg-secondary"></div>
            </div>
            
            <h2 className="font-heading font-black italic text-3xl md:text-5xl md:text-7xl text-white uppercase tracking-tighter mb-8 leading-[0.9]">
              EMPOWERING LOGISTICS <br/>
              <span className="text-secondary">WORLDWIDE.</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Krest Delivery seamlessly connects continents, providing end-to-end visibility and uncompromising care for your most critical shipments.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15, ease: 'easeOut' }}
              className="group relative rounded-[2rem] bg-white/[0.02] border border-white/10 p-6 md:p-10 hover:border-secondary/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 pointer-events-none">
                <feature.icon className="w-32 h-32 text-secondary" strokeWidth={1} />
              </div>
              
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl border border-secondary/20 flex items-center justify-center mb-8 text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-primary transition-all duration-500">
                <feature.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              
              <h3 className="font-heading font-black italic text-3xl text-white uppercase tracking-tight mb-4 group-hover:text-secondary transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-white/60 leading-relaxed font-medium text-base group-hover:text-white/80 transition-colors duration-300 relative z-10">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
