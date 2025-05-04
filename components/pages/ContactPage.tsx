"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MailIcon, SendIcon, CheckIcon } from "lucide-react";
import { useTranslations } from "@/app/i18n/client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function ContactPage() {
  const { t } = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // جمع بيانات النموذج
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formJson.name,
          email: formJson.email,
          subject: formJson.subject,
          message: formJson.message
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      // نجاح الإرسال
      setIsSubmitted(true);
      toast.success(t('contact.success.toast') || 'Message sent successfully!');
      
      // إعادة تعيين النموذج بعد 5 ثوان
      setTimeout(() => {
        setIsSubmitted(false);
        (e.target as HTMLFormElement).reset();
      }, 5000);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(t('contact.error.toast') || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isClient) {
    return (
      <div className="pt-32">
        <div className="container">
          <div className="max-w-3xl">
            <div className="h-12 w-64 bg-muted/50 mx-auto mb-4 rounded"></div>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            <div className="h-6 w-full max-w-lg mx-auto bg-muted/30 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  const benefitItems = t('contact.benefits.items');
  
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.title')}</h1>
            <div className="w-20 h-1 bg-primary mb-8"></div>
            <p className="text-muted-foreground text-lg">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Contact Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-bold mb-8">{t('contact.info.title')}</h2>
              
              <div className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded">
                      <MailIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base mb-1">{t('contact.info.email.title')}</CardTitle>
                      <CardDescription className="text-sm">
                        {t('contact.info.email.value')}
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Additional Information */}
              <div className="mt-12 bg-primary/5 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">
                  {t('contact.benefits.title')}
                </h3>
                <ul className="space-y-3">
                  {Array.isArray(benefitItems) ? (
                    benefitItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{t('contact.benefits.items')}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-8">
              <h2 className="text-2xl font-bold mb-8">{t('contact.form.title')}</h2>
              
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <CheckIcon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{t('contact.success.title')}</h3>
                      <p className="text-muted-foreground">
                        {t('contact.success.description')}
                      </p>
                    </div>
                  ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            {t('contact.form.name')}
                          </label>
                          <Input
                            id="name"
                            name="name"
                            placeholder={t('contact.form.placeholders.name')}
                            className="focus-visible:ring-primary"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            {t('contact.form.email')}
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder={t('contact.form.placeholders.email')}
                            className="focus-visible:ring-primary"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          {t('contact.form.subject')}
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder={t('contact.form.placeholders.subject')}
                          className="focus-visible:ring-primary"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          {t('contact.form.message')}
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder={t('contact.form.placeholders.message')}
                          rows={6}
                          className="focus-visible:ring-primary"
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full flex items-center justify-center gap-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                            <span>{t('contact.sending')}</span>
                          </>
                        ) : (
                          <>
                            <SendIcon className="h-4 w-4" />
                            {t('contact.form.submit')}
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
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
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                className="bg-white text-primary hover:bg-white/90"
                size="lg"
              >
                {t('contact.cta.scheduleCall')}
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
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