"use client";

import { useTranslations } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";
import { Clock, Download, Lightbulb, Heart, Globe, Star } from "lucide-react";

export function AboutPage() {
  const { t } = useTranslations();
  
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('about.title')}</h1>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-muted-foreground text-lg">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* About Description Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <h2 className="text-3xl font-bold mb-6">{t('about.title')}</h2>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                {t('about.description')}
              </p>
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mr-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <span className="text-lg font-medium">{t('about.experience')}</span>
              </div>
              <Button className="flex gap-2 mt-4" variant="outline">
                <Download className="h-4 w-4" />
                {t('about.resume')}
              </Button>
            </div>
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="bg-muted/20 p-8 aspect-square w-full max-w-md rounded-lg relative overflow-hidden">
                {/* Placeholder for profile image - this would be an actual image in production */}
                <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                  <span className="text-xl font-semibold text-muted-foreground">{t('hero.name')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('about.values.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-muted/20 p-8 rounded-lg">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('about.values.integrity.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.values.integrity.description')}
                </p>
              </div>
              
              <div className="bg-muted/20 p-8 rounded-lg">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('about.values.continuousLearning.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.values.continuousLearning.description')}
                </p>
              </div>
              
              <div className="bg-muted/20 p-8 rounded-lg">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('about.values.excellence.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.values.excellence.description')}
                </p>
              </div>
              
              <div className="bg-muted/20 p-8 rounded-lg">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('about.values.diversity.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.values.diversity.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Vision Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('about.vision.title')}</h2>
            <div className="bg-muted/20 p-10 rounded-lg">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-lg">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
              </div>
              <p className="text-center text-xl leading-relaxed mb-8">
                {t('about.vision.mainDescription')}
              </p>
              <div className="space-y-6">
                <div className="bg-muted/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">{t('about.vision.inclusiveDigital.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('about.vision.inclusiveDigital.description')}
                  </p>
                </div>
                <div className="bg-muted/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">{t('about.vision.sustainableInnovation.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('about.vision.sustainableInnovation.description')}
                  </p>
                </div>
                <div className="bg-muted/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">{t('about.vision.humanCenteredTech.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('about.vision.humanCenteredTech.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Personal Philosophy Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('philosophy.title')}</h2>
            <div className="space-y-8">
              <div className="bg-muted/20 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{t('philosophy.principles.innovation.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('philosophy.principles.innovation.description')}
                </p>
              </div>
              
              <div className="bg-muted/20 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{t('philosophy.principles.leadership.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('philosophy.principles.leadership.description')}
                </p>
              </div>
              
              <div className="bg-muted/20 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{t('philosophy.principles.growth.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('philosophy.principles.growth.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Responsibility Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('about.socialResponsibility.title')}</h2>
            <div className="bg-muted/20 p-8 rounded-lg mb-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg mr-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{t('about.socialResponsibility.commitment.title')}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t('about.socialResponsibility.commitment.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-muted/10 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">{t('about.socialResponsibility.youthEmpowerment.title')}</h3>
                <p className="text-muted-foreground">
                  {t('about.socialResponsibility.youthEmpowerment.description')}
                </p>
              </div>
              
              <div className="bg-muted/10 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">{t('about.socialResponsibility.environmentalSustainability.title')}</h3>
                <p className="text-muted-foreground">
                  {t('about.socialResponsibility.environmentalSustainability.description')}
                </p>
              </div>
            </div>
            
            <div className="bg-muted/20 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg mr-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{t('about.socialResponsibility.globalInitiatives.title')}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t('about.socialResponsibility.globalInitiatives.description')}
              </p>
              <p className="text-muted-foreground italic">
                "{t('about.socialResponsibility.globalInitiatives.quote')}"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Inspiration & Influence Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('about.inspiration.title')}</h2>
            
            <div className="space-y-8">
              <div className="bg-muted/20 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-6 text-center">{t('about.inspiration.sources.title')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-muted/10 p-6 rounded-lg">
                    <h4 className="text-lg font-medium mb-3">{t('about.inspiration.sources.pioneers.title')}</h4>
                    <p className="text-muted-foreground">
                      {t('about.inspiration.sources.pioneers.description')}
                    </p>
                  </div>
                  
                  <div className="bg-muted/10 p-6 rounded-lg">
                    <h4 className="text-lg font-medium mb-3">{t('about.inspiration.sources.philosophy.title')}</h4>
                    <p className="text-muted-foreground">
                      {t('about.inspiration.sources.philosophy.description')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/20 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-6">{t('about.inspiration.quotes.title')}</h3>
                <div className="space-y-6">
                  <blockquote className="border-l-4 border-primary pl-4 py-2 italic">
                    <p className="mb-2">"{t('about.inspiration.quotes.jobsQuote.text')}"</p>
                    <footer className="text-sm text-muted-foreground">- {t('about.inspiration.quotes.jobsQuote.author')}</footer>
                  </blockquote>
                  
                  <blockquote className="border-l-4 border-primary pl-4 py-2 italic">
                    <p className="mb-2">"{t('about.inspiration.quotes.shafiQuote.text')}"</p>
                    <footer className="text-sm text-muted-foreground">- {t('about.inspiration.quotes.shafiQuote.author')}</footer>
                  </blockquote>
                  
                  <blockquote className="border-l-4 border-primary pl-4 py-2 italic">
                    <p className="mb-2">"{t('about.inspiration.quotes.aristotleQuote.text')}"</p>
                    <footer className="text-sm text-muted-foreground">- {t('about.inspiration.quotes.aristotleQuote.author')}</footer>
                  </blockquote>
                </div>
              </div>
              
              <div className="bg-muted/20 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-6">{t('about.inspiration.sharing.title')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('about.inspiration.sharing.description1')}
                </p>
                <p className="text-muted-foreground">
                  {t('about.inspiration.sharing.description2')}
                </p>
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