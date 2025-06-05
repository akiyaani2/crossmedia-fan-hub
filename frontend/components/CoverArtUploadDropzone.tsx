'use client';

import { useState } from 'react';
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadthing";
import type { ClientUploadedFileData } from "uploadthing/types";
import { toast } from 'sonner';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

// Type for the server response
type ServerResponse = {
  uploadedBy: string;
  fileUrl: string;
}

// Type for the client response
type ClientUploadResponse = ClientUploadedFileData<ServerResponse>[];

interface CoverArtUploadDropzoneProps {
  workId: string; // Required prop to identify the work
  onUploadComplete?: (url: string | null, error?: Error) => void;
  className?: string;
}

export function CoverArtUploadDropzone({ workId, onUploadComplete, className }: CoverArtUploadDropzoneProps) {
  const supabase = useSupabaseClient();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleClientUploadComplete = async (res?: ClientUploadResponse) => {
    if (res && res.length > 0 && workId) {
      const fileUrl = res[0].serverData?.fileUrl;
      if (!fileUrl) {
        toast.error("Upload succeeded but failed to get URL.");
        onUploadComplete?.(null, new Error("Failed to get URL from server response."));
        return;
      }

      console.log("Cover Art File URL:", fileUrl);
      setIsUpdating(true);
      toast.info("Updating cover art...");

      try {
        const { error } = await supabase
          .from('works') // Your works table name
          .update({ cover_art_url: fileUrl }) // Your cover art column name
          .eq('id', workId);

        if (error) throw error;

        toast.success("Cover art updated successfully!");
        onUploadComplete?.(fileUrl);
      } catch (error: any) {
        console.error("Error updating cover art:", error);
        toast.error(`Failed to update cover art: ${error.message}`);
        onUploadComplete?.(null, error);
      } finally {
        setIsUpdating(false);
      }
    } else if (res) {
      console.warn("Upload complete but no workId or file data.", { res, workId })
      onUploadComplete?.(null, new Error("Upload complete but no workId or file data."));
    }
  };

  return (
    <UploadDropzone<OurFileRouter, "coverArtUploader">
      endpoint="coverArtUploader"
      onClientUploadComplete={handleClientUploadComplete}
      onUploadError={(error: Error) => {
        toast.error(`Upload Failed: ${error.message}`);
        onUploadComplete?.(null, error);
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