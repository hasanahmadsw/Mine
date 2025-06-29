"use client";

import { useTranslations } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, ChevronLeft, Share2, Tag, ArrowLeft, ArrowRight, Twitter, Facebook, Linkedin, Link as LinkIcon } from "lucide-react";
import { Thought, ThoughtMeta } from "@/lib/thoughts";
import { Locale } from "@/app/i18n/settings";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useState } from "react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

// Custom components for markdown rendering
const MarkdownComponents = {
    // Headers
    h1: (props: any) => <h1 className="text-3xl font-bold  mt-8 mb-4" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
    
    // Paragraphs and text
    p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
    strong: (props: any) => <strong className="font-bold " {...props} />,
    em: (props: any) => <em className="italic " {...props} />,
    
    // Lists
    ul: (props: any) => <ul className="list-disc list-inside mb-4 " {...props} />,
    ol: (props: any) => <ol className="list-decimal list-inside mb-4 " {...props} />,
    li: (props: any) => <li className="mb-2" {...props} />,
    
    // Links and images
    a: (props: any) => (
      <a
        {...props}
        className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
        target={props.href.startsWith('http') ? '_blank' : undefined}
        rel={props.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      />
    ),
    img: (props: any) => (
      <img
        {...props}
        className="rounded-lg shadow-lg my-8 w-full"
        loading="lazy"
      />
    ),
    
    // Code blocks
    code: (props: any) => {
      const { className } = props
      const language = className ? className.replace('language-', '') : ''
      return (
        <div className="my-6 rounded-lg overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 text-sm text-gray-400">{language}</div>
          <pre className="p-4 bg-gray-900 overflow-x-auto">
            <code {...props} className={`${className} text-sm`} />
          </pre>
        </div>
      )
    },
    
    // Blockquotes
    blockquote: (props: any) => (
      <blockquote
        {...props}
        className="border-l-4 border-blue-500 pl-4 my-6 italic text-muted-foreground"
      />
    ),
    
    // Tables
    table: (props: any) => (
      <div className="overflow-x-auto my-8">
        <table {...props} className="min-w-full divide-y divide-gray-700" />
      </div>
    ),
    thead: (props: any) => <thead className="bg-gray-800" {...props} />,
    th: (props: any) => (
      <th
        {...props}
        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider" 
      />
    ),
    td: (props: any) => <td className="px-6 py-4 " {...props} />,
    tr: (props: any) => <tr className="border-b border-gray-700" {...props} />,
  };


interface ThoughtDetailProps {
  thought: Thought;
  lang: Locale;
  relatedThoughts?: ThoughtMeta[];
  previousThought?: ThoughtMeta | null;
  nextThought?: ThoughtMeta | null;
}

export function ThoughtDetail({ 
  thought, 
  lang, 
  relatedThoughts = [], 
  previousThought = null, 
  nextThought = null 
}: ThoughtDetailProps) {
  const { t } = useTranslations();
  const [copied, setCopied] = useState(false);

  // Format date to human-readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(lang === 'ar' ? 'ar-SA' : undefined, options);
  };

  // Get current URL for sharing
  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  // Share functions
  const shareHandlers = {
    twitter: () => {
      const url = encodeURIComponent(getShareUrl());
      const text = encodeURIComponent(thought.title);
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    },
    facebook: () => {
      const url = encodeURIComponent(getShareUrl());
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    },
    linkedin: () => {
      const url = encodeURIComponent(getShareUrl());
      const title = encodeURIComponent(thought.title);
      const summary = encodeURIComponent(thought.excerpt);
      window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`, '_blank');
    },
    copyLink: () => {
      navigator.clipboard.writeText(getShareUrl())
        .then(() => {
          setCopied(true);
          toast.success(t('thoughts.linkCopied'));
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          toast.error(t('thoughts.copyFailed'));
          console.error('Could not copy text: ', err);
        });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl">
            <Link 
              href={`/${lang}/thoughts`}
              className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              {t('thoughts.backToArticles')}
            </Link>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{thought.title}</h1>
            
            <div className="flex flex-wrap items-center text-muted-foreground mb-8 gap-x-6 gap-y-2">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" /> 
                {formatDate(thought.date)}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" /> 
                {t('thoughts.readTime').replace('{time}', thought.readTime.toString())}
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2" /> 
                {t(`thoughts.categories.${thought.category}`)}
              </div>
              <div className="flex items-center">
                {thought.author}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Article Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="md:col-span-12 lg:col-span-12">
              <article >
                 <ReactMarkdown
                   remarkPlugins={[remarkGfm]}
                   rehypePlugins={[rehypeRaw]}
                   components={MarkdownComponents}
                  >
              {thought.content}
            </ReactMarkdown>
              </article>
              
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center justify-between">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="inline-flex items-center gap-2"
                      >
                        <Share2 className="h-4 w-4" />
                        {t('thoughts.share')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2" align="start">
                      <div className="flex flex-col gap-1 text-sm">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center justify-start gap-2" 
                          onClick={shareHandlers.twitter}
                        >
                          <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                          Twitter
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center justify-start gap-2" 
                          onClick={shareHandlers.facebook}
                        >
                          <Facebook className="h-4 w-4 text-[#4267B2]" />
                          Facebook
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center justify-start gap-2" 
                          onClick={shareHandlers.linkedin}
                        >
                          <Linkedin className="h-4 w-4 text-[#0077B5]" />
                          LinkedIn
                        </Button>
                        <hr className="my-1" />
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center justify-start gap-2" 
                          onClick={shareHandlers.copyLink}
                        >
                          <LinkIcon className="h-4 w-4" />
                          {copied ? t('thoughts.copied') : t('thoughts.copyLink')}
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  
                  <Link href={`/${lang}/thoughts`}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {t('thoughts.backToArticles')}
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Navigation between articles */}
              {(previousThought || nextThought) && (
                <div className="mt-12 border-t pt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {previousThought ? (
                    <Link href={`/${lang}/thoughts/${previousThought.slug}`} className="group">
                      <div className="flex flex-col p-4 border rounded-lg hover:border-primary transition-colors">
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <ArrowLeft className="h-3.5 w-3.5 mr-2 group-hover:text-primary transition-colors" />
                          {t('thoughts.previousArticle')}
                        </div>
                        <h4 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">{previousThought.title}</h4>
                      </div>
                    </Link>
                  ) : <div />}
                  
                  {nextThought && (
                    <Link href={`/${lang}/thoughts/${nextThought.slug}`} className="group md:ml-auto">
                      <div className="flex flex-col p-4 border rounded-lg hover:border-primary transition-colors">
                        <div className="flex items-center justify-end text-sm text-muted-foreground mb-2">
                          {t('thoughts.nextArticle')}
                          <ArrowRight className="h-3.5 w-3.5 ml-2 group-hover:text-primary transition-colors" />
                        </div>
                        <h4 className="font-semibold text-end line-clamp-2 group-hover:text-primary transition-colors">{nextThought.title}</h4>
                      </div>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Articles Section */}
      {relatedThoughts.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8">{t('thoughts.relatedArticles')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedThoughts.map((article) => (
                <Link href={`/${lang}/thoughts/${article.slug}`} key={article.id}>
                  <div className="bg-card rounded-lg overflow-hidden shadow-md h-full flex flex-col group">
                    <div className="relative h-48 bg-muted/10">
                      {/* This would be an actual image in production */}
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                        <span className="text-lg font-medium text-muted-foreground">{article.title.substring(0, 1)}</span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <Tag className="h-3 w-3 mr-1" />
                        <span>{t(`thoughts.categories.${article.category}`)}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{t('thoughts.readTime').replace('{time}', article.readTime.toString())}</span>
                      </div>
                      <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">{article.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{article.excerpt}</p>
                      <div className="mt-auto text-xs text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(article.date)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
} 