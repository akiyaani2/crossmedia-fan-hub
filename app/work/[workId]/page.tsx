import React from 'react';
import Link from 'next/link'; // For linking author, fandom, tags
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react'; // Icons for interactions

// Placeholder for the main content display (reader, image viewer, video player)
const WorkContentDisplay = ({ workType }: { workType: string }) => {
  let placeholderText = '[Work Content Placeholder]';
  if (workType === 'Fanfic') placeholderText = '[Fanfic Reader Placeholder]';
  if (workType === 'Art') placeholderText = '[Image Viewer Placeholder]';
  if (workType === 'Video') placeholderText = '[Video Player Placeholder]';

  return (
    <div className="bg-gray-800/30 border border-medium-gray/30 rounded-lg p-4 md:p-8 min-h-[60vh] flex items-center justify-center">
      <p className="text-medium-gray text-xl">{placeholderText}</p>
    </div>
  );
};

// Placeholder for metadata and interaction sidebar/section
const WorkSidebar = ({ workData }: { workData: any }) => {
  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
      {/* Author Info */}
      <div className="bg-gray-800/50 border border-medium-gray/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-neon-accent mb-3">Author</h3>
        <Link href={`/user/${workData.authorSlug}`} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cosmic-blue to-deep-purple flex-shrink-0 group-hover:ring-2 ring-neon-accent/50 transition-all"></div>
          <span className="text-light-gray group-hover:text-white transition-colors">{workData.author}</span>
        </Link>
      </div>

      {/* Metadata */}
      <div className="bg-gray-800/50 border border-medium-gray/30 rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold text-neon-accent mb-2">Details</h3>
        <div>
          <span className="text-xs font-medium text-medium-gray uppercase">Fandom:</span>
          <Link href={`/fandoms/${workData.fandomSlug}`} className="block text-sm text-light-gray hover:text-neon-accent transition-colors">{workData.fandom}</Link>
        </div>
        <div>
          <span className="text-xs font-medium text-medium-gray uppercase">Published:</span>
          <p className="text-sm text-light-gray">{workData.publishedDate}</p>
        </div>
        <div>
           <span className="text-xs font-medium text-medium-gray uppercase">Tags:</span>
           <div className="flex flex-wrap gap-1 mt-1">
             {workData.tags.map((tag: string) => (
               <Link href={`/explore?tag=${tag.toLowerCase()}`} key={tag} className="text-xs bg-cosmic-blue/70 text-light-gray px-2 py-0.5 rounded hover:bg-cosmic-blue transition-colors">
                 {tag}
               </Link>
             ))}
           </div>
         </div>
      </div>

      {/* Interactions & Stats */}
      <div className="bg-gray-800/50 border border-medium-gray/30 rounded-lg p-4 space-y-3">
         <h3 className="text-lg font-semibold text-neon-accent mb-2">Stats & Actions</h3>
         {/* Stats */}
         <div className="flex items-center justify-around text-light-gray mb-3">
           <span className="flex items-center text-sm">
             <Heart className="w-4 h-4 mr-1 text-soft-coral" /> {workData.likes}
           </span>
           <span className="flex items-center text-sm">
             <MessageCircle className="w-4 h-4 mr-1 text-neon-accent" /> {workData.comments}
           </span>
           <span className="flex items-center text-sm">
             <Bookmark className="w-4 h-4 mr-1 text-cosmic-blue" /> {workData.bookmarks}
           </span>
         </div>
         {/* Action Buttons */}
         <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded border border-soft-coral/50 text-soft-coral hover:bg-soft-coral/10 transition-colors text-sm"><Heart className="w-4 h-4"/> Like</button>
            <button className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded border border-cosmic-blue/50 text-cosmic-blue hover:bg-cosmic-blue/10 transition-colors text-sm"><Bookmark className="w-4 h-4"/> Bookmark</button>
            <button className="col-span-2 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded border border-neon-accent/50 text-neon-accent hover:bg-neon-accent/10 transition-colors text-sm"><Share2 className="w-4 h-4"/> Share</button>
         </div>
       </div>
    </aside>
  );
};

// Placeholder for Comments Section
const CommentsSection = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-white mb-6 border-b border-medium-gray/30 pb-2">Discussion</h2>
      {/* Placeholder for comment input */}
      <div className="mb-6">
        <textarea 
          rows={3} 
          placeholder="Add your comment..." 
          className="block w-full rounded-md border-medium-gray bg-gray-700/80 shadow-sm focus:border-neon-accent focus:ring-neon-accent sm:text-sm text-white placeholder-gray-400 px-3 py-2"
        ></textarea>
        <button className="mt-2 inline-flex justify-center rounded-md border border-transparent bg-neon-accent py-1.5 px-4 text-sm font-medium text-midnight-ink shadow-sm hover:bg-opacity-80 transition-colors">
           Post Comment
         </button>
      </div>
      {/* Placeholder for existing comments */}
      <div className="space-y-4">
         {[1, 2].map(i => (
           <div key={i} className="bg-gray-800/40 p-4 rounded-lg border border-medium-gray/20">
             <div className="flex items-center gap-2 mb-1">
               <div className="w-6 h-6 rounded-full bg-cosmic-blue/50"></div>
               <span className="text-sm font-medium text-light-gray">User{i}</span>
               <span className="text-xs text-medium-gray">- 2 hours ago</span>
             </div>
             <p className="text-sm text-light-gray/90">This is a placeholder comment text. Great work!</p>
           </div>
         ))}
         <p className="text-center text-medium-gray text-sm">[Load More Comments]</p>
      </div>
    </div>
  );
}

// Main Work Page Component
export default function WorkPage({ params }: { params: { workId: string } }) {
   // Fetch work data based on params.workId later
   const workData = {
     title: 'Example Work Title: The Long Journey',
     author: 'ExampleAuthor',
     authorSlug: 'ExampleAuthor',
     type: 'Fanfic', // To determine which content display to use
     fandom: 'Example Fandom',
     fandomSlug: 'example-fandom',
     publishedDate: 'July 15, 2024',
     tags: ['Adventure', 'Found Family', 'Slow Burn'],
     likes: 1337,
     comments: 89,
     bookmarks: 150,
     // Add work content itself later (e.g., chapters, image URL, video URL)
   };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top Section: Title and Author */}
      <div className="mb-6 md:mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-white mb-1">{workData.title}</h1>
        <Link href={`/user/${workData.authorSlug}`} className="text-lg text-light-gray hover:text-neon-accent transition-colors">
          by {workData.author}
        </Link>
      </div>

      {/* Main Layout: Content + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Main Content Area */}
        <main className="flex-grow min-w-0"> {/* min-w-0 needed for flex child overflow */}
          <WorkContentDisplay workType={workData.type} />
          <CommentsSection />
        </main>

        {/* Sidebar */}
        <WorkSidebar workData={workData} />
      </div>
    </div>
  );
} 