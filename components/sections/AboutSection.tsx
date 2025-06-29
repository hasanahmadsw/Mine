import { BriefcaseIcon, TrophyIcon, LightbulbIcon, GlobeIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "@/app/i18n/server";
import { Locale } from "@/app/i18n/settings";

interface AboutSectionProps {
  locale: Locale;
}

export async function AboutSection({ locale }: AboutSectionProps) {
  const t = await getTranslations(locale);
  
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container">
        <div className="flex flex-col mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.about?.title || 'About'}</h2>
          <div className="w-20 h-1 bg-primary mb-8"></div>
          <p className="text-muted-foreground max-w-3xl">
            {t.about?.description || 'About description'}
          </p>
        </div>
        
        <div className="relative">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <BriefcaseIcon className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{t.about?.skills?.leadership?.title || 'Leadership'}</h4>
                    <p className="text-sm text-muted-foreground">{t.about?.skills?.leadership?.description || 'Leadership description'}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <LightbulbIcon className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{t.about?.skills?.innovation?.title || 'Innovation'}</h4>
                    <p className="text-sm text-muted-foreground">{t.about?.skills?.innovation?.description || 'Innovation description'}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <GlobeIcon className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{t.about?.skills?.globalVision?.title || 'Global Vision'}</h4>
                    <p className="text-sm text-muted-foreground">{t.about?.skills?.globalVision?.description || 'Global vision description'}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <TrophyIcon className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{t.about?.skills?.achievement?.title || 'Achievement'}</h4>
                    <p className="text-sm text-muted-foreground">{t.about?.skills?.achievement?.description || 'Achievement description'}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 