import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PhilosophyPage } from "@/components/pages/PhilosophyPage";
import { Locale } from "@/app/i18n/settings";
import { Metadata } from "next";
import { getTranslations } from "@/app/i18n/server";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations(lang);
  return {
    title: t.philosophy.meta.title,
    description: t.philosophy.meta.description,
    keywords: t.philosophy.meta.keywords,
    authors: [{ name: t.philosophy.meta.authors }],
    creator: t.philosophy.meta.creator,
    metadataBase: new URL("https://hasanahmad.net"),
    openGraph: {
      type: "website",
      locale: lang === "ar" ? "ar_US" : "en_US",
      url: "https://hasanahmad.net",
      title: t.philosophy.meta.title,
      description: t.philosophy.meta.description,
      siteName: t.philosophy.meta.siteName,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
            alt: t.philosophy.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.philosophy.meta.title,
      description: t.philosophy.meta.description,
      images: ["/og-image.jpg"],
      creator: "@hasanahmad",
    },
  };
}
export default async function Philosophy({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  return (
    <>
      <Header />
      <main>
        <PhilosophyPage locale={lang} />
      </main>
      <Footer />
    </>
  );
} 