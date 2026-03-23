import { Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from '../Components/ContactForm';
import Footer from '../Components/Footer';
import SupportResources from '../Components/SupportResources';
import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | Krest Delivery Support',
  description: 'Get in touch with our global logistics experts. We provide 24/7 support for tracking, billing, and technical inquiries.',
};

export default function ContactUs() {
  return (
    <div className="bg-[#EFECE8] min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary pt-24 md:pt-40 pb-32 overflow-hidden z-10">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="text-secondary text-sm font-bold tracking-[0.2em] uppercase mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-secondary"></span>
              SUPPORT CENTER
            </div>
            <h1 className="font-heading font-black italic text-4xl md:text-5xl md:text-8xl text-white tracking-tighter leading-[0.85] uppercase mb-8">
              HOW CAN WE <br />
              <span className="text-secondary">HELP YOU?</span>
            </h1>
            <p className="text-white/60 text-xl font-medium leading-relaxed max-w-2xl">
              Our specialized support team is available around the clock to assist with time-critical shipments, technical issues, or strategic business inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="-mt-16 relative z-20 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContactCard
              icon={<Mail className="w-8 h-8" strokeWidth={2} />}
              title="EMAIL CONNECT"
              value="support@krestdelivery.com"
              description="Prioritized response for account holders."
              link="mailto:support@krestdelivery.com"
            />
            <ContactCard
              icon={<MapPin className="w-8 h-8" strokeWidth={2} />}
              title="GLOBAL HQ"
              value="Headquarters"
              description="Worldwide Logistics Command Center"
              link="#"
            />
            <ContactCard
              icon={<Clock className="w-8 h-8" strokeWidth={2} />}
              title="24/7 SUPPORT"
              value="Always Online"
              description="Real-time assistance worldwide."
              link="#"
            />
          </div>
        </div>
      </section>

      {/* Main Support Section: Form & Resources */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-12 md:gap-24 items-start">

            {/* Left: Form Area */}
            <div className="bg-white rounded-[2rem] p-6 md:p-10 lg:p-14 shadow-2xl border border-primary/5 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-[100px] pointer-events-none blur-2xl"></div>
              <div className="mb-12">
                <h2 className="font-heading font-black italic text-4xl text-primary tracking-tighter uppercase mb-4">
                  SEND DISPATCH
                </h2>
                <p className="text-primary/60 font-medium text-lg">
                  Submit your inquiry and our logistics engineers will respond within standard SLA windows.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Right: Info Area */}
            <div className="space-y-12">
              <div>
                <h3 className="font-heading font-black italic text-3xl text-primary tracking-tighter uppercase mb-8 flex items-center gap-4">
                  <span className="w-12 h-12 bg-primary flex justify-center items-center text-secondary rounded-2xl">
                    <Clock className="w-6 h-6" strokeWidth={2.5} />
                  </span>
                  SLA & HOURS
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-8 bg-white border border-primary/5 rounded-[2rem] shadow-xl hover:-translate-y-1 transition-transform">
                    <p className="font-heading font-black italic text-xl text-primary tracking-tight uppercase mb-3">CLIENT SUPPORT</p>
                    <div className="space-y-2 text-primary/60 font-medium">
                      <p className="flex justify-between border-b border-primary/5 pb-2"><span>Mon - Fri</span> <span>07:00 - 19:00</span></p>
                      <p className="flex justify-between pt-1"><span>Saturday</span> <span>08:00 - 17:00</span></p>
                    </div>
                  </div>
                  <div className="p-8 bg-primary text-secondary border border-primary-light rounded-[2rem] shadow-xl hover:-translate-y-1 transition-transform">
                    <p className="font-heading font-black italic text-xl tracking-tight uppercase mb-3 text-white">TECH & AOG</p>
                    <div className="space-y-2 text-secondary/80 font-medium">
                      <p className="flex justify-between border-b border-secondary/20 pb-2"><span>Mon - Fri</span> <span>08:30 - 18:00</span></p>
                      <p className="flex justify-between pt-1 text-white"><span>Emergency</span> <span>24/7/365</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-10 bg-secondary rounded-[2rem] text-primary relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl group-hover:bg-white/40 transition-colors pointer-events-none"></div>
                <h3 className="font-heading font-black italic text-3xl uppercase tracking-tighter mb-4 pr-10">URGENT TRACKING?</h3>
                <p className="text-primary/70 font-bold mb-8 max-w-sm">
                  Access real-time global tracking without waiting for human intervention via our API-driven portals.
                </p>
                <Link href="/Track" className="inline-block bg-primary text-white font-heading font-black italic px-8 py-4 rounded-full uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl">
                  ACCESS TRACKING
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="py-20 border-t border-primary/10">
         <SupportResources />
      </div>
      
      <Footer />
    </div>
  );
}

function ContactCard({ icon, title, value, description, link }) {
  return (
    <a href={link} className="block group">
      <div className="h-full bg-white p-6 md:p-10 rounded-[2rem] border border-primary/5 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
        {/* Hover accent */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
        
        <div className="w-16 h-16 bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-secondary group-hover:scale-110 transition-all duration-500 mb-8">
          {icon}
        </div>
        <h3 className="font-heading font-black italic text-xl text-primary tracking-tight uppercase mb-2">{title}</h3>
        <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mb-6">{value}</p>
        <p className="text-sm text-primary/60 font-medium leading-relaxed">{description}</p>
      </div>
    </a>
  );
}
