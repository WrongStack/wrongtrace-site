import renderOpengraphImage from "@/lib/opengraph-image";

// Render bundled fonts to PNG during export, not on a deployed Node server.
export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  return renderOpengraphImage();
}
