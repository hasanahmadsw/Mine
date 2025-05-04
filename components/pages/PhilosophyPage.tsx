"use client";

import { useTranslations } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb, Users, TrendingUp, Quote } from "lucide-react";

export function PhilosophyPage() {
  const { t } = useTranslations();
  
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('philosophy.title')}</h1>
            <div className="w-20 h-1 bg-primary mb-8"></div>
            <p className="text-muted-foreground text-lg">
              {t('philosophy.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Core Principles Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold mb-14">{t('philosophy.corePrinciples')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-md overflow-hidden h-full">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  {t("philosophy.principles.innovation.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("philosophy.principles.innovation.description")}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md overflow-hidden h-full">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  {t("philosophy.principles.leadership.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("philosophy.principles.leadership.description")}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md overflow-hidden h-full">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  {t("philosophy.principles.growth.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t("philosophy.principles.growth.description")}
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
              "{t("philosophy.quote")}"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('philosophy.expanded.title')}</h2>
              <p className="text-muted-foreground mb-8">
                {t('philosophy.expanded.description')}
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">01</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t('philosophy.expanded.steps.identification.title')}</h3>
                    <p className="text-muted-foreground">{t('philosophy.expanded.steps.identification.description')}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">02</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t('philosophy.expanded.steps.collaboration.title')}</h3>
                    <p className="text-muted-foreground">{t('philosophy.expanded.steps.collaboration.description')}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">03</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t('philosophy.expanded.steps.implementation.title')}</h3>
                    <p className="text-muted-foreground">{t('philosophy.expanded.steps.implementation.description')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">{t('philosophy.expanded.values.title')}</h3>
              
              <div className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2">{t('philosophy.expanded.values.testimonials.client.title')}</h4>
                    <p className="text-muted-foreground text-sm">
                      "{t('philosophy.expanded.values.testimonials.client.quote')}"
                    </p>
                    <div className="mt-4 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 mr-3"></div>
                      <div>
                        <p className="text-sm font-medium">{t('philosophy.expanded.values.testimonials.client.author')}</p>
                        <p className="text-xs text-muted-foreground">{t('philosophy.expanded.values.testimonials.client.position')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2">{t('philosophy.expanded.values.testimonials.industry.title')}</h4>
                    <p className="text-muted-foreground text-sm">
                      "{t('philosophy.expanded.values.testimonials.industry.quote')}"
                    </p>
                    <div className="mt-4 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 mr-3"></div>
                      <div>
                        <p className="text-sm font-medium">{t('philosophy.expanded.values.testimonials.industry.author')}</p>
                        <p className="text-xs text-muted-foreground">{t('philosophy.expanded.values.testimonials.industry.position')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
              {t('philosophy.cta.title')}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              {t('philosophy.cta.description')}
            </p>
            <Button 
              className="bg-secondary text-primary hover:bg-secondary/90"
              size="lg"
            >
              {t('philosophy.cta.button')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
} 