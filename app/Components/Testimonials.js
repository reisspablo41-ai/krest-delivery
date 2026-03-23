'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'E-commerce Owner',
    quote: 'Krest Delivery completely transformed our fulfillment process. Packages arrive on time, tracking is flawless, and our customers are happier than ever.',
    initial: 'S',
  },
  {
    name: 'Marcus Chen',
    role: 'Operations Director',
    quote: "The reliability and speed of their zero-inventory logistics model is unmatched. Krest Delivery is crucial for our daily operations.",
    initial: 'M',
  },
  {
    name: 'Amelia Torres',
    role: 'Supply Chain Manager',
    quote: "We've been using Krest Delivery for 3 years across our 5 locations. The competitive pricing makes it our go-to for all business shipping.",
    initial: 'A',
  },
];

function Testimonials() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const t = testimonials[active];

  return (
    <section ref={sectionRef} className="py-16 md:py-32 bg-primary relative overflow-hidden">
      {/* Heavy typographic background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none text-white font-heading font-black italic tracking-tighter leading-none whitespace-nowrap text-[20vw]">
        REVIEWS REVIEWS
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="text-secondary text-sm font-bold tracking-[0.2em] uppercase mb-4">
          CLIENT PARTNERS
        </div>
        <h2 className="font-heading font-black italic text-3xl md:text-5xl md:text-7xl text-white tracking-tighter mb-16 uppercase">
          WHAT THEY SAY.
        </h2>

        <div className="relative h-[280px] md:h-[240px] flex items-center justify-center">
          {testimonials.map((test, i) => (
            <div
              key={i}
              className={`absolute top-0 left-0 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i === active
                  ? 'opacity-100 translate-y-0 scale-100 z-10'
                  : 'opacity-0 translate-y-8 scale-95 pointer-events-none z-0'
              }`}
            >
              <h3 className="font-heading font-black italic text-3xl md:text-4xl md:text-5xl text-white/90 leading-[1.1] tracking-tight uppercase mb-8 max-w-4xl mx-auto">
                &ldquo;{test.quote}&rdquo;
              </h3>
              
              <div className="flex items-center justify-center gap-4">
                <div className="bg-secondary text-primary font-black italic font-heading text-xl rounded-full w-12 h-12 flex items-center justify-center pt-1">
                  {test.initial}
                </div>
                <div className="text-left">
                  <div className="font-heading font-black italic text-secondary text-xl tracking-tight uppercase leading-none mb-1">
                    {test.name}
                  </div>
                  <div className="text-white/50 text-xs font-bold tracking-widest uppercase">
                    {test.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Nav */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="group relative pt-4 pb-4 px-1"
            >
              <div className={`h-1.5 rounded-full transition-all duration-500 ${
                active === i ? 'bg-secondary w-12' : 'bg-white/10 w-4 group-hover:bg-white/30'
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
