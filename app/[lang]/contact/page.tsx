import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactPage } from "@/components/pages/ContactPage";
import { getTranslations } from "@/app/i18n/server";
import { Metadata } from "next";
import { Locale } from "@/app/i18n/settings";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations(lang);
  return {
    title: t.contact.meta.title,
    description: t.contact.meta.description,
    keywords: t.contact.meta.keywords,
    authors: [{ name: t.contact.meta.authors }],
    creator: t.contact.meta.creator,
    metadataBase: new URL("https://hasanahmad.net"),
    openGraph: {
      type: "website",
      locale: lang === "ar" ? "ar_US" : "en_US",
      url: "https://hasanahmad.net",
      title: t.contact.meta.title,
      description: t.contact.meta.description,
      siteName: t.contact.meta.siteName,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
            alt: t.contact.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.contact.meta.title,
      description: t.contact.meta.description,
      images: ["/og-image.jpg"],
      creator: "@hasanahmad",
    },
  };
}


export default function Contact() {
  return (
    <>
      <Header />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  );
} 