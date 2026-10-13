import type { Metadata } from "next";
import StudioWorkspace from "@/components/StudioWorkspace";

export const metadata: Metadata = {
  title: "Scrolly Studio",
  description:
    "Split-screen studio: story timeline, live scroll-bound viewport and inspector for camera, easing, typography and 3D assets.",
};

export default function EditorPage() {
  return <StudioWorkspace />;
}
