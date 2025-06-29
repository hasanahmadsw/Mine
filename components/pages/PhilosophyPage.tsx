
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb, Users, TrendingUp, Quote } from "lucide-react";
import { Locale } from "@/app/i18n/settings";

import { getTranslations } from "@/app/i18n/server";

interface PhilosophyPageProps {
  locale: Locale;
}

export async function PhilosophyPage({ locale }: PhilosophyPageProps) {
  const t = await getTranslations(locale);
  
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.philosophy?.title || 'Philosophy'}</h1>
            <div className="w-20 h-1 bg-primary mb-8"></div>
            <p className="text-muted-foreground text-lg">
              {t.philosophy?.subtitle || 'My core principles and beliefs'}
            </p>
          </div>
        </div>
      </section>
      
      {/* Core Principles Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold mb-14">{t.philosophy?.corePrinciples || 'Core Principles'}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-md overflow-hidden h-full">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  {t.philosophy?.principles?.innovation?.title || 'Innovation'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t.philosophy?.principles?.innovation?.description || 'Innovation description'}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md overflow-hidden h-full">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  {t.philosophy?.principles?.leadership?.title || 'Leadership'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t.philosophy?.principles?.leadership?.description || 'Leadership description'}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md overflow-hidden h-full">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  {t.philosophy?.principles?.growth?.title || 'Growth'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t.philosophy?.principles?.growth?.description || 'Growth description'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Quote Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Quote className="h-6 w-6 text-primary" />
              </div>
            </div>
            <blockquote className="text-2xl md:text-3xl font-light italic mb-8">
              "{t.philosophy?.quote || 'Inspirational quote'}"
            </blockquote>
            <div className="inline-block h-1 w-20 bg-primary mb-8"></div>
            <div>
              <p className="text-lg font-semibold">Hasan Ahmad</p>
              <p className="text-sm text-muted-foreground">CEO & Founder, BlendLab</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Expanded Philosophy Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t.philosophy?.expanded?.title || 'Expanded Philosophy'}</h2>
              <p className="text-muted-foreground mb-8">
                {t.philosophy?.expanded?.description || 'Expanded philosophy description'}
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">01</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t.philosophy?.expanded?.steps?.identification?.title || 'Identification'}</h3>
                    <p className="text-muted-foreground">{t.philosophy?.expanded?.steps?.identification?.description || 'Identification description'}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">02</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t.philosophy?.expanded?.steps?.collaboration?.title || 'Collaboration'}</h3>
                    <p className="text-muted-foreground">{t.philosophy?.expanded?.steps?.collaboration?.description || 'Collaboration description'}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">03</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t.philosophy?.expanded?.steps?.implementation?.title || 'Implementation'}</h3>
                    <p className="text-muted-foreground">{t.philosophy?.expanded?.steps?.implementation?.description || 'Implementation description'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t.philosophy?.cta?.title || 'CTA title'}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              {t.philosophy?.cta?.description || 'CTA description'}
            </p>
            <Button 
              className="bg-secondary text-primary hover:bg-secondary/90"
              size="lg"
            >
              {t.philosophy?.cta?.button || 'CTA button'}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
} 