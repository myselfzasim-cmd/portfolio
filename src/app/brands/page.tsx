import { Metadata } from "next";
import { getBrands } from "@/lib/data";
import BrandsClient from "@/components/BrandsClient";

export const metadata: Metadata = {
  title: "Commercial Packaging Brands & Clients Showcase | Zasim Uddin (ThirstyPoet)",
  description:
    "Explore 350+ commercial packaging brands, dieline engineering archives, rotogravure printing cylinders, and consumer FMCG packaging designed for PRAN-RFL Group and international clients.",
};

export const dynamic = "force-dynamic";

export default async function BrandsPage() {
  const brands = await getBrands();
  return <BrandsClient initialBrands={brands} />;
}
