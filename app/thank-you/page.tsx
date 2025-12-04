import Link from 'next/link';
import Image from 'next/image';

export default function ThankYou() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-[#F8F8F8] mb-6">Thank You!</h1>
        <p className="text-2xl text-zinc-300 mb-12">
          May you be clear of scary spirits!
        </p>

        <div className="relative w-full max-w-2xl mx-auto aspect-square mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF9F40]/20 to-transparent rounded-3xl"></div>
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Decorative illustration - using a placeholder for now */}
            <div className="w-full max-w-xl aspect-square bg-gradient-to-br from-[#D4A574] via-[#E8C4A0] to-[#F5E6D3] rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl">
              {/* Background circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 bg-[#E8B86D] rounded-full"></div>
              </div>
              
              {/* Decorative plant/sage illustration */}
              <div className="relative z-10 text-center">
                <div className="text-[#4A5D4F] text-9xl mb-4">🌿</div>
                <div className="text-[#8B4513] text-6xl">🏺</div>
              </div>

              {/* Decorative wavy smoke */}
              <div className="absolute top-1/4 left-1/4 text-6xl opacity-30">〰️</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-white hover:bg-zinc-200 text-black font-semibold rounded-xl transition-colors"
          >
            View Sightings Map
          </Link>
          <Link
            href="/post"
            className="px-8 py-3 bg-[#FF9F40] hover:bg-[#ffb366] text-black font-semibold rounded-xl transition-colors"
          >
            Post Another Sighting
          </Link>
        </div>
      </div>
    </div>
  );
}

