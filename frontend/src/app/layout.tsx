import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Infiniton Tech | Innovating the Infinite. Automating the Future.",
  description:
    "Infiniton Tech is a premier software development and digital solutions firm. We build digital ecosystems with AI, automation, and cutting-edge web & mobile engineering.",
  keywords: [
    "software development",
    "AI agents",
    "web development",
    "mobile app development",
    "automation",
    "LLM integration",
    "SaaS development",
    "Bangladesh",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Preloader />
          <ScrollProgress />
          <div className="noise-overlay" aria-hidden="true" />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
