'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import casperLogo from '../assets/casper.png';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="bg-black border-b border-zinc-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image 
              src={casperLogo} 
              alt="WraithWatchers Logo" 
              width={100} 
              height={100}
              className="object-contain"
            />
            <h1 className="text-2xl font-bold text-[#F8F8F8] tracking-tight">
              Catch Me If You Can!
            </h1>
          </Link>
          
          <nav className="flex gap-3">
            <Link
              href="/"
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                pathname === '/'
                  ? 'bg-white text-black'
                  : 'bg-transparent text-[#F8F8F8] border border-zinc-700 hover:border-zinc-500'
              }`}
            >
              Sightings Map
            </Link>
            <Link
              href="/post"
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                pathname === '/post'
                  ? 'bg-[#FF9F40] text-black'
                  : 'bg-[#FF9F40] text-black hover:bg-[#ffb366]'
              }`}
            >
              Post a Sighting
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

