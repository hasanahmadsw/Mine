import { getTranslations } from "@/app/i18n/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Locale } from "@/app/i18n/settings";

interface PhilosophySectionProps {
  locale: Locale;
}

export async function PhilosophySection({ locale }: PhilosophySectionProps) {
  const t = await getTranslations(locale);
  
  return (
    <section id="philosophy" className="py-20">
      <div className="container px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">{t.philosophy?.title || 'Philosophy'}</h2>
          <p className="text-muted-foreground max-w-2xl">{t.philosophy?.subtitle || 'My core principles and beliefs'}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-md overflow-hidden h-full">
            <CardHeader className="border-b p-6">
              <h3 className="font-semibold text-xl">{t.philosophy?.principles?.innovation?.title || 'Innovation'}</h3>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-muted-foreground">{t.philosophy?.principles?.innovation?.description || 'Innovation description'}</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md overflow-hidden h-full">
            <CardHeader className="border-b p-6">
              <h3 className="font-semibold text-xl">{t.philosophy?.principles?.leadership?.title || 'Leadership'}</h3>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-muted-foreground">{t.philosophy?.principles?.leadership?.description || 'Leadership description'}</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md overflow-hidden h-full">
            <CardHeader className="border-b p-6">
              <h3 className="font-semibold text-xl">{t.philosophy?.principles?.growth?.title || 'Growth'}</h3>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-muted-foreground">{t.philosophy?.principles?.growth?.description || 'Growth description'}</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="p-10 rounded-lg mb-12">
          <blockquote className="text-xl md:text-2xl italic text-center font-light mb-6">
            "{t.philosophy?.quote || 'Inspirational quote'}"
          </blockquote>
          <div className="text-center">
            <div className="inline-block h-1 w-20 bg-primary mb-4"></div>
            <h4 className="text-lg uppercase">Hasan Ahmad</h4>
            <p className="text-sm text-muted-foreground">CEO & Founder, BlendLab</p>
          </div>
        </div>
        
        <div className="text-center">
          <Button className="group" size="lg">
            {t.philosophy?.learnMore || 'Learn More'}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1">
              <path strokeLinecap="square" strokeLinejoin="miter" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
} 