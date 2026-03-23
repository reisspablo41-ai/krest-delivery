'use client';
export const dynamic = 'force-dynamic';
import TrackingForm from '../Components/TrackingForm';
import Footer from '../Components/Footer';
import { RefreshCw, Globe2, ShieldCheck } from 'lucide-react';

function Page() {
  return (
    <div className="min-h-screen bg-[#EFECE8] flex flex-col">
      {/* Hero Section */}
      <div className="bg-[#121c14] pt-24 md:pt-40 pb-32 px-6 relative overflow-hidden z-10 border-b border-secondary/20">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-3 mb-8">
             <span className="w-8 h-px bg-secondary"></span>
             <span className="text-secondary text-sm font-bold tracking-[0.2em] uppercase">
               KREST SECURE TRACKING
             </span>
             <span className="w-8 h-px bg-secondary"></span>
          </div>
          
          <h1 className="font-heading font-black italic text-4xl md:text-5xl md:text-8xl text-white mb-8 tracking-tighter leading-[0.85] uppercase">
            TRACK YOUR <span className="text-secondary">SHIPMENT.</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Stay updated on your shipment's journey. Enter your tracking
            number to see real-time status, transit route, and estimated
            delivery time across our global network.
          </p>

          <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-md p-4 rounded-[2rem] border border-white/10 shadow-2xl relative">
            <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
            <TrackingForm className="mt-0" />
          </div>
        </div>
      </div>

      {/* Additional Info / Features */}
      <div className="flex-1 py-12 md:py-24 px-6 relative z-0">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={RefreshCw}
            title="REAL-TIME UPDATES"
            desc="Get the latest status of your package or specialized shipment instantly with our live satellite tracking system."
          />
          <FeatureCard
            icon={Globe2}
            title="GLOBAL CONNECTIVITY"
            desc="Our network spans across continents, ensuring your shipment is monitored no matter where it is."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="SECURE LOGISTICS"
            desc="Krest Delivery ensures that every commercial shipment is handled with the highest level of security and compliance."
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-xl border border-primary/5 hover:-translate-y-2 transition-transform duration-500 group">
      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-secondary transition-colors duration-500">
         <Icon className="text-secondary group-hover:text-primary transition-colors duration-500 w-8 h-8" strokeWidth={1.5} />
      </div>
      <h3 className="font-heading font-black italic text-2xl text-primary mb-4 tracking-tight uppercase">
        {title}
      </h3>
      <p className="text-primary/60 font-medium leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  );
}

export default Page;
