import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AboutPage } from "@/components/pages/AboutPage";
import { Metadata } from "next";
import { Locale } from "@/app/i18n/settings";
import { getTranslations } from "@/app/i18n/server";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const t = await getTranslations(lang);
    return {
      title: t.about.meta.title,
      description: t.about.meta.description,
      keywords: t.about.meta.keywords,
      authors: [{ name: t.about.meta.authors }],
      creator: t.about.meta.creator,
      metadataBase: new URL("https://hasanahmad.com"),
      openGraph: {
        type: "website",
        locale: lang === "ar" ? "ar_US" : "en_US",
        url: "https://hasanahmad.net",
        title: t.about.meta.title,
        description: t.about.meta.description,
        siteName: t.about.meta.siteName,
        images: [
          {
            url: "/og-image.jpg",
            width: 1200,
            height: 630,
              alt: t.about.meta.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: t.about.meta.title,
        description: t.about.meta.description,
        images: ["/og-image.jpg"],
        creator: "@hasanahmad",
      },
    };
  } 
export default function About() {
  return (
    <>
      <Header />
      <main>
        <AboutPage />
      </main>
      <Footer />
    </>
  );
} 