'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="bg-black border-b border-zinc-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="text-3xl">👻</span>
            <h1 className="text-2xl font-bold text-[#F8F8F8] tracking-tight">
              WraithWatchers
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

