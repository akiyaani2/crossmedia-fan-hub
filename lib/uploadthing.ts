import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { createServerClient, type CookieOptions, parse, serialize } from '@supabase/ssr';
import { cookies } from 'next/headers';

const f = createUploadthing();

// Function to get Supabase user from server context
async function getUser() {
  // Await the cookies() promise
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Adjust cookie handling for ssr package
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle potential errors if needed
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle potential errors if needed
          }
        },
      },
    }
  );
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (e) {
    console.error("Error getting user in UploadThing middleware:", e);
    return null;
  }
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique name
  avatarUploader: f({ image: { maxFileSize: "2MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await getUser();

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized - Not logged in");

      // Whatever is returned here is accessible in onUploadComplete as \`metadata\`
      return { userId: user.id }; // Pass Supabase user ID
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside \`onClientUploadComplete\` callback
      // We don't strictly NEED to return the userId here anymore as client can get it,
      // but returning it doesn't hurt.
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),

  coverArtUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await getUser();
      if (!user) throw new UploadThingError("Unauthorized - Not logged in");
      return { userId: user.id }; // Pass Supabase user ID
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Cover art upload complete for userId:", metadata.userId);
      console.log("Cover art file url", file.url);
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter; 