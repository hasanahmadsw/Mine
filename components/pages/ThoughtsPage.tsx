"use client";

import { useTranslations } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowRight, Tag, Calendar } from "lucide-react";
import { useState } from "react";
import { ThoughtMeta } from "@/lib/thoughts";
import { Locale } from "@/app/i18n/settings";
import Link from "next/link";

interface ThoughtsPageProps {
  articles: ThoughtMeta[];
  featuredArticles: ThoughtMeta[];
  categories: string[];
  lang: Locale;
}

export function ThoughtsPage({ articles, featuredArticles, categories, lang }: ThoughtsPageProps) {
  const { t } = useTranslations();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Filter articles based on active category
  const filteredArticles = activeCategory === "all" 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('thoughts.title')}</h1>
            <div className="w-20 h-1 bg-primary mb-8"></div>
            <p className="text-muted-foreground text-lg">
              {t('thoughts.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Articles */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 flex items-center">
            <span className="mr-4">{t('thoughts.featured')}</span>
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
                    <span>{t('thoughts.readTime').replace('{time}', article.readTime.toString())}</span>
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
                      {t('thoughts.readMore')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* All Articles with Category Filter */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <h2 className="text-3xl font-bold mb-6 md:mb-0">{t('thoughts.allArticles')}</h2>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {t(`thoughts.categories.${category}`)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden border-0 shadow-md h-full flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground my-2">
                    <Tag className="h-3.5 w-3.5" />
                    <span className="capitalize">{article.category}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                    <Clock className="h-3.5 w-3.5" />
                    <span>{t('thoughts.readTime').replace('{time}', article.readTime.toString())}</span>
                  </div>
                  <Link href={`/${lang}/thoughts/${article.slug}`}>
                    <CardTitle className="text-lg line-clamp-2 hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                  </Link>
                </CardHeader>
                <CardContent className="pb-3 pt-0 flex-1">
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-3 border-t border-muted/10">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(article.date)}
                  </div>
                  <Link href={`/${lang}/thoughts/${article.slug}`}>
                    <Button variant="ghost" size="sm" className="text-primary p-0 text-sm hover:bg-transparent hover:text-primary/80">
                      {t('thoughts.readMore')}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{t('thoughts.newsletter.title')}</h2>
            <p className="text-muted-foreground mb-8">
              {t('thoughts.newsletter.description')}
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('thoughts.newsletter.placeholder')}
                className="flex-1 px-4 py-3 rounded-lg border border-muted focus:border-primary focus:outline-none"
              />
              <Button className="bg-primary text-white">
                {t('thoughts.newsletter.button')}
              </Button>
            </form>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('contact.cta.title')}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              {t('contact.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-secondary text-primary hover:bg-secondary/90"
                size="lg"
              >
                {t('contact.cta.scheduleCall')}
              </Button>
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10"
                size="lg"
              >
                {t('contact.cta.viewPortfolio')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 