"use client";

import { Button } from "@/components/ui/button";
import { ArrowDownIcon } from "lucide-react";
import { useTranslations } from "@/app/i18n/client";
import { motion } from "framer-motion";

export function HeroSection() {
  const { t } = useTranslations();
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[calc(90vh-100px)] flex items-center justify-center py-24 overflow-hidden">
      {/* Background gradient and animation container */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0">
        {/* Animated background elements */}
        <motion.div className="absolute inset-0">
          {/* Vertical grid lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`v-${i}`}
              initial={{ opacity: 0, scaleY: 0.8 }}
              animate={{ opacity: 0.1, scaleY: 1 }}
              transition={{ 
                duration: 4,
                delay: i * 1.2 + 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="absolute top-0 bottom-0 w-[1px] bg-primary"
              style={{ left: `${(i + 1) * 8}%`, height: '100%', transformOrigin: 'center' }}
            />
          ))}
          
          {/* Horizontal grid lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`h-${i}`}
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 0.1, scaleX: 1 }}
              transition={{ 
                duration: 4, 
                delay: i * 1.2 + 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="absolute left-0 right-0 h-[1px] bg-primary"
              style={{ top: `${(i + 1) * 12.5}%`, width: '100%', transformOrigin: 'center' }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-12 pt-16">
        {/* Text Content */}
        <motion.div 
          className="flex-1 text-center lg:text-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight">
            <span className="block">{t('hero.greeting')}</span>
            <motion.span 
              className="text-primary"
              initial={{ backgroundSize: "0% 3px" }}
              animate={{ backgroundSize: "100% 3px" }}
              transition={{ duration: 2, delay: 1 }}
              style={{ 
                backgroundImage: "linear-gradient(to right, rgba(var(--color-primary), 1), rgba(var(--color-primary), 1))",
                backgroundPosition: "0 100%",
                backgroundRepeat: "no-repeat"
              }}
            >
              {t('hero.name')}
            </motion.span>
          </h1>
          <motion.p 
            className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          >
            {t('hero.title')}
          </motion.p>
          <motion.p 
            className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            {t('hero.description')}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.4 }}
          >
            <Button size="lg" className="px-12 py-6">
              {t('hero.aboutButton')}
            </Button>
            <Button size="lg" variant="outline" className="px-12 py-6">
              {t('hero.connectButton')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll down indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          opacity: { duration: 1, delay: 2 },
          y: { duration: 2, repeat: Infinity, repeatType: "reverse" }
        }}
      >
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full"
          onClick={scrollToAbout}
        >
          <ArrowDownIcon size={24} />
        </Button>
      </motion.div>
    </section>
  );
} 