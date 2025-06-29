import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowRight, Tag, Calendar } from "lucide-react";
import { ThoughtMeta } from "@/lib/thoughts";
import { Locale } from "@/app/i18n/settings";
import Link from "next/link";
import { getTranslations } from "@/app/i18n/server";
import { ThoughtsFilter } from "./ThoughtsFilter";

interface ThoughtsPageProps {
  articles: ThoughtMeta[];
  featuredArticles: ThoughtMeta[];
  categories: string[];
  lang: Locale;
}

export async function ThoughtsPage({ articles, featuredArticles, categories, lang }: ThoughtsPageProps) {
  const t = await getTranslations(lang);
  
  // Format date to human-readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(lang === 'ar' ? 'ar-SA' : undefined, options);
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.thoughts?.title || 'Thoughts'}</h1>
            <div className="w-20 h-1 bg-primary mb-8"></div>
            <p className="text-muted-foreground text-lg">
              {t.thoughts?.subtitle || 'Latest thoughts and insights'}
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Articles */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 flex items-center">
            <span className="mr-4">{t.thoughts?.featured || 'Featured'}</span>
            <div className="h-0.5 bg-muted-foreground/20 flex-1"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden border-0 shadow-md h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground my-2">
                    <Tag className="h-3.5 w-3.5" />
                    <span className="capitalize">{article.category}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                    <Clock className="h-3.5 w-3.5" />
                    <span>{t.thoughts?.readTime?.replace('{time}', article.readTime.toString()) || 'Read time'}</span>
                  </div>
                  <Link href={`/${lang}/thoughts/${article.slug}`}>
                    <CardTitle className="text-xl line-clamp-2 hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                  </Link>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-4 border-t border-muted/10">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 mr-2" />
                    {formatDate(article.date)}
                  </div>
                  <Link href={`/${lang}/thoughts/${article.slug}`}>
                    <Button variant="ghost" size="sm" className="text-primary p-0 hover:bg-transparent hover:text-primary/80">
                      {t.thoughts?.readMore || 'Read More'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* All Articles with Category Filter - Client Component */}
      <ThoughtsFilter 
        articles={articles} 
        categories={categories} 
        lang={lang}
      />
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t.contact?.cta?.title || 'CTA title'}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              {t.contact?.cta?.description || 'CTA description'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-secondary text-primary hover:bg-secondary/90"
                size="lg"
              >
                {t.contact?.cta?.scheduleCall || 'Schedule Call'}
              </Button>
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10"
                size="lg"
              >
                {t.contact?.cta?.viewPortfolio || 'View Portfolio'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 