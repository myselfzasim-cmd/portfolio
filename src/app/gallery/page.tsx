import { Metadata } from "next";
import { getGalleryItems } from "@/lib/data";
import GalleryClient from "@/components/GalleryClient";

export const metadata: Metadata = {
  title: "Photo Gallery · Commercial Work In-Action & Press Archives | ThirstyPoet",
  description:
    "Explore 8+ years of high-speed rotogravure bottling press runs, cylinder proofing, 3D render studios, and packaging supermarket shelf audits by Zasim Uddin.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const items = await getGalleryItems();
  return <GalleryClient initialItems={items} />;
}