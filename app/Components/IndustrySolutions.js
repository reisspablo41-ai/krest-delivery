'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, HeartPulse, Cpu, Factory, ChevronRight } from 'lucide-react';

const industries = [
  {
    icon: ShoppingBag,
    title: 'E-COMMERCE',
    desc: 'High-volume B2C distribution with ultra-fast last-mile logistics to keep your customers delighted.'
  },
  {
    icon: HeartPulse,
    title: 'HEALTHCARE',
    desc: 'Strict temperature-controlled environments for sensitive medical supplies and pharmaceuticals.'
  },
  {
    icon: Cpu,
    title: 'TECHNOLOGY',
    desc: 'Extra-secure, anti-static handling and padded transit for high-value technology items.'
  },
  {
    icon: Factory,
    title: 'MANUFACTURING',
    desc: 'Heavy freight, machinery transportation, and raw materials supply chain management.'
  }
];

export default function IndustrySolutions() {
  return (
    <section className="bg-[#121c14] py-16 md:py-32 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 justify-between items-end mb-20">
          <div className="max-w-2xl">
            <div className="text-secondary text-sm font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-secondary"></span>
              SPECIALIZED SERVICE
            </div>
            <h2 className="font-heading font-black italic text-3xl md:text-5xl md:text-7xl text-white tracking-tighter leading-[0.9] uppercase">
              TAILORED LOGISTICS FOR <br />
              <span className="text-secondary">EVERY INDUSTRY.</span>
            </h2>
          </div>
          <p className="text-white/60 text-lg font-medium lg:text-right max-w-md">
            No two industries are alike. We provide specialized handling, bespoke routing, and customized workflows to match your exact business requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 hover:bg-white/[0.06] hover:border-secondary/50 transition-all duration-300 group flex flex-col h-full cursor-pointer relative overflow-hidden"
            >
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-secondary border border-white/10 mb-8 group-hover:scale-110 group-hover:bg-secondary group-hover:text-primary transition-all duration-300 relative z-10">
                <item.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              
              <h3 className="font-heading font-black italic text-3xl text-white uppercase tracking-tight mb-4 relative z-10">{item.title}</h3>
              <p className="text-white/60 leading-relaxed font-medium mb-8 flex-1 relative z-10">{item.desc}</p>
              
              <div className="flex items-center gap-2 text-secondary font-bold tracking-widest uppercase text-sm opacity-80 group-hover:opacity-100 group-hover:gap-4 transition-all duration-300 relative z-10">
                <span>LEARN MORE</span>
                <ChevronRight className="w-4 h-4" />
              </div>
              
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
