import { Metadata } from "next";
import ServicesContent from "@/components/ServicesContent";

export const metadata: Metadata = {
  title: "Our Services | Infiniton Tech",
  description:
    "Explore Infiniton Tech's services — Web & Mobile Engineering, AI & Next-Gen Tech, and Automation & Digital Transformation. End-to-end solutions for your business.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
