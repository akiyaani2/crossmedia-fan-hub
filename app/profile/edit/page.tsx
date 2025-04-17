'use client'; // Need this for hooks and state

import { useState } from 'react';
import Image from 'next/image'; // To display current avatar
import { AvatarUploadDropzone } from '@/components/AvatarUploadDropzone'; // Import the component
import { useUser } from '@supabase/auth-helpers-react'; // To get user info
import { toast } from 'sonner';

export default function EditProfilePage() {
  const user = useUser();
  // You would typically fetch the full profile data here, including existing avatar_url
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(null /* Fetch initial URL */);

  const handleAvatarUpload = (url: string | null, error?: Error) => {
    if (url) {
      setCurrentAvatarUrl(url);
      // Optionally trigger a re-fetch of profile data or update local state
    } else if (error) {
      // Error is already handled by toast in the component, but you could add more logic here
      console.error("Avatar upload failed in parent:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-cosmic-blue mb-6">Edit Your Profile</h1>
      <p className="text-neon-accent mb-8">Update your avatar, bio, and other settings.</p>
      {/* Placeholder for profile editing form */}
      <form className="space-y-6 p-6 bg-gray-800/50 border border-gray-700 rounded-lg">

        {/* Avatar Section */}
        <div>
          <label className="block text-sm font-medium text-purple-300 mb-2">
            Avatar
          </label>
          <div className="flex items-center gap-4">
            {currentAvatarUrl ? (
              <Image
                src={currentAvatarUrl}
                alt="Current Avatar"
                width={80}
                height={80}
                className="rounded-full object-cover border-2 border-neon-accent"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-gray-400 text-xs border-2 border-gray-500">
                No Avatar
              </div>
            )}
            <AvatarUploadDropzone
              onUploadComplete={handleAvatarUpload}
              className="flex-grow"
            />
          </div>
        </div>

        {/* Example field: Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-purple-300 mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-neon-accent focus:ring-neon-accent sm:text-sm text-white placeholder-gray-400"
            placeholder="Tell the multiverse about yourself..."
          ></textarea>
        </div>

        {/* Placeholder for other fields like username, display name etc. */}
        <div className="text-gray-400">[Other Profile Fields Placeholder]</div>

        {/* Placeholder Save Button */}
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-cosmic-blue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-neon-accent focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
} 