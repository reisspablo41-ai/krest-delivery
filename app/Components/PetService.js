'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PawPrint, Heart, ShieldCheck, Clock } from 'lucide-react';

export default function PetService() {
  const features = [
    {
      icon: PawPrint,
      title: "Species Specific",
      desc: "Tailored transport for dogs, cats, and exotic animals."
    },
    {
      icon: Heart,
      title: "Compassionate Care",
      desc: "Professional handlers who treat your pets like family."
    },
    {
      icon: ShieldCheck,
      title: "Safety First",
      desc: "Climate-controlled crates and real-time monitoring."
    },
    {
      icon: Clock,
      title: "Express Transit",
      desc: "Minimized travel time for your pet's comfort."
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
              <PawPrint className="w-4 h-4 text-secondary" />
              <span className="text-secondary text-xs font-bold uppercase tracking-widest">Specialized Pet Logistics</span>
            </div>
            
            <h2 className="font-heading font-black italic text-5xl md:text-6xl text-primary uppercase tracking-tighter leading-[0.9] mb-8">
              PREMIUM COMFORT FOR YOUR <span className="text-secondary">FURRY COMPANIONS.</span>
            </h2>
            
            <p className="text-primary/70 text-lg font-medium leading-relaxed mb-10 max-w-xl">
              At Krest Delivery, we understand that pets are family. Our specialized pet transportation services ensure your beloved companions travel in absolute luxury and safety, with door-to-door care that exceeds industry standards.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-secondary">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold italic text-primary uppercase tracking-tight text-sm mb-1">{f.title}</h4>
                    <p className="text-primary/60 text-xs font-medium leading-tight">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/pet-shipping">
              <button className="bg-primary text-secondary px-8 py-4 rounded-xl font-heading font-black italic uppercase text-sm tracking-widest hover:bg-secondary hover:text-primary transition-all duration-300 shadow-xl shadow-primary/10">
                Explore Pet Services →
              </button>
            </Link>
          </div>

          {/* Image Composition */}
          <div className="order-1 lg:order-2 relative grid grid-cols-12 gap-4 h-[600px]">
            <div className="col-span-8 relative h-full rounded-[3rem] overflow-hidden shadow-2xl group">
              <Image
                src="/image.png"
                alt="Pet Delivery Service"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            
            <div className="col-span-4 flex flex-col gap-4">
              <div className="h-2/3 relative rounded-[2.5rem] overflow-hidden shadow-xl group">
                <Image
                  src="/image2.JPG"
                  alt="Pet Logistics"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              </div>
              <div className="h-1/3 bg-secondary rounded-[2.5rem] p-6 flex flex-col justify-end">
                <div className="text-primary font-heading font-black italic text-2xl uppercase leading-none mb-1">
                  100%
                </div>
                <div className="text-primary/80 text-[10px] font-bold uppercase tracking-widest">
                  Safe Arrival Rate
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
