'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scissors, ArrowRight, Sun, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const steps = [
  {
    icon: Scissors, 
    title: 'PRECISION SCHEDULING',
    description: 'Instant dispatch routing starting the minute you book.',
  },
  {
    icon: ArrowRight,
    title: 'DIRECT LOADING',
    description: 'Directly from your hands onto our delivery fleet.',
  },
  {
    icon: Sun,
    title: 'SAME DAY DELIVERY',
    description: 'Arrives at your destination while the business day is still active.',
  },
];

function HowItWorks() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Image block reveal
      gsap.fromTo(
        '.image-block',
        { autoAlpha: 0, x: -40 },
        {
          autoAlpha: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true,
          }
        }
      );

      // Text and steps reveal
      gsap.fromTo(
        '.process-text > *',
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-text',
            start: 'top 80%',
            once: true,
          }
        }
      );
      
      gsap.fromTo(
        '.process-step',
        { autoAlpha: 0, x: 20 },
        {
          autoAlpha: 1, x: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-text',
            start: 'top 60%',
            once: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-32 bg-white text-primary overflow-hidden rounded-t-[3rem] -mt-10 relative z-20">
      <div ref={containerRef} className="max-w-7xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Image & Widget */}
          <div className="image-block relative h-[700px] w-full rounded-[2.5rem] overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2670&auto=format&fit=crop" 
              alt="Logistics Process" 
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            
            {/* Overlay Widget */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="glass-dark bg-[#1A261D]/80 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-2xl border border-white/10 relative">
                <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-2">
                  PRIORITY DISPATCH
                </div>
                <h3 className="font-heading font-black italic text-white text-4xl md:text-5xl tracking-tighter uppercase mb-6 drop-shadow-md">
                  05:42 AM TODAY
                </h3>
                
                {/* Inner white widget overlapping edge */}
                <div className="absolute -bottom-8 -right-4 lg:-right-12 glass bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-2xl w-64 rotate-[3deg] border border-[#E6DDD4]">
                  <div className="w-10 h-10 rounded-full bg-[#1e2d21] text-white flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-black italic text-primary text-2xl uppercase tracking-tighter mb-2">
                    100% SECURE
                  </h4>
                  <p className="text-xs text-primary/70 font-medium leading-relaxed">
                    Our advanced tracking ensures packages retain maximum priority and security from origin to destination.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Text Content */}
          <div className="process-text">
            <div className="text-secondary text-sm font-bold uppercase tracking-[0.2em] mb-4">
              THE PROCESS
            </div>
            
            <h2 className="font-heading font-black italic uppercase leading-[0.85] text-4xl md:text-6xl lg:text-[5.5rem] tracking-tighter text-primary mb-2">
              FROM ORIGIN
            </h2>
            <h2 className="font-heading font-black italic uppercase leading-[0.85] text-4xl md:text-6xl lg:text-[5.5rem] tracking-tighter text-primary mb-8">
              TO DESTINATION.
            </h2>
            
            <p className="text-primary/70 text-lg font-medium leading-relaxed max-w-lg mb-12">
              Traditional couriers store packages in warehouses for days. We operate a zero-inventory logistics model. Your package is constantly moving while you're getting your morning coffee.
            </p>
            
            <div className="space-y-10">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="process-step flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center text-secondary group-hover:bg-primary group-hover:border-primary transition-all duration-300 flex-shrink-0 mt-1">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-heading font-black italic text-2xl uppercase tracking-tighter text-primary mb-1">
                        {step.title}
                      </h4>
                      <p className="text-primary/80 text-sm font-medium leading-relaxed max-w-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
