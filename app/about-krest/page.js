import Image from 'next/image';
import Link from 'next/link';
import Footer from '../Components/Footer';
import { ChevronRight } from 'lucide-react';

export default function AboutKrestPage() {
  return (
    <main className="bg-[#EFECE8] min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-white pt-28 md:pt-48 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-0"></div>
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-secondary/10 rounded-full blur-[200px] z-0 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 lg:gap-4 mb-8">
            <span className="w-8 h-px bg-secondary"></span>
            <span className="text-secondary text-sm font-bold tracking-[0.3em] uppercase">THE KREST STANDARD</span>
            <span className="w-8 h-px bg-secondary"></span>
          </div>
          <h1 className="font-heading font-black italic text-4xl md:text-5xl md:text-8xl tracking-tighter leading-[0.85] uppercase max-w-5xl mx-auto">
            MOVING <span className="text-secondary">THE WORLD</span><br />
            BY DELIVERING WHAT MATTERS.
          </h1>
        </div>
      </section>

      {/* Featured Img Block */}
      <section className="py-12 md:py-24 max-w-7xl mx-auto px-6">
        <div className="relative w-full h-[500px] md:h-[700px] rounded-[3rem] overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2670&auto=format&fit=crop"
            alt="Krest Global Logistics"
            fill
            className="object-cover grayscale-[0.3]"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
          
          <div className="absolute bg-white/95 backdrop-blur-md bottom-10 left-10 right-10 md:right-auto md:w-[500px] p-6 md:p-10 md:p-6 md:p-12 rounded-[2rem] shadow-2xl border border-white/20">
            <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-4">CUSTOMER FIRST</p>
            <h3 className="font-heading font-black italic text-3xl md:text-4xl text-primary tracking-tight uppercase leading-[0.9] mb-6">
              CONNECTING PEOPLE & POSSIBILITIES.
            </h3>
            <p className="text-primary/70 font-medium mb-8 leading-relaxed">
              At Krest Delivery, we believe that a connected logistics network is the backbone of a thriving global economy. That belief guides every shipment we handle.
            </p>
            <Link href="/ContactUs">
              <button className="flex items-center justify-between w-full md:w-auto gap-4 bg-primary text-secondary font-heading font-black italic px-8 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-secondary hover:text-primary transition-all duration-300">
                <span>CONNECT WITH US</span>
                <ChevronRight className="w-5 h-5" strokeWidth={3} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-32 bg-[#121c14] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mb-24">
            <h2 className="font-heading font-black italic text-3xl md:text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9]">
              OUR SOLUTIONS. <br/>
              <span className="text-secondary">YOUR ADVANTAGE.</span>
            </h2>
            <p className="mt-8 text-xl text-white/60 max-w-2xl font-medium leading-relaxed">
              Krest Delivery offers precision planning and next-day service to millions of customers. We are customer first, people led, and innovation driven.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <InfoCard 
               img="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop"
               title="ENTERPRISE INFO"
               desc="Discover how our vast fleet and intelligent routing software powers Fortune 500 supply chains."
               link="/about-krest/our-company"
               btnText="COMPANY DOCS"
             />
             <InfoCard 
               img="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2669&auto=format&fit=crop"
               title="OUR PEOPLE"
               desc="Krest Delivery is a world-class infrastructure network, but at its core, it's driven by our elite personnel."
               link="/about-krest/our-people"
               btnText="MEET THE TEAM"
             />
             <InfoCard 
               img="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2688&auto=format&fit=crop"
               title="SPECIALIZED LOGISTICS"
               desc="From sensitive tech mapping to our dedicated live animal transit division, we handle exceptions."
               link="/about-krest/pet-delivery-system"
               btnText="SPECIAL SERVICES"
             />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="font-heading font-black italic text-3xl md:text-5xl md:text-7xl text-primary uppercase tracking-tighter leading-none mb-4">
              THE KREST <span className="text-white drop-shadow-sm">SCALE.</span>
            </h3>
            <p className="font-bold text-primary/70 tracking-widest uppercase text-sm">Quantifiable Excellence Worldwide</p>
          </div>

          <div className="bg-primary rounded-[3rem] p-6 md:p-12 md:p-20 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            
            <div className="grid md:grid-cols-3 gap-12 relative z-10 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="pt-8 md:pt-0">
                <h4 className="font-heading font-black italic text-4xl md:text-5xl md:text-8xl text-secondary mb-2 tracking-tighter">10k+</h4>
                <p className="text-white/60 font-bold tracking-widest uppercase text-sm">GLOBAL EXPERTS</p>
              </div>
              <div className="pt-8 md:pt-0">
                <h4 className="font-heading font-black italic text-4xl md:text-5xl md:text-8xl text-white mb-2 tracking-tighter">500k</h4>
                <p className="text-white/60 font-bold tracking-widest uppercase text-sm">DAILY DELIVERIES</p>
              </div>
              <div className="pt-8 md:pt-0">
                <h4 className="font-heading font-black italic text-4xl md:text-5xl md:text-8xl text-secondary mb-2 tracking-tighter">99<span className="text-4xl">%</span></h4>
                <p className="text-white/60 font-bold tracking-widest uppercase text-sm">SLA SUCCESS RATE</p>
              </div>
            </div>
            
            <div className="mt-20 text-center relative z-10">
              <Link href="/about-krest/our-company">
                <button className="inline-flex items-center gap-3 bg-white text-primary font-heading font-black italic px-10 py-5 rounded-full text-lg tracking-widest uppercase hover:bg-secondary transition-all hover:scale-105 shadow-xl">
                  VIEW FULL FACT SHEET <ChevronRight className="w-5 h-5" strokeWidth={3} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function InfoCard({ img, title, desc, link, btnText }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden group hover:border-secondary/50 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <Image src={img} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[0.4]" />
        <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors" />
      </div>
      <div className="p-8 flex flex-col flex-1">
        <h3 className="font-heading font-black italic text-2xl text-white tracking-tight uppercase mb-4">{title}</h3>
        <p className="text-white/50 text-sm font-medium leading-relaxed mb-8 flex-1">{desc}</p>
        <Link href={link}>
           <button className="w-full py-4 border border-white/20 rounded-xl text-white font-bold text-xs tracking-widest uppercase hover:bg-secondary hover:text-primary hover:border-secondary transition-colors">
              {btnText}
           </button>
        </Link>
      </div>
    </div>
  );
}
