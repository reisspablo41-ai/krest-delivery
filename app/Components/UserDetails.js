'use client';

import Link from 'next/link';
import { GrNext } from 'react-icons/gr';
import ButtonBig from './ButtonBig';
import { supabase } from '../supabaseClient';
import Image from 'next/image';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import ButtonSpinner from './ButtonSpinner';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../Context/UserContext';

function UserDetails() {
  const { user, setUser } = useUserContext(); // Access user from context
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const email = user?.user_metadata?.email;
  const prefix = email?.split('@')[0];
  const fullName = user?.user_metadata?.name || prefix;
  const userImage = user?.user_metadata?.avatar_url || '/user.avif';

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();

      setUser(null); // Clear user from context

      router.replace('/');
    } catch (error) {
      console.error('Error signing out:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const userContent = loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <p className="text-white mr-1 text-xs md:text-sm hidden sm:block">{fullName}</p>
      <Image
        src={userImage}
        height={32}
        width={32}
        alt="User Avatar"
        className="rounded-full md:w-10 md:h-10"
      />

      <div className="relative">
        <RiArrowDropDownLine
          className="text-white text-2xl md:text-3xl cursor-pointer"
          onClick={toggleMenu}
        />
        {isMenuOpen && (
          <div className="absolute mt-5 w-48 bg-gray-800 text-white rounded shadow-lg z-10 right-0 md:left-[-450%]">
            <ul className="py-2">
              <Link href="/dashboard/myprofile">
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Profile
                </li>
              </Link>
              <Link href="/dashboard">
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Dashboard
                </li>
              </Link>

              <li className="px-4 py-2 hover:bg-gray-700">
                <button
                  onClick={handleSignOut}
                  disabled={loading}
                  className={`w-full text-left ${loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  {loading ? <ButtonSpinner /> : 'Logout'}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="flex items-center space-x-2 md:space-x-4 md:mr-10">
      {user ? (
        userContent
      ) : (
        <Link href="/auth">
          <button className="bg-primary hover:bg-[#121c14] text-white text-[10px] md:text-sm font-bold tracking-widest font-heading italic uppercase px-4 py-2 md:px-8 md:py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg border border-primary/20">
            SIGN UP / SIGN IN
          </button>
        </Link>
      )}
    </div>
  );
}

export default UserDetails;
