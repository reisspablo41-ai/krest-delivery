'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, BarChart2, Users, Zap } from 'lucide-react';

const perks = [
  { icon: BarChart2, label: 'VOLUME DISCOUNTS' },
  { icon: Users, label: 'DEDICATED ACCOUNT MANAGER' },
  { icon: Zap, label: 'API INTEGRATION' },
];

function BusinessCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-32 bg-secondary relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden opacity-10">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[120%] h-[120px] bg-primary -rotate-3" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[120%] h-[120px] bg-primary rotate-3 mt-10" />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <span className="cta-item inline-block text-primary text-sm font-black tracking-[0.2em] uppercase mb-6 px-4 py-2 border-2 border-primary rounded-full">
          FOR BUSINESSES
        </span>

        <h2 className="cta-item font-heading font-black italic text-4xl md:text-5xl md:text-8xl text-primary mb-8 leading-[0.85] tracking-tighter uppercase">
          SCALE YOUR LOGISTICS
          <br />
          <span className="text-white drop-shadow-md">WITH KREST B2B.</span>
        </h2>

        <p className="cta-item text-primary/80 font-bold text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed tracking-wide">
          Unlock volume discounts, dedicated account management, full API integrations, and advanced analytics — everything your growing enterprise needs to ship smarter, faster, and cheaper.
        </p>

        <div className="cta-item flex flex-wrap justify-center gap-4 mb-16">
          {perks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 bg-primary text-secondary font-black italic tracking-wider text-sm rounded-[2rem] px-6 py-4 shadow-xl border border-primary/20 hover:-translate-y-1 transition-transform"
              >
                <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                {perk.label}
              </div>
            );
          })}
        </div>

        <div className="cta-item flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/ContactUs">
            <button className="group px-10 py-5 bg-primary text-white font-heading font-black italic tracking-widest text-lg uppercase rounded-full flex items-center gap-3 hover:bg-[#121c14] transition-all hover:scale-105 shadow-2xl">
              GET A QUOTE 
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link href="/buisness/weekend-pickup-deliveries">
            <button className="px-10 py-5 border-4 border-primary text-primary font-heading font-black italic tracking-widest text-lg uppercase rounded-full hover:bg-primary hover:text-white transition-all hover:scale-105 shadow-xl">
              EXPLORE PLANS
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BusinessCTA;
