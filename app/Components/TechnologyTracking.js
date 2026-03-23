'use client';

import { motion } from 'framer-motion';
import { MonitorDot, MapPin, BarChart3, ShieldCheck } from 'lucide-react';

export default function TechnologyTracking() {
  return (
    <section className="relative bg-[#0d1610] py-16 md:py-32 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col xl:flex-row items-center gap-8 md:gap-16 lg:gap-12 md:gap-24">
        
        {/* Text Content */}
        <div className="xl:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="text-secondary text-sm font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-secondary"></span>
              NEXT-GEN TECH
            </div>
            
            <h2 className="font-heading font-black italic text-3xl md:text-5xl md:text-7xl text-white tracking-tighter leading-[0.9] uppercase mb-8">
              VISIBILITY FROM <br/>
              <span className="text-secondary">END TO END.</span>
            </h2>
            
            <p className="text-white/60 text-lg font-medium leading-relaxed max-w-xl mb-12">
              At Krest Delivery, we leverage cutting-edge tracking technology to provide unparalleled transparency. Know exactly where your cargo is at any moment, and monitor its condition in real-time.
            </p>
            
            <div className="space-y-8">
              {[
                { icon: MapPin, title: 'PINPOINT GPS TRACKING', desc: 'Real-time location data refreshed every 60 seconds.' },
                { icon: MonitorDot, title: 'LIVE DASHBOARD', desc: 'Access all your shipments through a unified, intuitive interface.' },
                { icon: BarChart3, title: 'ADVANCED ANALYTICS', desc: 'Optimize your supply chain with actionable delivery insights.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-white group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
                    <item.icon className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <div className="pt-1">
                    <h4 className="font-heading font-black italic text-2xl text-white uppercase tracking-tight mb-2 group-hover:text-secondary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-white/50 text-sm font-medium leading-relaxed max-w-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Visual Mockup */}
        <div className="xl:w-1/2 w-full rrelative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{ perspective: '1000px' }}
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-secondary/10 blur-[100px] rounded-full" />
            
            <div className="relative bg-[#1a261d] rounded-t-xl rounded-b-[2rem] border border-white/10 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col transform-gpu">
              {/* Browser/Dashboard Header */}
              <div className="h-10 bg-black/40 flex items-center px-4 gap-3 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  <div className="w-3 h-3 rounded-full bg-white/20"></div>
                </div>
                <div className="mx-auto w-1/3 h-4 bg-white/5 rounded-full"></div>
              </div>
              
              {/* Fake Dashboard Body */}
              <div className="flex-1 p-8 flex flex-col gap-6 bg-gradient-to-br from-[#1a261d] to-[#0d1610]">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-heading font-black italic text-white text-2xl uppercase tracking-widest">
                    ACTIVE FLEET
                  </div>
                  <div className="text-secondary text-xs font-bold tracking-widest uppercase bg-secondary/10 px-4 py-1.5 rounded-full">
                    LIVE
                  </div>
                </div>
                
                <div className="flex gap-6 h-1/3">
                  <div className="w-1/3 bg-white/5 rounded-2xl border border-white/5 flex flex-col p-4">
                     <div className="w-8 h-8 rounded-full bg-secondary/20 mb-auto"></div>
                     <div className="w-3/4 h-3 bg-white/10 rounded-full mb-2"></div>
                     <div className="w-1/2 h-2 bg-white/5 rounded-full"></div>
                  </div>
                  <div className="w-2/3 bg-secondary/5 rounded-2xl border border-secondary/10 flex flex-col justify-end p-6 relative overflow-hidden">
                     <div className="w-full h-1/2 bg-gradient-to-t from-secondary/20 to-transparent rounded-sm relative overflow-hidden">
                       <div className="absolute bottom-0 w-full h-[2px] bg-secondary shadow-[0_0_10px_#f8cc74]"></div>
                     </div>
                  </div>
                </div>
                <div className="flex-1 bg-white/5 rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                   <MonitorDot className="text-4xl md:text-6xl text-secondary/30 animate-pulse" strokeWidth={1} />
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                </div>
              </div>
            </div>
            
            {/* Floating Element */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 glass bg-[#F8F5F2]/95 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white/20 flex flex-col gap-4 w-64"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                   <ShieldCheck className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[10px] text-primary/70 font-bold uppercase tracking-widest mb-1">SECURITY PIN</p>
                  <p className="font-heading font-black italic text-primary text-xl uppercase tracking-tight">VERIFIED</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                <div className="h-full w-full bg-primary rounded-full"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
