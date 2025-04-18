import React from 'react';
import Link from 'next/link';
import SidebarGroup from './SidebarGroup'; // Import the new group component
import SearchField from './SearchField'; // Import the new field component
import { 
  BookOpen, Book, Film, Tv, Gamepad2, Music, Tag, Globe, 
  Heart, Settings, Compass // Keep navigation icons
} from 'lucide-react'; // Add relevant icons for groups
import '../styles/sidebar.css'; // Import the CSS for transitions

// --- Navigation Section (Keep existing structure, but simplified) --- 
const NavigationSection = () => {
  const currentPath = '/explore'; // Placeholder
  const navItems = [
    { href: '/explore', label: 'Explore', icon: Compass },
    { href: '/favorites', label: 'My Favorites', icon: Heart },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="mb-6">
      {/* Optional: Add a subtle header if needed, or just list items */}
      <nav className="space-y-1">
        {navItems.map(item => {
          const isActive = currentPath === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.label}
              href={item.href} 
              className={`group relative flex items-center gap-3 px-3 py-2 rounded-md 
                          transition-all duration-300 ease-in-out 
                          transform hover:scale-[1.02] hover:bg-gray-700/50 
                          ${isActive 
                            ? 'bg-cosmic-blue/20 text-white' 
                            : 'text-light-gray/70 hover:text-white'}
                         `}
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-md bg-neon-accent 
                            transition-all duration-300 ease-in-out 
                            ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 group-hover:opacity-50 group-hover:scale-y-50'}
                           `} 
                    style={{ transformOrigin: 'center' }}></div>
               <Icon className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ease-in-out 
                             ${isActive ? 'text-neon-accent' : 'text-medium-gray group-hover:text-light-gray'}
                            `} 
                     style={{ zIndex: 1 }}
               />
              <span className="text-sm font-medium" style={{ zIndex: 1 }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

// --- Main Sidebar Component --- 

export default function Sidebar() {
  // Placeholder onChange handler for search fields
  const handleSearchChange = (value: string) => {
    console.log('Search field changed:', value);
  };
  
  return (
    // Use w-72 or adjust as needed for wider content
    <aside className="w-72 p-4 bg-gradient-to-b from-midnight-ink/80 via-deep-purple/50 to-midnight-ink/80 backdrop-blur-md border-r border-white/5 flex-shrink-0 h-screen sticky top-0 overflow-y-auto no-scrollbar">
       <div className="mt-2 mb-6 h-8 px-2">{/* Placeholder for Logo/Brand later */}</div>
       
       {/* Search Groups */}
       <div className="space-y-1 px-2">
          <SidebarGroup title="Books" icon={<BookOpen size={16} className="text-medium-gray"/>}>
            <SearchField placeholder="Author..." onChange={handleSearchChange} />
            <SearchField placeholder="Title..."  onChange={handleSearchChange} />
            <SearchField placeholder="ISBN..."   onChange={handleSearchChange} />
            {/* TODO: Add Genre select */} 
          </SidebarGroup>

          <SidebarGroup title="Comics" icon={<Book size={16} className="text-medium-gray"/>}>
            <SearchField placeholder="Series…"  onChange={handleSearchChange} />
            <SearchField placeholder="Issue #…"   onChange={handleSearchChange} />
             {/* TODO: Add Publisher select */} 
          </SidebarGroup>

          <SidebarGroup title="Movies" icon={<Film size={16} className="text-medium-gray"/>}>
            <SearchField placeholder="Title…"  onChange={handleSearchChange} />
            <SearchField placeholder="Year…"   onChange={handleSearchChange} />
             {/* TODO: Add Director/Actor search */} 
          </SidebarGroup>

          <SidebarGroup title="TV Shows" icon={<Tv size={16} className="text-medium-gray"/>}>
            <SearchField placeholder="Show…" onChange={handleSearchChange} />
            <SearchField placeholder="Season #…" onChange={handleSearchChange} />
             {/* TODO: Add Network/Streaming Service */} 
          </SidebarGroup>

          <SidebarGroup title="Anime" icon={<Tv size={16} className="text-medium-gray"/>}> {/* Re-use Tv or find specific icon */} 
            <SearchField placeholder="Title…" onChange={handleSearchChange} />
            <SearchField placeholder="Studio…" onChange={handleSearchChange} />
          </SidebarGroup>

          <SidebarGroup title="Gaming" icon={<Gamepad2 size={16} className="text-medium-gray"/>}>
            <SearchField placeholder="Game Title…"   onChange={handleSearchChange} />
            <SearchField placeholder="Platform…" onChange={handleSearchChange} />
            {/* TODO: Add Genre/Developer */} 
          </SidebarGroup>

          <SidebarGroup title="Fan Content" icon={<Heart size={16} className="text-medium-gray"/>}> {/* Using Heart as placeholder */} 
            <SearchField placeholder="Author/Artist…"  onChange={handleSearchChange} />
            <SearchField placeholder="Rating…"  onChange={handleSearchChange} />
            <SearchField placeholder="Word Count ≥…" onChange={handleSearchChange} />
             {/* TODO: Add Completion Status Radios */} 
          </SidebarGroup>

          <SidebarGroup title="Tags" icon={<Tag size={16} className="text-medium-gray"/>}>
            <SearchField placeholder="Include tags…" onChange={handleSearchChange} />
            <SearchField placeholder="Exclude tags…" onChange={handleSearchChange} />
          </SidebarGroup>

          <SidebarGroup title="Fandoms" icon={<Globe size={16} className="text-medium-gray"/>}>
            <SearchField placeholder="Fandom name…" onChange={handleSearchChange} />
          </SidebarGroup>
       </div>
       
       {/* Divider */}
       <div className="h-px bg-white/10 mx-3 my-4"></div> 

       {/* Navigation remains at the bottom or could be integrated */}
       <div className="px-2">
         <NavigationSection />
       </div>
    </aside>
  );
} 