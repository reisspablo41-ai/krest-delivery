'use client';
import { IoIosArrowUp, IoMdClose } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import Image from 'next/image';
import Link from 'next/link';
import { CiBoxes, CiCalculator1 } from 'react-icons/ci';
import { PiMailboxBold } from 'react-icons/pi';
import { FaHome } from 'react-icons/fa';
import { BsBoxes } from 'react-icons/bs';
import { useState } from 'react';
import { TbHandStop } from 'react-icons/tb';
import { LiaStampSolid } from 'react-icons/lia';
import { motion } from 'framer-motion';

function MobileMainMenu({ setIsMobileMenu }) {
  const [activeMenuQuick, setActiveMenuQuick] = useState(false);
  const [activeMenuSend, setActiveMenuSend] = useState(false);
  const [activeMenuReceive, setActiveMenuReceive] = useState(false);
  const [activeMenuHelp, setActiveMenuHelp] = useState(false);

  return (
    <motion.div
      className="h-screen w-full bg-gray-900 fixed top-0 left-0 z-[999] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
        <Link href="/" onClick={() => setIsMobileMenu(false)}>
          <Image
            src="/krest-logo.png"
            width={100}
            height={70}
            sizes="(max-width: 600px) 100px, 200px"
            alt="Header-Logo"
            unoptimized
          />
        </Link>
        <IoMdClose
          className="text-white text-3xl cursor-pointer"
          onClick={() => setIsMobileMenu(false)}
        />
      </div>

      {/* Menu list */}
      <ul className="text-white">

        {/* Quick Tools */}
        <li className="border-b border-gray-700">
          <div
            className="flex justify-between items-center p-5 cursor-pointer"
            onClick={() => setActiveMenuQuick(prev => !prev)}
          >
            <p className="text-base font-semibold">Quick Tools</p>
            {activeMenuQuick ? <IoIosArrowUp className="text-2xl" /> : <IoIosArrowDown className="text-2xl" />}
          </div>
          {activeMenuQuick && (
            <ul className="px-10 pb-4 space-y-4">
              <Link href="/Track" onClick={() => setIsMobileMenu(false)}>
                <li className="flex items-center gap-3 pt-2"><BsBoxes className="text-xl" /> Track Package</li>
              </Link>
              <Link href="/dashboard/informed-delivery" onClick={() => setIsMobileMenu(false)}>
                <li className="flex items-center gap-3"><PiMailboxBold className="text-xl" /> Informed Delivery</li>
              </Link>
              <li className="flex items-center gap-3"><LiaStampSolid className="text-xl" /> Buy Stamps</li>
              <Link href="/schedule-a-pickup" onClick={() => setIsMobileMenu(false)}>
                <li className="flex items-center gap-3"><CiBoxes className="text-xl" /> Schedule A Pickup</li>
              </Link>
              <Link href="/dashboard/informed-delivery" onClick={() => setIsMobileMenu(false)}>
                <li className="flex items-center gap-3"><FaHome className="text-xl" /> Change My Address</li>
              </Link>
              <li className="flex items-center gap-3"><CiCalculator1 className="text-xl" /> Calculate A Price</li>
            </ul>
          )}
        </li>

        {/* Send */}
        <li className="border-b border-gray-700">
          <div
            className="flex justify-between items-center p-5 cursor-pointer"
            onClick={() => setActiveMenuSend(prev => !prev)}
          >
            <p className="text-base font-semibold">Send</p>
            {activeMenuSend ? <IoIosArrowUp className="text-2xl" /> : <IoIosArrowDown className="text-2xl" />}
          </div>
          {activeMenuSend && (
            <ul className="px-10 pb-4 space-y-4">
              <Link href="/Track" onClick={() => setIsMobileMenu(false)}>
                <li className="flex items-center gap-3 pt-2"><BsBoxes className="text-xl" /> Track Package</li>
              </Link>
              <Link href="/schedule-a-pickup" onClick={() => setIsMobileMenu(false)}>
                <li className="flex items-center gap-3"><CiBoxes className="text-xl" /> Schedule A Pickup</li>
              </Link>
              <Link href="/ship/sending-mail" onClick={() => setIsMobileMenu(false)}>
                <li className="flex items-center gap-3">Sending Mail</li>
              </Link>
              <Link href="/ship/sending-package" onClick={() => setIsMobileMenu(false)}>
                <li className="flex items-center gap-3">Sending Packages</li>
              </Link>
              <li className="flex items-center gap-3">Shipping Restrictions</li>
              <Link href="/buisness/postage-prices" onClick={() => setIsMobileMenu(false)}>
                <li className="flex items-center gap-3">Postage Prices</li>
              </Link>
              <li className="flex items-center gap-3">Filing A Claim</li>
              <li className="flex items-center gap-3">Requesting a Refund</li>
            </ul>
          )}
        </li>

        {/* Receive */}
        <li className="border-b border-gray-700">
          <div
            className="flex justify-between items-center p-5 cursor-pointer"
            onClick={() => setActiveMenuReceive(prev => !prev)}
          >
            <p className="text-base font-semibold">Receive</p>
            {activeMenuReceive ? <IoIosArrowUp className="text-2xl" /> : <IoIosArrowDown className="text-2xl" />}
          </div>
          {activeMenuReceive && (
            <ul className="px-10 pb-4 space-y-4">
              <Link href="/Track" onClick={() => setIsMobileMenu(false)}>
                <li className="flex items-center gap-3 pt-2"><BsBoxes className="text-xl" /> Track Package</li>
              </Link>
              <Link href="/schedule-a-pickup" onClick={() => setIsMobileMenu(false)}>
                <li className="flex items-center gap-3"><CiBoxes className="text-xl" /> Schedule A Pickup</li>
              </Link>
              <Link href="/dashboard/informed-delivery" onClick={() => setIsMobileMenu(false)}>
                <li className="flex items-center gap-3"><TbHandStop className="text-xl" /> Hold Mail</li>
              </Link>
              <Link href="/dashboard/informed-delivery" onClick={() => setIsMobileMenu(false)}>
                <li className="flex items-center gap-3"><FaHome className="text-xl" /> Change My Address</li>
              </Link>
              <li className="flex items-center gap-3">Managing Mail</li>
              <Link href="/receive/mail-for-deceased" onClick={() => setIsMobileMenu(false)}>
                <li className="flex items-center gap-3">Mail for Deceased</li>
              </Link>
              <Link href="/dashboard/informed-delivery" onClick={() => setIsMobileMenu(false)}>
                <li className="flex items-center gap-3">Redirecting a Package</li>
              </Link>
            </ul>
          )}
        </li>

        {/* Help */}
        <li className="border-b border-gray-700">
          <div
            className="flex justify-between items-center p-5 cursor-pointer"
            onClick={() => setActiveMenuHelp(prev => !prev)}
          >
            <p className="text-base font-semibold">Help</p>
            {activeMenuHelp ? <IoIosArrowUp className="text-2xl" /> : <IoIosArrowDown className="text-2xl" />}
          </div>
          {activeMenuHelp && (
            <ul className="px-10 pb-4 space-y-4">
              <Link href="/Faqs" onClick={() => setIsMobileMenu(false)}>
                <li className="pt-2">Faqs</li>
              </Link>
              <Link href="/ContactUs/RequestRefund" onClick={() => setIsMobileMenu(false)}>
                <li>Requesting a Refund</li>
              </Link>
              <Link href="/ContactUs/FileClaim" onClick={() => setIsMobileMenu(false)}>
                <li>Filing A Claim</li>
              </Link>
            </ul>
          )}
        </li>

      </ul>
    </motion.div>
  );
}

export default MobileMainMenu;
