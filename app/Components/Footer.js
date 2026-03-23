import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Linkedin, Mail, ChevronRight } from 'lucide-react';
import NewsletterForm from './NewsLetter';

const footerLinks = [
  {
    heading: 'SERVICES',
    links: [
      { label: 'Ship a Package', href: '/ship/sending-package' },
      { label: 'Track Shipment', href: '/Track' },
      { label: 'Schedule Pickup', href: '/dashboard/schedule-package-delivery' },
      { label: 'Pet Shipping', href: '/pet-shipping' },
      { label: 'Rates Calculator', href: '/' },
    ],
  },
  {
    heading: 'COMPANY',
    links: [
      { label: 'About Krest', href: '/about-krest' },
      { label: 'Newsroom', href: '/newsroom' },
      { label: 'Service Alerts', href: '/service-alerts' },
      { label: 'Business Solutions', href: '/buisness/weekend-pickup-deliveries' },
    ],
  },
  {
    heading: 'SUPPORT',
    links: [
      { label: 'Contact Us', href: '/ContactUs' },
      { label: 'FAQs', href: '/Faqs' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'File a Claim', href: '/ContactUs/FileClaim' },
      { label: 'Accessibility', href: '/accessibility-statement' },
    ],
  },
  {
    heading: 'LEGAL',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Requirements & Policies', href: '/shipment-protection-handling-policy' },
      { label: 'Terms of Use', href: '/terms-of-use' },
    ],
  },
];

const socials = [
  { Icon: Facebook, href: '#' },
  { Icon: Instagram, href: '#' },
  { Icon: Twitter, href: '#' },
  { Icon: Linkedin, href: '#' },
];

function Footer() {
  return (
    <footer className="bg-[#121c14] text-white border-t border-white/5 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-8">
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10">
                  <Image
                    src="/logo.png"
                    alt="Krest Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="font-heading font-black italic text-4xl text-white tracking-tighter">
                  KREST <span className="text-secondary tracking-widest">DELIVERY</span>
                </div>
              </div>
            </Link>
            <p className="text-white/50 text-base font-medium leading-relaxed mb-10 max-w-sm">
              Premium global shipping and logistics solutions trusted by millions. Fast, reliable, and always trackable.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="w-12 h-12 bg-white/5 hover:bg-secondary hover:text-primary rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 hover:scale-110 group"
                >
                  <Icon className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" strokeWidth={2} />
                </Link>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerLinks.map((col, i) => (
            <div key={i} className="lg:ml-4">
              <h4 className="font-heading font-black italic text-xl text-white mb-6 uppercase tracking-widest pb-4 border-b border-white/10">
                {col.heading}
              </h4>
              <ul className="space-y-4">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-white/50 hover:text-secondary text-sm font-bold tracking-wide transition-colors duration-300"
                    >
                      <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" strokeWidth={3} />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter strip */}
      <div className="border-t border-white/10 bg-white/[0.02] relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <h4 className="font-heading font-black italic text-3xl text-white uppercase tracking-tight mb-2">
                STAY IN THE <span className="text-secondary">LOOP.</span>
              </h4>
              <p className="text-white/50 font-medium">
                Get shipping tips, service updates, and exclusive logistics offers.
              </p>
            </div>
            <div className="lg:w-[450px] flex-shrink-0">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-[#0d1610] relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 font-medium text-sm">
            © {new Date().getFullYear()} Krest Delivery. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:support@krestdelivery.com"
              className="group flex items-center gap-3 text-white/40 hover:text-white font-bold text-sm tracking-wide transition-colors uppercase"
            >
              <Mail className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              support@krestdelivery.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
