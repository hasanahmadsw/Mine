import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThoughtsPage } from "@/components/pages/ThoughtsPage";
import { getSortedThoughtsData, getFeaturedThoughts, getAllThoughtCategories } from "@/lib/thoughts";
import { Locale } from "@/app/i18n/settings";
import { Metadata } from "next";
import { getTranslations } from "@/app/i18n/server";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const t = await getTranslations(lang);
    return {
      title: t.thoughts.meta.title,
      description: t.thoughts.meta.description,
      keywords: t.thoughts.meta.keywords,
      authors: [{ name: t.thoughts.meta.authors }],
      creator: t.thoughts.meta.creator,
      metadataBase: new URL("https://hasanahmad.net"),
      openGraph: {
        type: "website",
        locale: lang === "ar" ? "ar_US" : "en_US",
        url: "https://hasanahmad.net",
        title: t.thoughts.meta.title,
        description: t.thoughts.meta.description,
        siteName: t.thoughts.meta.siteName,
        images: [
          {
            url: "/og-image.jpg",
            width: 1200,
            height: 630,
            alt: t.thoughts.meta.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: t.thoughts.meta.title,
        description: t.thoughts.meta.description,
        images: ["/og-image.jpg"],
        creator: "@hasanahmad",
      },
    };
}

export default async function Thoughts({ params}: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  // Get data directly during build time
  const articles = getSortedThoughtsData(lang);
  const featured = getFeaturedThoughts(lang);
  const categories = ["all", ...getAllThoughtCategories(lang)];

  return (
    <>
      <Header />
      <main>
        <ThoughtsPage 
          articles={articles} 
          featuredArticles={featured} 
          categories={categories}
          lang={lang}
        />
      </main>
      <Footer />
    </>
  );
} 