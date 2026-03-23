'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Package, Globe2, Clock, HeadphonesIcon } from 'lucide-react';

const stats = [
  { icon: Package, value: 10, suffix: 'M+', label: 'Packages Delivered' },
  { icon: Globe2, value: 150, suffix: '+', label: 'Countries Covered' },
  { icon: Clock, value: 99.9, suffix: '%', label: 'On-Time Delivery' },
  { icon: HeadphonesIcon, value: 24, suffix: '/7', label: 'Customer Support' },
];

function StatsBar() {
  const sectionRef = useRef(null);
  const countersRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered item entrance
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );

      // Animated number counters
      stats.forEach((stat, i) => {
        const el = countersRef.current[i];
        if (!el) return;

        const target = { val: 0 };
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(target, {
              val: stat.value,
              duration: 2.5,
              ease: 'power3.out',
              onUpdate: () => {
                el.textContent =
                  stat.value % 1 !== 0
                    ? target.val.toFixed(1)
                    : Math.round(target.val).toString();
              },
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-primary-dark py-12 md:py-24 border-y border-white/5 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="stat-item flex flex-col items-center text-center relative"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 group hover:border-secondary transition-colors duration-300">
                <Icon className="text-secondary w-8 h-8" strokeWidth={1.5} />
              </div>
              <div className="font-heading font-black italic text-6xl md:text-5xl md:text-7xl text-white uppercase tracking-tighter leading-none mb-3 relative drop-shadow-lg">
                <span ref={(el) => (countersRef.current[i] = el)}>0</span>
                <span className="text-secondary">{stat.suffix}</span>
              </div>
              <p className="text-secondary text-sm font-bold tracking-[0.2em] uppercase">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default StatsBar;
