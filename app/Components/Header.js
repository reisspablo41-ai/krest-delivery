'use client';

import Image from 'next/image';
import UserDetails from './UserDetails';
import Link from 'next/link';
import useScrollPosition from '../Hooks/scrollPostionDetection';
import { usePathname } from 'next/navigation';
import MainMenu from './MainMenu';
import useWindowWidth from './Functions/getBrowserWidth';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

function Header() {
  const pathname = usePathname();
  const scrollPosition = useScrollPosition(100);
  const width = useWindowWidth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  function toggleSection(id) {
    setOpenSection(prev => prev === id ? null : id);
  }

  const navItems = [
    {
      id: 1,
      label: 'QUICK TOOLS',
      subItems: [
        { label: 'Track Package', href: '/Track' },
        { label: 'Informed Delivery', href: '/dashboard/informed-delivery' },
        { label: 'Buy Stamps', href: '/krest-deliverystore/buy-stamps' },
        { label: 'Schedule A Pickup', href: '/schedule-a-pickup' },
        { label: 'Change My Address', href: '/dashboard/informed-delivery' },
        { label: 'Calculate A Price', href: '/' },
      ]
    },
    {
      id: 2,
      label: 'SEND',
      subItems: [
        { label: 'Sending Mail', href: '/ship/sending-mail' },
        { label: 'Sending Package', href: '/ship/sending-package' },
        { label: 'Shipping Restrictions', href: '#' },
        { label: 'Filing A Claim', href: '/ContactUs/FileClaim' },
        { label: 'Requesting a Refund', href: '/ContactUs/RequestRefund' },
        { label: 'Postage Prices', href: '/buisness/postage-prices' },
      ]
    },
    {
      id: 3,
      label: 'RECEIVE',
      subItems: [
        { label: 'Track Package', href: '/Track' },
        { label: 'Hold Mail', href: '/dashboard/informed-delivery' },
        { label: 'Change of Address', href: '/dashboard/informed-delivery' },
        { label: 'Managing Mail', href: '#' },
        { label: 'Mail for Deceased', href: '/receive/mail-for-deceased' },
        { label: 'Redirecting a Package', href: '/dashboard/informed-delivery' },
      ]
    },
    {
      id: 4,
      label: 'HELP',
      subItems: [
        { label: 'Faqs', href: '/Faqs' },
        { label: 'Requesting a Refund', href: '/ContactUs/RequestRefund' },
        { label: 'Filing A Claim', href: '/ContactUs/FileClaim' },
        { label: 'Customer Testimonials', href: '/testimonials' },
      ]
    },
  ];

  return (
    <>
      {pathname === '/' ? null : <div className="h-[8vh] md:h-0"></div>}
      <div className={`fixed top-0 w-full z-[9999] transition-all duration-300 ${scrollPosition ? 'py-2 md:py-4' : 'py-4 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className={`flex items-center justify-between px-4 md:px-8 py-2 md:py-4 transition-all duration-300 ${
            scrollPosition || pathname !== '/'
              ? 'bg-white/95 backdrop-blur-xl shadow-card'
              : 'bg-white/95 backdrop-blur-xl shadow-2xl'
          } rounded-2xl md:rounded-[2.5rem]`}>
            <div className="flex items-center gap-4">
              <div className="md:hidden">
                <button
                  onClick={() => { setIsMenuOpen(!isMenuOpen); setOpenSection(null); }}
                  className="p-2 text-primary hover:bg-gray-100 rounded-xl transition-colors"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
              <div className="flex-shrink-0">
                <Link href="/">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="relative w-28 h-10 md:w-36 md:h-12 transition-all duration-300">
                      <Image
                        src="/logo.png"
                        alt="Krest Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="hidden md:flex flex-1 justify-center">
              <MainMenu />
            </div>

            <div className="flex items-center gap-3 md:gap-6">
              <UserDetails />
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-2 bg-white shadow-2xl rounded-2xl border border-gray-100">
              <div className="py-2">
                {navItems.map((item) => (
                  <div key={item.id} className="border-b border-gray-50 last:border-none">
                    <button
                      className={`w-full px-6 py-4 flex items-center justify-between ${
                        openSection === item.id ? 'bg-primary/5 text-primary' : 'text-primary/70'
                      }`}
                      onClick={() => toggleSection(item.id)}
                    >
                      <span className="text-xs font-black tracking-widest">{item.label}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${openSection === item.id ? 'rotate-180 text-primary' : 'text-gray-400'}`}
                      />
                    </button>

                    {openSection === item.id && (
                      <div className="bg-gray-50/50 px-8 py-2 pb-4 grid grid-cols-1 gap-1">
                        {item.subItems.map((subItem, idx) => (
                          <Link
                            key={idx}
                            href={subItem.href}
                            className="py-2.5 text-[11px] font-bold text-gray-500 hover:text-primary transition-colors flex items-center gap-2"
                            onClick={() => { setIsMenuOpen(false); setOpenSection(null); }}
                          >
                            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
