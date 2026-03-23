'use client';

import Image from 'next/image';
import UserDetails from './UserDetails';
import Link from 'next/link';
import useScrollPosition from '../Hooks/scrollPostionDetection';
import { usePathname } from 'next/navigation';
import MainMenu from './MainMenu';
import useWindowWidth from './Functions/getBrowserWidth';
import MobileHeader from './MobileHeader';
import { useUserContext } from '../Context/UserContext';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const pathname = usePathname();
  const scrollPosition = useScrollPosition(100);
  const width = useWindowWidth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setActiveMenu, activeMenu } = useUserContext();

  const navItems = [
    { id: 1, label: 'QUICK TOOLS' },
    { id: 2, label: 'SEND' },
    { id: 3, label: 'RECEIVE' },
    { id: 4, label: 'HELP' },
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
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden mt-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-2xl overflow-hidden"
              >
                <ul className="py-4 px-2">
                  {navItems.map((item) => (
                    <li
                      key={item.id}
                      className="px-6 py-4 text-xs font-bold tracking-widest text-primary/70 hover:text-primary hover:bg-gray-50 rounded-xl transition-all cursor-pointer flex items-center justify-between group"
                      onClick={() => {
                        setActiveMenu(activeMenu === item.id ? null : item.id);
                      }}
                    >
                      {item.label}
                      <motion.div
                        animate={{ rotate: activeMenu === item.id ? 180 : 0 }}
                        className="text-gray-400 group-hover:text-primary"
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    </li>
                  ))}
                  <div className="mt-4 px-6 pt-4 border-t border-gray-100">
                    {/* Additional mobile links or buttons if needed */}
                  </div>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default Header;
