'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, MapPin, Home, RefreshCw } from 'lucide-react';

const returnPerks = [
  { icon: MapPin, text: 'THOUSANDS OF DROP-OFF LOCATIONS NATIONWIDE' },
  { icon: Home, text: 'FREE SCHEDULED HOME PICKUP AVAILABLE' },
  { icon: RefreshCw, text: 'OPTIMIZED FOR RETAIL & E-COMMERCE LOGISTICS' },
];

function FeaturesReturn() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.return-img', { opacity: 0, x: -40, rotateY: 10 },
        { opacity: 1, x: 0, rotateY: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
        }
      );
      gsap.fromTo(
        '.return-text > *', { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-32 bg-[#F6F4F0] relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-12 md:gap-24 items-center">
          
          {/* Image */}
          <div className="return-img relative rounded-[3rem] overflow-hidden h-[400px] md:h-[600px] shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2670&auto=format&fit=crop"
              alt="Easy Returns with Krest Delivery"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-opacity duration-1000"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/90 to-transparent" />
            
            <div className="absolute bottom-10 left-10">
              <span className="bg-secondary text-primary font-black italic px-5 py-2 rounded-full uppercase tracking-widest text-sm shadow-xl border border-primary/10">
                REVERSE LOGISTICS
              </span>
              <h3 className="font-heading font-black italic text-white text-4xl md:text-5xl uppercase tracking-tighter mt-4 leading-none">
                HASSLE-FREE <br/> RETURNS.
              </h3>
            </div>
          </div>

          {/* Text */}
          <div className="return-text">
            <div className="text-secondary text-sm font-bold tracking-[0.2em] mb-4 uppercase flex items-center gap-3">
              <span className="w-8 h-px bg-secondary"></span>
              FLEXIBLE OPTIONS
            </div>
            
            <h2 className="font-heading font-black italic text-3xl md:text-5xl md:text-7xl text-primary mb-8 leading-[0.85] tracking-tighter uppercase">
              RETURN IT <br/>
              <span className="text-primary/80">YOUR WAY.</span>
            </h2>
            
            <p className="text-primary/70 font-medium text-lg leading-relaxed mb-10 max-w-lg">
              Drop off returns at thousands of Krest Delivery locations nationwide, or schedule a free home pickup. Flexible options built entirely around your schedule — not ours.
            </p>

            <ul className="space-y-6 mb-12">
              {returnPerks.map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <li key={i} className="flex items-center gap-5 text-primary">
                    <span className="bg-white border border-primary/10 shadow-sm rounded-xl p-3 flex-shrink-0 text-secondary">
                      <Icon className="w-6 h-6" strokeWidth={2.5} />
                    </span>
                    <span className="font-bold tracking-wider text-sm uppercase">{perk.text}</span>
                  </li>
                );
              })}
            </ul>

            <Link href="/ContactUs/FileClaim">
              <button className="group flex items-center gap-4 px-10 py-5 bg-primary text-white font-heading font-black italic tracking-widest text-lg uppercase rounded-full hover:bg-primary-light transition-all hover:scale-105 shadow-xl">
                FIND A LOCATION
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesReturn;
