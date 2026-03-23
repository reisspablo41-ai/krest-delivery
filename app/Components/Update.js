import Link from 'next/link';
import Image from 'next/image';
import { ShieldAlert, CalendarClock, Globe2, ChevronRight } from 'lucide-react';

const updates = [
  {
    icon: ShieldAlert,
    category: 'SECURITY ALERT',
    categoryColor: 'text-red-600 bg-red-50 border-red-100',
    title: 'PROTECT YOURSELF FROM SCAMS',
    excerpt: "If you receive a message claiming to be from Krest Delivery about a package failure, delete it immediately. We will never ask for personal information this way.",
    links: [
      { label: 'TEXT SCAMS GUIDE', href: '/service-alerts/scam-protection#text' },
      { label: 'EMAIL SCAMS', href: '/service-alerts/scam-protection#email' },
    ],
  },
  {
    icon: CalendarClock,
    category: 'SERVICE NOTICE',
    categoryColor: 'text-secondary bg-secondary/10 border-secondary/20',
    title: 'UPCOMING HOLIDAY CLOSURES',
    excerpt: 'Krest Delivery will be closed on Wednesday, December 25th in observance of Christmas Day. Plan your shipments accordingly to avoid delays.',
    links: [{ label: 'VIEW ALL HOLIDAYS', href: '/service-alerts/holiday-schedule' }],
  },
  {
    icon: Globe2,
    category: 'INTERNATIONAL',
    categoryColor: 'text-primary bg-primary/5 border-primary/10',
    title: 'MAIL SUSPENSION: CANADA',
    excerpt: 'Effective November 29, 2024, international mail service to Canada is temporarily suspended due to the Canadian Union of Postal Workers strike.',
    links: [{ label: 'LEARN MORE', href: '/service-alerts' }],
  },
];

function Update() {
  return (
    <section className="py-16 md:py-32 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="text-secondary text-sm font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-secondary"></span>
              STAY INFORMED
            </div>
            <h2 className="font-heading font-black italic text-5xl md:text-4xl md:text-6xl text-primary uppercase tracking-tighter leading-[0.9]">
              KREST DELIVERY
              <br />
              <span className="text-primary/80">SERVICE UPDATES.</span>
            </h2>
          </div>
        </div>

        {/* Update cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {updates.map((update, i) => {
            const Icon = update.icon;
            return (
              <div
                key={i}
                className="bg-white border border-primary/5 rounded-[2rem] p-8 shadow-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                <div
                  className={`inline-flex items-center gap-2 text-xs font-black tracking-widest px-4 py-1.5 rounded-full border mb-8 uppercase ${update.categoryColor}`}
                >
                  <Icon className="w-4 h-4" strokeWidth={2.5} />
                  {update.category}
                </div>
                <h3 className="font-heading font-black italic text-2xl text-primary uppercase tracking-tight mb-4 leading-snug">
                  {update.title}
                </h3>
                <p className="text-primary/80 text-sm font-medium leading-relaxed mb-8 flex-1">
                  {update.excerpt}
                </p>
                <div className="flex flex-col gap-4">
                  {update.links.map((link, j) => (
                    <Link
                      key={j}
                      href={link.href}
                      className="group flex items-center gap-2 text-sm font-bold tracking-widest text-primary hover:text-secondary transition-colors uppercase"
                    >
                      {link.label} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Newsroom banner */}
        <div className="bg-[#121c14] rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
          <div className="absolute inset-0 bg-secondary/5" />
          
          <div className="relative md:w-5/12 h-80 md:h-auto min-h-[300px]">
            <Image
              src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=2670&auto=format&fit=crop"
              alt="Krest Delivery Newsroom"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
          </div>
          
          <div className="md:w-7/12 p-6 md:p-10 md:p-8 md:p-16 flex flex-col justify-center relative z-10">
            <span className="text-secondary text-xs font-bold tracking-[0.3em] uppercase mb-4">
              NEWSROOM
            </span>
            <h3 className="font-heading font-black italic text-4xl md:text-4xl md:text-5xl text-white uppercase tracking-tighter mb-6 leading-tight">
              LATEST INSIGHTS FROM <br className="hidden md:block" />
              KREST DELIVERY
            </h3>
            <p className="text-white/60 font-medium mb-10 leading-relaxed max-w-lg">
              Stay up to date with the latest innovations, logistics trends, service
              announcements, and company news from our global network.
            </p>
            <Link href="/newsroom">
              <button className="flex items-center gap-4 text-sm font-black tracking-widest uppercase text-primary bg-secondary rounded-full px-8 py-4 hover:bg-white transition-all hover:scale-105 w-fit shadow-xl">
                VISIT NEWSROOM <ChevronRight className="w-5 h-5" strokeWidth={3} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Update;
