import { getTranslations } from "@/app/i18n/server";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { Locale } from "@/app/i18n/settings";
import { ContactForm } from "@/components/sections/ContactForm";

interface ContactSectionProps {
  locale: Locale;
}

export async function ContactSection({ locale }: ContactSectionProps) {
  const t = await getTranslations(locale);
  
  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contact?.title || 'Contact'}</h2>
          <div className="w-20 h-1 bg-primary mb-8"></div>
          <p className="text-muted-foreground max-w-3xl">
            {t.contact?.subtitle || 'Get in touch with me'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">{t.contact?.info?.title || 'Contact Information'}</h3>
            
            <div className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MailIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base mb-1">{t.contact?.info?.email?.title || 'Email'}</CardTitle>
                    <CardDescription className="text-sm">
                      {t.contact?.info?.email?.value || 'contact@example.com'}
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
                    <CardTitle className="text-base mb-1">{t.contact?.info?.phone?.title || 'Phone'}</CardTitle>
                    <CardDescription className="text-sm">
                      {t.contact?.info?.phone?.value || '+1 (555) 123-4567'}
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
                    <CardTitle className="text-base mb-1">{t.contact?.info?.headquarters?.title || 'Headquarters'}</CardTitle>
                    <CardDescription className="text-sm">
                      {t.contact?.info?.headquarters?.value || 'Dubai, UAE'}
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">{t.contact?.form?.title || 'Send Message'}</h3>
            <ContactForm locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
} 