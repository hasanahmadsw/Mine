import { Button } from "@/components/ui/button";
import { getTranslations } from "@/app/i18n/server";
import { Locale } from "@/app/i18n/settings";
import Link from "next/link";

interface HeroSectionProps {
  locale: Locale;
}

export async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations(locale);
  
  return (
    <section className="relative min-h-[calc(90vh-100px)] flex items-center justify-center py-24 overflow-hidden">
      {/* Background gradient and animation container */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0">
        {/* Static background elements */}
        <div className="absolute inset-0">
          {/* Vertical grid lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-[1px] bg-primary opacity-10"
              style={{ left: `${(i + 1) * 8}%`, height: '100%' }}
            />
          ))}
          
          {/* Horizontal grid lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-[1px] bg-primary opacity-10"
              style={{ top: `${(i + 1) * 12.5}%`, width: '100%' }}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-12 pt-16">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-start">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight">
            <span className="block">{t.hero?.greeting || 'Hello'}</span>
            <span 
              className="text-primary"
              style={{ 
                backgroundImage: "linear-gradient(to right, rgba(var(--color-primary), 1), rgba(var(--color-primary), 1))",
                backgroundPosition: "0 100%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 3px"
              }}
            >
              {t.hero?.name || 'Your Name'}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto lg:mx-0">
            {t.hero?.title || 'Your Title'}
          </p>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
            {t.hero?.description || 'Your Description'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="#about">
              <Button size="lg" className="px-12 py-6">
                {t.hero?.aboutButton || 'About Me'}
              </Button>
            </Link>
            <Link href="#contact">
              <Button size="lg" variant="outline" className="px-12 py-6">
                {t.hero?.connectButton || 'Connect'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 