import { Metadata } from "next";
import ConsultationForm from "@/components/ConsultationForm";

export const metadata: Metadata = {
  title: "Start a Project | Infiniton Tech",
  description:
    "Tell us about your project. Whether it's a web app, mobile app, automation, or AI agents — we'll help you bring your vision to life.",
};

export default function ConsultationPage() {
  return <ConsultationForm />;
}
