import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "@/lib/uploadthing"; // Adjust path if needed

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
}); 