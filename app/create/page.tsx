'use client'; // Required for hooks and state

import React, { useState } from 'react';
import Image from 'next/image';
// Example icons for content types
import { FileText, Image as ImageIcon, Video, Mic } from 'lucide-react';
import { CoverArtUploadDropzone } from '@/components/CoverArtUploadDropzone'; // Import the component
import { toast } from 'sonner';

// Placeholder component for the form/editor area
const CreationForm = () => {
  const [coverArtUrl, setCoverArtUrl] = useState<string | null>(null);
  // You'll need state to hold the ID of the work *after* it's initially created
  // or pass it down if this form is also used for editing.
  // For creation, you might create the work record first, get the ID, then allow upload.
  const [workId, setWorkId] = useState<string | null>(null); // Placeholder

  // Example: Simulate getting work ID after some initial save
  const handleInitialSave = () => {
    // TODO: Implement actual save logic for initial work data (title, type etc.)
    // On success, get the new work ID from Supabase response
    const newWorkId = `work_${Date.now()}`; // Replace with real ID
    setWorkId(newWorkId);
    toast.info("Initial work data saved. You can now upload cover art.");
  };

  const handleCoverArtUpload = (url: string | null, error?: Error) => {
    if (url) {
      setCoverArtUrl(url);
      // No need to save here, the component handles it using workId
    } else if (error) {
      console.error("Cover art upload failed in parent:", error);
    }
  };

  return (
    <form className="space-y-6">
      {/* Content Type Selector (Example) */}
      <div>
        <label className="block text-lg font-medium text-neon-accent mb-2">Select Content Type</label>
        <div className="flex flex-wrap gap-3">
          {[ { name: 'Fanfic', icon: FileText },
             { name: 'Image/Art', icon: ImageIcon },
             { name: 'Video', icon: Video },
             { name: 'Podfic/Audio', icon: Mic },
          ].map(type => {
            const TypeIcon = type.icon;
            return (
              <button 
                key={type.name}
                type="button" 
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-medium-gray/70 bg-gray-800/50 text-light-gray hover:bg-cosmic-blue/50 hover:border-cosmic-blue hover:text-white transition-colors"
              >
                 <TypeIcon className="w-4 h-4" />
                 {type.name}
               </button>
            );
          })}
        </div>
      </div>

      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-light-gray mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="block w-full rounded-md border-medium-gray bg-gray-700/80 shadow-sm focus:border-neon-accent focus:ring-neon-accent sm:text-sm text-white placeholder-gray-400 px-3 py-2"
          placeholder="Enter the title of your work"
        />
      </div>

      {/* Cover Art Upload Section */}
      <div>
        <label className="block text-sm font-medium text-light-gray mb-1">
          Cover Art (Optional)
        </label>
        {coverArtUrl && (
          <div className="mb-2">
            <Image
              src={coverArtUrl}
              alt="Current Cover Art"
              width={200} // Adjust size as needed
              height={112} // Maintain aspect ratio (e.g., 16:9)
              className="rounded object-cover border border-medium-gray"
            />
          </div>
        )}
        {/* Only show dropzone if workId exists (or handle differently) */}
        {workId ? (
          <CoverArtUploadDropzone
            workId={workId}
            onUploadComplete={handleCoverArtUpload}
          />
        ) : (
          <div className="p-4 rounded-md border border-dashed border-medium-gray bg-gray-800/30 text-center text-medium-gray">
            Save initial work details first to enable cover art upload.
            <button type="button" onClick={handleInitialSave} className="ml-2 text-neon-accent hover:underline text-sm">Save Draft</button>
          </div>
        )}
      </div>

      {/* Editor/Uploader Placeholder */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-light-gray mb-1">
          Content
        </label>
        <div className="min-h-[300px] p-4 rounded-md border border-dashed border-medium-gray bg-gray-800/30 flex items-center justify-center text-medium-gray">
          [Rich Text Editor / Media Uploader Area Placeholder]
        </div>
      </div>
      
      {/* Tags/Fandom Input (Example) */}
      <div>
         <label htmlFor="tags" className="block text-sm font-medium text-light-gray mb-1">
           Tags / Fandoms
         </label>
         <input
           type="text"
           id="tags"
           name="tags"
           className="block w-full rounded-md border-medium-gray bg-gray-700/80 shadow-sm focus:border-neon-accent focus:ring-neon-accent sm:text-sm text-white placeholder-gray-400 px-3 py-2"
           placeholder="Add tags like 'Fluff', 'Angst', 'Star Wars', 'MCU'..."
         />
         {/* Could use a more advanced tag input component later */}
       </div>

      {/* Submit Button */}
      <div className="pt-4 text-right">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-neon-accent py-2 px-6 text-sm font-medium text-midnight-ink shadow-sm hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-neon-accent focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
        >
          Publish Work
        </button>
      </div>
    </form>
  );
};

// Main Create Page Component
export default function CreatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold font-headline text-cosmic-blue mb-4">Create New Work</h1>
      <p className="text-lg text-light-gray mb-8">Share your story, art, or creation with the multiverse.</p>
      
      {/* Main creation area with themed background/border */}
      <div className="mt-8 p-6 md:p-8 bg-gray-800/40 border border-medium-gray/30 rounded-lg shadow-lg">
         <CreationForm />
      </div>
    </div>
  );
} 