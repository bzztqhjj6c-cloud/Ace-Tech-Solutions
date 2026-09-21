export { metadata, viewport } from "next-sanity/studio";
import { UnderConstruction } from "@/components/UnderConstruction";

export const dynamic = "force-static";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  if (process.env.UNDER_CONSTRUCTION === "true") {
    return (
      <html lang="nl">
        <body>
          <UnderConstruction />
        </body>
      </html>
    );
  }

  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
