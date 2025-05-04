"use client";
import { useTranslations } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Locale } from "@/app/i18n/settings";
import Link from "next/link";
import { ThoughtMeta } from "@/lib/thoughts";

type ArticleProps = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  lang: Locale;
};

interface ThoughtsSectionProps {
  featuredThoughts: ThoughtMeta[];
  lang: Locale;
}

const Article = ({ id, slug, title, excerpt, date, lang }: ArticleProps) => {
  const { t } = useTranslations();
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(lang === 'ar' ? 'ar-SA' : undefined, options);
  };
  
  return (
    <Card className="shadow-md overflow-hidden h-full flex flex-col">
      <CardHeader className="p-4">
        <div className="text-sm text-muted-foreground">{formatDate(date)}</div>
        <h3 className="font-semibold text-xl">{title}</h3>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <p className="text-muted-foreground">{excerpt}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/${lang}/thoughts/${slug}`} className="w-full">
          <Button variant="outline" className="w-full group">
            {t("thoughts.readMore")}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1">
              <path strokeLinecap="square" strokeLinejoin="miter" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export function ThoughtsSection({ featuredThoughts, lang }: ThoughtsSectionProps) {
  const { t } = useTranslations();
  
  // Convert ThoughtMeta[] to ArticleProps[]
  const articles: ArticleProps[] = featuredThoughts.map(thought => ({
    id: thought.id,
    slug: thought.slug,
    title: thought.title,
    excerpt: thought.excerpt,
    date: thought.date,
    lang: lang
  }));

  return (
    <section id="thoughts" className="py-20">
      <div className="container px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("thoughts.title")}</h2>
          <p className="text-muted-foreground max-w-2xl">{t("thoughts.subtitle")}</p>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-6">{t("thoughts.featured")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Article 
                key={article.id}
                id={article.id}
                slug={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                lang={article.lang}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-10">
          <Link href={`/${lang}/thoughts`}>
            <Button className="group w-full" size="lg">
              {t("thoughts.viewAll")}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1">
                <path strokeLinecap="square" strokeLinejoin="miter" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 