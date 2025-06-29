import { Header } from "@/components/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ThoughtsSection } from "@/components/sections/ThoughtsSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";
import { Locale } from "@/app/i18n/settings";
import { getFeaturedThoughts } from "@/lib/thoughts";
import { Metadata } from "next";
import { getTranslations } from "@/app/i18n/server";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations(lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: t.meta.keywords,
    authors: [{ name: t.meta.authors }],
    creator: t.meta.creator,
    metadataBase: new URL("https://hasanahmad.net"),
    openGraph: {
      type: "website",
      locale: lang === "ar" ? "ar_US" : "en_US",
      url: "https://hasanahmad.net",
      title: t.meta.title,
      description: t.meta.description,
      siteName: t.meta.siteName,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/og-image.jpg"],
      creator: "@hasanahmad",
    },
  };
}

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const featuredThoughts = getFeaturedThoughts(lang);
  
  return (
    <>
      <Header />
      <main>
        <HeroSection locale={lang} />
        <AboutSection locale={lang} />
        <ThoughtsSection featuredThoughts={featuredThoughts} locale={lang} />
        <PhilosophySection locale={lang} />
        <ContactSection locale={lang} />
      </main>
      <Footer />
    </>
  );
}
