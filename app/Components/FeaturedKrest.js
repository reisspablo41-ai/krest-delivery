'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

const featured = [
  {
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop',
    badge: 'DIGITAL TOOL',
    title: 'INFORMED DELIVERY®',
    description: 'Get free Daily Digest emails with previews of letter-sized mail and upcoming packages before they arrive.',
    link: '/dashboard/informed-delivery',
  },
  {
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2670&auto=format&fit=crop',
    badge: 'CONVENIENCE',
    title: 'SCHEDULE SECURE PICKUP',
    description: "Place your packages at your designated pickup point and we'll collect them during our priority runs.",
    link: '/dashboard/schedule-package-delivery',
  },
  {
    img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1000&auto=format&fit=crop',
    badge: 'BUSINESS',
    title: 'DIRECT MAIL PIPELINE',
    description: "Target key commercial routes without mailing lists. Krest Delivery handles the logistics from origin to every door.",
    link: '/dashboard/every-door-direct-mail',
  },
];

function FeaturedKrest() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.featured-header > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
        }
      );

      gsap.fromTo(
        '.featured-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.featured-card', start: 'top 75%', once: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-32 bg-[#EFECE8]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="featured-header flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="text-secondary text-sm font-bold tracking-[0.2em] mb-4 uppercase">
              FEATURED SERVICES
            </div>
            <h2 className="font-heading font-black italic text-5xl md:text-4xl md:text-6xl text-primary uppercase tracking-tighter leading-[0.9]">
              KREST DELIVERY
              <br />
              <span className="text-primary/80">TOOLS & PRODUCTS.</span>
            </h2>
          </div>
          <p className="text-primary/70 font-medium max-w-sm">
            Leverage our advanced commercial tracking, routing, and intelligence tools to optimize your supply chain.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((item, i) => (
            <Link href={item.link} key={i}>
              <div
                className="featured-card group bg-white rounded-[2rem] overflow-hidden shadow-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-primary/5 h-full flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[0.2]"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-[#121c14]/90 backdrop-blur-md text-secondary text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/10">
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-heading font-black italic text-3xl text-primary tracking-tight mb-4 group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-primary/80 text-sm font-medium leading-relaxed mb-8 flex-1">
                    {item.description}
                  </p>
                  
                  <div className="flex justify-end mt-auto">
                    <div className="w-12 h-12 rounded-full bg-primary/5 group-hover:bg-secondary text-primary flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedKrest;
