"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';
// import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

type Props = {}
export default function Navbar(){
  const navRef = useRef<HTMLElement | null>(null);
  // const [pathname,setPathname]=useState("/")
   const pathname = usePathname();

  // useEffect(()=>{
  //     const path= usePathname();
  //     setPathname(path);
      
  // },[]);
  useGSAP(() => {
    if (pathname !== "/") {
      if (navRef.current) {
        gsap.set(navRef.current, { backgroundColor: 'rgba(0,0,0,1)' });
      }
      return;
    }
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (navRef.current) {
        if (scrollY > window.innerHeight) {
          gsap.to(navRef.current, { backgroundColor: 'rgba(0,0,0,1)', duration: 0.3, ease: 'power2.out' });
        } else {
          gsap.to(navRef.current, { backgroundColor: 'rgba(0,0,0,0)', duration: 0.3, ease: 'power2.out' });
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      className="z-50 h-15 max-w-[1536px] w-full px-3 fixed top-0 flex justify-between items-center gap-3 backdrop-blur-2xl text-white transition-colors duration-300"
      style={{ backgroundColor: pathname !== "/" ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0)' }}
    >
      <img src="/logo.jpg" alt="" className='h-8 w-8 ml-10'/>
      <div className='flex gap-10'>
        <a href="/" aria-label="Home">HOME</a>
        <a href="/digitalArchive" aria-label="Digital Archive">DIGITAL ARCHIVE</a>
        <a href="/map/monasteries" aria-label="Map">MAP</a>
        <a href="/guidesAndHotels" aria-label="Guides and Hotels">GUIDES & HOTELS</a>
        <a href="#" aria-label="Festivals and Events">FESTIVALS & EVENTS</a>
        <a href="#" aria-label="News">NEWS</a>
      </div>
      <div className='mr-10'>
         LOGIN/SIGNUP
      </div>
    </nav>
  );
}