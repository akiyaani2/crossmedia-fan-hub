import React from 'react';
import Link from 'next/link'; // Use Link for footer links too

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-midnight-ink text-cloud-gray py-10 mt-auto"> {/* Ensure footer sticks down */}
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6 text-sm">
          {/* Use placeholder paths */}
          <Link href="/about" className="hover:text-neo-teal transition-colors">About</Link>
          <Link href="/terms" className="hover:text-neo-teal transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-neo-teal transition-colors">Privacy Policy</Link>
          <Link href="/careers" className="hover:text-neo-teal transition-colors">Careers</Link>
          <Link href="/support" className="hover:text-neo-teal transition-colors">Support</Link>
          <Link href="/contact" className="hover:text-neo-teal transition-colors">Contact</Link>
        </div>
        <p className="text-xs text-gray-400">
          &copy; {currentYear} CrossMedia Fan Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 