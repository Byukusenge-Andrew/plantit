// src/components/Navbar.tsx
'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/button';
import useIsMobile from '@/hooks/useIsMobile';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`flex items-center justify-between p-5 md:p-9 mt-5 bg-white ${isMobile ? 'mobile-navbar' : ''}`}>
      <div className="flex items-center justify-between w-full max-w-[1370px] ">
        
        {/* Logo Section */}
        <div className="text-xl md:text-2xl font-semibold text-primary">
          <Image src="/navbarlogo.svg" alt="Logo" width={100} height={80} className="inline" />
        </div>
        
        {/* Hamburger Icon (visible only on small screens) */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>

        {/* Center Links */}
        <div className={`flex-grow md:flex ${isMenuOpen ? 'block' : 'hidden'} md:block text-black justify-center`}>
          <ul className={`flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 text-sm md:text-2xl font-extralight text-primary`}>
            <li><Link href="#features">Características</Link></li>
            <li><Link href="#clients">Precio</Link></li>
            <li><Link href="#contact">Contacto</Link></li>
          </ul>
        </div>

        {/* Right Section: Ingresar and Registrarse */}
        <div className={`flex mr-0 items-center space-x-5 text-sm md:text-2x font-extralight text-primary ${isMenuOpen ? 'flex-col items-start mt-4' : 'hidden'} md:flex md:flex-row`}>
          <Link href="/auth/sign-in" aria-label="Sign In">Ingresar</Link>
          <Button className="bg-transparent font-bold text-primary border-2 border-gray-950 hover:bg-blue-400 hover:border-0">
            Registrarse gratis
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
