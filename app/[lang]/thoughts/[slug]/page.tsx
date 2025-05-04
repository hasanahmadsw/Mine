import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThoughtDetail } from "@/components/pages/ThoughtDetail";
import { getSortedThoughtsData, getThoughtBySlug, getRelatedThoughts, getAdjacentThoughts } from "@/lib/thoughts";
import { Locale } from "@/app/i18n/settings";
import { notFound } from "next/navigation";
import { getTranslations } from "@/app/i18n/server";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const t = await getTranslations(lang);
    const thought = await getThoughtBySlug(slug, lang);
    return {
      title: `${thought?.title} | ${t.thoughts.meta.title}`,
      description: thought?.excerpt,
      keywords: t.thoughts.meta.keywords,
      authors: [{ name: t.thoughts.meta.authors }],
      creator: t.thoughts.meta.creator,
      metadataBase: new URL("https://hasanahmad.net"),
      openGraph: {
        type: "article",
        locale: lang === "ar" ? "ar_US" : "en_US",
        url: "https://hasanahmad.net",
        title: `${thought?.title} | ${t.thoughts.meta.title}`,
        description: thought?.excerpt,
        siteName: t.thoughts.meta.siteName,
        images: [
          {
            url: "/og-image.jpg",
            width: 1200,
            height: 630,
              alt: `${thought?.title} | ${t.thoughts.meta.title}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${thought?.title} | ${t.thoughts.meta.title}`,
        description: thought?.excerpt,
        images: ["/og-image.jpg"],
        creator: "@hasanahmad",
      },
    };
  }

// Create a list of paths at build time
export async function generateStaticParams({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const thoughts = getSortedThoughtsData(lang);
  return thoughts.map((thought) => ({
    slug: thought.slug,
  }));
}

export default async function ThoughtPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const thought = await getThoughtBySlug(slug, lang);

  // If thought is not found, return 404
  if (!thought) {
    notFound();
  }

  // Get related thoughts
  const relatedThoughts = getRelatedThoughts(slug, thought.category, lang);
  
  // Get next and previous thoughts
  const { previous, next } = getAdjacentThoughts(slug, lang);

  return (
    <>
      <Header />
      <main>
        <ThoughtDetail 
          thought={thought} 
          lang={lang} 
          relatedThoughts={relatedThoughts}
          previousThought={previous}
          nextThought={next}
        />
      </main>
      <Footer />
    </>
  );
} 