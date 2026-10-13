import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollTracker from "@/components/ScrollTracker";
import ShowcaseGallery from "@/components/ShowcaseGallery";
import CTABand from "@/components/CTABand";
import { SectionHeading } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Templates & Showcase Gallery",
  description:
    "Browse scrollytelling templates by category — journalism, corporate, product, data viz and education. Remix any template straight into the Studio.",
};

export default function ShowcasePage() {
  return (
    <>
      <ScrollTracker />
      <Navbar />

      <main className="relative pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem]">
          <div className="absolute left-1/2 top-0 h-[30rem] w-[52rem] -translate-x-1/2 rounded-full bg-indigo-glow/12 blur-[140px]" />
          <div className="absolute inset-0 bg-grid opacity-25" />
        </div>

        <div className="mx-auto max-w-[1400px] px-6 pb-16 md:px-8">
          <SectionHeading
            eyebrow="Templates & showcase"
            title={
              <>
                Pick a story format,
                <br className="hidden sm:block" /> <span className="text-gradient">remix it in one tap.</span>
              </>
            }
            body="Every card is a working scrollytelling template. Hover to preview its scroll behaviour, then clone it directly into your Studio workspace."
          />
        </div>

        <ShowcaseGallery />
        <CTABand
          eyebrow="Can't find the right format?"
          title="Build one from a blank timeline."
          body="Open the Studio and compose your own pinned scenes, charts and 3D layers from scratch."
        />
      </main>

      <Footer />
    </>
  );
}
