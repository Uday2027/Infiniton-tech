import { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Infiniton Tech",
  description:
    "Get in touch with Infiniton Tech. Ready to digitize your vision? Let's discuss your next project — web, mobile, AI, or automation.",
};

export default function ContactPage() {
  return <ContactContent />;
}
