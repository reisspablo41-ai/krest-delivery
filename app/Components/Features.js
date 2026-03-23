'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Package, MapPin, CalendarClock, Dog, ChevronRight } from 'lucide-react';

const services = [
  {
    icon: Package,
    title: 'SHIP A PACKAGE',
    description: 'Domestic and international shipping at competitive rates. From small parcels to large freight — we handle it all.',
    link: '/ship/sending-package',
  },
  {
    icon: MapPin,
    title: 'TRACK SHIPMENT',
    description: 'Real-time GPS tracking with live map updates. Know exactly where your package is at every step of the journey.',
    link: '/Track',
  },
  {
    icon: CalendarClock,
    title: 'SCHEDULE PICKUP',
    description: 'Free doorstep pickup during regular delivery hours. Book online in minutes and we come to you.',
    link: '/dashboard/schedule-package-delivery',
  },
  {
    icon: Dog,
    title: 'PET TRANSPORT',
    description: 'Safe, stress-free pet transportation with specialized care. Your companions deserve the best journey.',
    link: '/ContactUs',
  },
];

function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-header > *',
        { opacity: 0, y: 30, rotateX: -15 },
        {
          opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
        }
      );

      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.service-card', start: 'top 80%', once: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-32 bg-[#121c14]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="services-header text-center mb-20 max-w-3xl mx-auto">
          <div className="text-secondary text-sm font-bold tracking-[0.2em] mb-4 uppercase">
            WHAT WE OFFER
          </div>
          <h2 className="font-heading font-black italic text-5xl md:text-4xl md:text-6xl text-white uppercase tracking-tighter mb-6 relative inline-block">
            OUR CORE SERVICES
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-secondary rounded-full" />
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mt-8">
            From single parcels to enterprise logistics, Krest Delivery provides
            end-to-end shipping solutions designed around your needs.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link href={service.link} key={i}>
                <div
                  className="service-card group relative bg-white/5 border border-white/10 hover:border-secondary/50 rounded-[2rem] p-8 h-full transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 overflow-hidden cursor-pointer backdrop-blur-sm shadow-xl"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 pointer-events-none">
                    <Icon className="w-32 h-32 text-secondary" strokeWidth={1} />
                  </div>
                  
                  <div className="w-14 h-14 bg-secondary/10 border border-secondary/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300 relative z-10">
                    <Icon className="text-secondary group-hover:text-primary w-6 h-6" />
                  </div>
                  
                  <h3 className="font-heading font-black italic text-2xl text-white uppercase tracking-tight mb-4 relative z-10">
                    {service.title}
                  </h3>
                  
                  <p className="text-white/50 text-sm leading-relaxed mb-8 relative z-10">
                    {service.description}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-secondary tracking-widest uppercase group-hover:gap-4 transition-all relative z-10">
                    LEARN MORE <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
