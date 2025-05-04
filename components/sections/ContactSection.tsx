"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MailIcon, PhoneIcon, MapPinIcon, CheckIcon, SendIcon } from "lucide-react";
import { useTranslations } from "@/app/i18n/client";
import { toast } from "sonner";

export function ContactSection() {
  const { t } = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
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
  
  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h2>
          <div className="w-20 h-1 bg-primary mb-8"></div>
          <p className="text-muted-foreground max-w-3xl">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">{t('contact.info.title')}</h3>
            
            <div className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
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
              
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <PhoneIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base mb-1">{t('contact.info.phone.title')}</CardTitle>
                    <CardDescription className="text-sm">
                      {t('contact.info.phone.value')}
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPinIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base mb-1">{t('contact.info.headquarters.title')}</CardTitle>
                    <CardDescription className="text-sm">
                      {t('contact.info.headquarters.value')}
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">{t('contact.form.title')}</h3>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
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
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          <SendIcon className="h-4 w-4 mr-2" />
                          {t('contact.form.button')}
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
  );
} 