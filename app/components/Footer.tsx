'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-zinc-800 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center text-zinc-400">
          <p className="text-sm">
            © {currentYear} - Casper Sighting Database. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}



