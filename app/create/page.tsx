import type { Metadata } from "next";
import StudioWorkspace from "@/components/StudioWorkspace";

export const metadata: Metadata = {
  title: "Create a Scrolly Story",
  description:
    "Compose pinned scenes, scroll-triggered charts and 3D layers in the Scrolly Studio workspace.",
};

export default function CreatePage() {
  return <StudioWorkspace />;
}
