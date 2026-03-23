'use client';

import { useState, useEffect } from 'react';
import QuickToolsMenu from './QuickToolsMenu';
import { useUserContext } from '../Context/UserContext';
import SendMenu from './SendMenu';
import ReceiveMenu from './ReceiveMenu';
import HelpMenu from './HelpMenu';
import Link from 'next/link';

function MainMenu() {
  const { setActiveMenu, activeMenu } = useUserContext();

  useEffect(() => {
    const closeMenu = () => setActiveMenu(null);
    const handleClickOutside = (event) => {
      if (!event.target.closest('.menu-item') && !event.target.closest('.menu')) {
        closeMenu();
      }
    };
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') closeMenu();
    };
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [activeMenu, setActiveMenu]);

  const navItems = [
    { id: 1, label: 'QUICK TOOLS' },
    { id: 2, label: 'SEND' },
    { id: 3, label: 'RECEIVE' },
    { id: 4, label: 'HELP' },
  ];

  return (
    <div className="relative flex-1 flex justify-center">
      <ul className="flex items-center space-x-4 md:space-x-8 lg:space-x-12">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={`menu-item text-[10px] md:text-xs lg:text-sm font-bold tracking-[0.1em] md:tracking-[0.15em] cursor-pointer transition-colors duration-200 ${
              activeMenu === item.id ? 'text-secondary' : 'text-primary/70 hover:text-primary'
            }`}
            onMouseOver={() => setActiveMenu(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <div className="absolute top-full mt-6 w-full flex justify-center z-50">
        {activeMenu === 1 && <QuickToolsMenu className="menu shadow-2xl rounded-2xl overflow-hidden glass !bg-white" />}
        {activeMenu === 2 && <SendMenu className="menu shadow-2xl rounded-2xl overflow-hidden glass !bg-white" />}
        {activeMenu === 3 && <ReceiveMenu className="menu shadow-2xl rounded-2xl overflow-hidden glass !bg-white" />}
        {activeMenu === 4 && <HelpMenu className="menu shadow-2xl rounded-2xl overflow-hidden glass !bg-white" />}
      </div>
    </div>
  );
}

export default MainMenu;
