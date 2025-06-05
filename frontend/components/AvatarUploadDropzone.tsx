'use client';

import { useState } from 'react';
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadthing";
import type { ClientUploadedFileData } from "uploadthing/types";
import { toast } from 'sonner';
// Assuming you use these hooks for Supabase client/user
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'; 

// Type for the server response we defined in the FileRouter
type ServerResponse = {
  uploadedBy: string;
  fileUrl: string;
}

// Type for the argument passed to onClientUploadComplete
type ClientUploadResponse = ClientUploadedFileData<ServerResponse>[];

interface AvatarUploadDropzoneProps {
  // Optional: Callback after Supabase update is attempted
  onUploadComplete?: (url: string | null, error?: Error) => void;
  className?: string;
}

export function AvatarUploadDropzone({ onUploadComplete, className }: AvatarUploadDropzoneProps) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleClientUploadComplete = async (res?: ClientUploadResponse) => {
    if (res && res.length > 0 && user) {
      const fileUrl = res[0].serverData?.fileUrl;
      if (!fileUrl) {
        toast.error("Upload succeeded but failed to get URL.");
        onUploadComplete?.(null, new Error("Failed to get URL from server response."));
        return;
      }

      console.log("Avatar File URL:", fileUrl);
      setIsUpdating(true);
      toast.info("Updating profile...");

      try {
        const { error } = await supabase
          .from('profiles') // Your profiles table name
          .update({ avatar_url: fileUrl }) // Your avatar column name
          .eq('id', user.id);

        if (error) throw error;

        toast.success("Avatar updated successfully!");
        onUploadComplete?.(fileUrl); // Pass URL on success
      } catch (error: any) {
        console.error("Error updating profile:", error);
        toast.error(`Failed to update profile: ${error.message}`);
        onUploadComplete?.(null, error); // Pass error
      } finally {
        setIsUpdating(false);
      }
    } else if (res) {
       // Handle case where upload finished but no user or no file data
       console.warn("Upload complete but no user or file data.", { res, user })
       onUploadComplete?.(null, new Error("Upload complete but no user or file data."));
    }
  };

  return (
    <UploadDropzone<OurFileRouter, "avatarUploader">
      endpoint="avatarUploader"
      onClientUploadComplete={handleClientUploadComplete}
      onUploadError={(error: Error) => {
        toast.error(`Upload Failed: ${error.message}`);
        onUploadComplete?.(null, error); // Pass error
      }}
      config={{
        mode: "auto",
      }}
      appearance={{
        container: `mt-4 border-2 border-dashed border-medium-gray/50 rounded-md p-4 text-center hover:border-neon-accent transition-colors ${className} ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`,
        uploadIcon: "text-gray-400 w-12 h-12 mx-auto",
        label: "text-light-gray text-base",
        allowedContent: "text-medium-gray text-sm",
        button: `ut-readying:bg-gray-500 ut-uploading:bg-orange-500 bg-cosmic-blue text-white text-sm rounded-md px-3 py-1.5 hover:bg-cosmic-blue/80 transition-colors ${isUpdating ? 'pointer-events-none' : ''}`,
      }}
      className="w-full ut-button:ut-readying:bg-none ut-button:ut-uploading:after:bg-orange-400 ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300"
    />
  );
} 