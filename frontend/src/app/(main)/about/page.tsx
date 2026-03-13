import { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About Us | Infiniton Tech",
  description:
    "Learn about Infiniton Tech — a premier software development and digital solutions firm based in Bangladesh, serving global clients with elite developers, designers, and AI specialists.",
};

export default function AboutPage() {
  return <AboutContent />;
}
