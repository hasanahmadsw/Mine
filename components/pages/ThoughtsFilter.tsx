"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowRight, Tag, Calendar } from "lucide-react";
import { ThoughtMeta } from "@/lib/thoughts";
import { Locale } from "@/app/i18n/settings";
import Link from "next/link";
import { useTranslations } from "@/app/i18n/client";

interface ThoughtsFilterProps {
  articles: ThoughtMeta[];
  categories: string[];
  lang: Locale;
}

export function ThoughtsFilter({ articles, categories, lang }: ThoughtsFilterProps) {
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
    <section className="py-12 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <h2 className="text-3xl font-bold mb-6 md:mb-0">{t("thoughts.allArticles") || 'All Articles'}</h2>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {t("thoughts.categories.all") || 'All'}
            </button>
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
                {t(`thoughts.categories.${category}`) || category}
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
                  <span>{t("thoughts.readTime").replace('{time}', article.readTime.toString()) || 'Read time'}</span>
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
                    {t("thoughts.readMore") || 'Read More'}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 