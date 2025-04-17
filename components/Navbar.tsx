'use client'; // Needed for useState

import React, { useState, Fragment } from 'react'; // Import Fragment
import Link from 'next/link'; // Use Next.js Link for navigation
import { Flame, Menu, X, ChevronDown, Compass, Tv, Book, Film, Gamepad2, Music, DiscAlbum, User, LogOut } from 'lucide-react'; // Add Menu, X, and ChevronDown icons
import { Popover, Transition } from '@headlessui/react'; // Import Popover and Transition
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'; // Import hooks
import { useRouter } from 'next/navigation'; // For redirect after sign out
import Image from 'next/image'; // For user avatar

// --- Placeholder Components for Panel Content ---
// (These could be moved to separate files later)

const FandomsPanel = () => {
  // Updated data structure with icons and potentially descriptions/images later
  const fandomCategories = [
    {
      title: 'Anime & Manga',
      icon: Book, // Or a specific manga icon if available
      items: [
        { name: 'Jujutsu Kaisen', slug: 'jujutsu-kaisen', img: '/img/fandoms/jjk-thumb.jpg' }, // Example img path
        { name: 'One Piece', slug: 'one-piece' },
        { name: 'Spy x Family', slug: 'spy-x-family' },
      ]
    },
    {
      title: 'Books & Literature',
      icon: Book,
      items: [
        { name: 'Harry Potter', slug: 'harry-potter' },
        { name: 'Percy Jackson', slug: 'percy-jackson' },
        { name: 'Mistborn', slug: 'mistborn' },
      ]
    },
    {
      title: 'Movies & TV',
      icon: Tv,
      items: [
        { name: 'Marvel Cinematic Universe', slug: 'mcu' },
        { name: 'Star Wars', slug: 'star-wars' },
        { name: 'Bridgerton', slug: 'bridgerton' },
      ]
    },
    {
      title: 'Video Games',
      icon: Gamepad2,
      items: [
        { name: 'Baldur\'s Gate 3', slug: 'baldurs-gate-3' },
        { name: 'Genshin Impact', slug: 'genshin-impact' },
        { name: 'Minecraft', slug: 'minecraft' },
      ]
    },
    {
      title: 'Music & Bands',
      icon: Music,
      items: [
        { name: 'BTS', slug: 'bts' },
        { name: 'Taylor Swift', slug: 'taylor-swift' },
        { name: 'Stray Kids', slug: 'stray-kids' },
      ]
    },
    {
      title: 'Other Media',
      icon: DiscAlbum,
      items: [
        { name: 'Podcasts', slug: 'podcasts' },
        { name: 'Web Series', slug: 'web-series' },
        { name: 'RPGs', slug: 'rpgs' },
      ]
    },
  ];

  return (
    // Use theme colors, add padding, improve layout
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5 p-6 bg-midnight-ink text-light-gray">
      {fandomCategories.map(category => {
        const CategoryIcon = category.icon; // Get the icon component
        return (
          <div key={category.title} className="space-y-2">
            <h4 className="flex items-center gap-2 font-headline font-semibold text-base mb-2 text-neon-accent">
              <CategoryIcon className="w-4 h-4" />
              {category.title}
            </h4>
            <ul className="text-sm space-y-1.5 font-sans">
              {category.items.map(item => (
                <li key={item.slug}>
                  {/* Use fandom slug for the link */}
                  <Link 
                    href={`/fandoms/${item.slug}`}
                    className="flex items-center gap-2 text-light-gray/80 hover:text-white hover:translate-x-1 transition-all duration-150 ease-in-out group"
                  >
                    {/* Placeholder image - show if available */}
                    {item.img ? (
                      <Image src={item.img} alt="" width={20} height={20} className="w-5 h-5 rounded object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded bg-medium-gray/50 flex-shrink-0 group-hover:bg-cosmic-blue/70 transition-colors"></div>
                    )}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      {/* Update View All link style */}
      <div className="col-span-full mt-4 text-center border-t border-medium-gray/30 pt-4">
        <Link href="/explore?filter=fandoms" className="text-sm font-medium text-neon-accent hover:underline">
          Explore All Fandoms
        </Link>
      </div>
    </div>
  );
};

const TrendingPanel = () => (
  <div className="p-5 space-y-4 max-w-sm">
    {/* Add filter bar later */}
    {[ { id: 1, title: 'Coffee Shop AU Like No Other', type: 'Fanfic', stats: '1.3k ♡' },
      { id: 2, title: 'Webcomic: Dragon Prince Ch. 12', type: 'Comic', stats: '850 ♡' },
      { id: 3, title: 'Stunning Character Edit [AMV]', type: 'Video', stats: '2.1k ♡' },
    ].map(item => (
      <Link href={`/works/${item.id}`} key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition duration-150 ease-in-out">
        <div className="w-16 h-10 bg-gray-600 rounded flex-shrink-0"></div> {/* Placeholder Thumbnail */}
        <div className="flex-grow">
          <h4 className="text-sm font-semibold truncate text-white">{item.title}</h4>
          <p className="text-xs text-gray-400">{item.type} - {item.stats}</p>
        </div>
      </Link>
    ))}
    <div className="mt-3 text-center">
      <Link href="/trending" className="text-sm font-medium text-neo-teal hover:underline">
        View All Trending
      </Link>
    </div>
  </div>
);

const CreatePanel = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 max-w-md">
    <div>
      <h4 className="font-semibold text-base mb-2 text-white">Start New...</h4>
      <ul className="space-y-1">
        {[ 'Fanfic', 'Comic', 'Video Edit', 'Reading List'].map(item => (
          <li key={item}>
            <Link href={`/create/${item.toLowerCase().replace(/\s+/g, '-')}`} className="block p-2 rounded-lg text-sm text-gray-400 hover:bg-gray-700 hover:text-spring-mint">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <div>
      <h4 className="font-semibold text-base mb-2 text-white">Resources</h4>
      <ul className="space-y-1">
        {[ 'Writing Prompts', 'Challenge Calendar', 'Submission Rules'].map(item => (
          <li key={item}>
            <Link href={`/resources/${item.toLowerCase().replace(/\s+/g, '-')}`} className="block p-2 rounded-lg text-sm text-gray-400 hover:bg-gray-700 hover:text-spring-mint">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// --- Main Navbar Component ---

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  // TODO: Fetch user profile to get avatar_url if available
  const userProfile = { avatar_url: null }; // Placeholder

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    closeMobileMenu();
    router.push('/'); // Redirect to home after sign out
  };

  // Add Explore as a simple link
  const simpleNavItems = [
    { name: 'Explore', href: '/explore' },
    // Add other simple links here if needed
  ];

  const popoverNavItems = [
    { name: 'Fandoms', panel: <FandomsPanel /> },
    { name: 'Trending', panel: <TrendingPanel /> },
    { name: 'Create', panel: <CreatePanel /> },
  ];

  return (
    // Use theme colors for nav background and text
    <nav className="sticky top-0 z-50 bg-midnight-ink shadow-md border-b border-deep-purple/50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand Name - Use theme colors */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-neon-accent hover:opacity-80 transition-opacity" onClick={closeMobileMenu}>
          <Flame className="w-6 h-6 text-neon-accent" /> {/* Use accent color */}
          CrossMedia Fan Hub
        </Link>

        {/* Desktop Navigation Links (Simple + Popovers) - Use theme colors */}
        <div className="hidden md:flex items-center gap-2 text-base font-medium">
          {/* Simple Links */} 
          {simpleNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group inline-flex items-center rounded-md px-3 py-2 text-light-gray hover:bg-deep-purple/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-accent focus-visible:ring-opacity-75 transition-colors"
            >
              {item.name === 'Explore' && <Compass className="mr-1 h-5 w-5 text-light-gray/70 group-hover:text-white transition-colors" />}
              <span>{item.name}</span>
            </Link>
          ))}
          {/* Popover Links */} 
          {popoverNavItems.map((item) => (
            <Popover key={item.name} className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`group inline-flex items-center rounded-md px-3 py-2 text-light-gray hover:bg-deep-purple/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-accent focus-visible:ring-opacity-75 transition-colors ${open ? 'bg-deep-purple/50 text-white' : ''}`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`ml-1 h-5 w-5 text-light-gray/70 group-hover:text-white transition duration-150 ease-in-out ${open ? 'transform rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    {/* Adjusted Panel width logic based on item name or content needs */}
                    <Popover.Panel className={`absolute left-1/2 z-10 mt-3 w-screen ${item.name === 'Fandoms' ? 'max-w-xl' : 'max-w-sm'} -translate-x-1/2 transform px-4 sm:px-0`}>
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        {/* Panel content is now themed */}
                        {item.panel}
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          ))}
        </div>

        {/* Right side: Desktop Auth Button + Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
           {/* Desktop Auth Button - Use theme colors */}
           <div className="hidden md:block">
             {session ? (
               // Simple User Menu (can be expanded later)
               <div className="flex items-center gap-3">
                 <Link href="/profile/edit" className="flex items-center gap-2 text-sm text-light-gray hover:text-white group">
                   {userProfile.avatar_url ? (
                     <Image 
                       src={userProfile.avatar_url} 
                       alt="User Avatar"
                       width={28}
                       height={28}
                       className="rounded-full border border-medium-gray group-hover:border-neon-accent transition-colors"
                     />
                   ) : (
                     <User className="w-6 h-6 p-1 rounded-full bg-gray-700 text-gray-400 border border-gray-600 group-hover:border-neon-accent group-hover:text-neon-accent transition-colors" />
                   )}
                 </Link>
                  <button 
                   onClick={handleSignOut} 
                   className="bg-red-600/80 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-red-600 transition-opacity shadow-sm flex items-center gap-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
             ) : (
               <Link href="/auth/sign-in" passHref legacyBehavior>
                  <a className="bg-cosmic-blue text-white px-4 py-1.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity shadow-sm">
                    Sign In
                  </a>
               </Link>
             )}
           </div>

           {/* Mobile Menu Toggle Button - Use theme colors */}
           <button
             onClick={toggleMobileMenu}
             className="md:hidden p-1 text-light-gray hover:text-neon-accent"
             aria-label="Toggle menu"
           >
             {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
           </button>
         </div>
      </div>

      {/* Mobile Menu - Use theme colors */}
      <Transition
        show={isMobileMenuOpen}
        as="div"
        className="md:hidden"
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <div className="absolute top-full left-0 w-full bg-midnight-ink shadow-md border-t border-deep-purple/50 px-4 pt-3 pb-4">
          <div className="flex flex-col gap-3">
            {/* Mobile simple links */}
            {simpleNavItems.map(item => (
              <Link href={item.href} key={item.name} className="block py-1 text-light-gray hover:text-neon-accent" onClick={closeMobileMenu}>{item.name}</Link>
            ))}
            {/* Mobile popover links (simplified) */}
            {popoverNavItems.map(item => (
              <Link href={`/${item.name.toLowerCase()}`} key={item.name} className="block py-1 text-light-gray hover:text-neon-accent" onClick={closeMobileMenu}>{item.name}</Link>
            ))}
            {/* Mobile Sign In Button */}
            <div className="border-t border-gray-700 pt-4 mt-4">
              {session ? (
                  <button 
                   onClick={handleSignOut} 
                   className="w-full text-left block rounded-md px-3 py-2 text-base font-medium text-red-400 hover:bg-gray-700 hover:text-red-300"
                  >
                    Sign Out
                  </button>
              ) : (
                <Link href="/auth/sign-in" passHref legacyBehavior>
                  <a 
                    onClick={closeMobileMenu}
                    className="block rounded-md px-3 py-2 text-base font-medium text-cosmic-blue hover:bg-gray-700 hover:text-blue-300"
                  >
                    Sign In
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navbar; 