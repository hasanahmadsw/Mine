"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, MenuIcon, XIcon, GlobeIcon } from "lucide-react";
import { useTranslations, useCurrentLocale, getAlternateLocale } from "@/app/i18n/client";
import { useTheme } from "next-themes";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useTranslations();
  const locale = useCurrentLocale();
  const alternateLocale = getAlternateLocale(locale);
  const pathname = usePathname();
  const router = useRouter();
  
  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  
  const switchLanguage = () => {
    // Get the path without the locale
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    
    // Set a cookie for the chosen language
    document.cookie = `NEXT_LOCALE=${alternateLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Navigate to the same page with the alternate locale
    router.push(`/${alternateLocale}${pathWithoutLocale}`);
  };
  
  // Prevent theme flash during hydration
  const currentTheme = mounted ? theme : undefined;
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border/50 py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link 
          href={`/${locale}`}
          className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          Hasan Ahmad
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#about" className="hover:text-primary transition-colors">
            {t('header.about')}
          </Link>
          <Link href="/thoughts" className="hover:text-primary transition-colors">
            {t('header.thoughts')}
          </Link>
          <Link href="/philosophy" className="hover:text-primary transition-colors">
            {t('header.philosophy')}
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            {t('header.contact')}
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={switchLanguage}
            className="rounded-full"
            aria-label={`Switch to ${t(`language.${alternateLocale}`)}`}
            title={`Switch to ${t(`language.${alternateLocale}`)}`}
          >
            <GlobeIcon size={18} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full"
            aria-label={currentTheme === "light" ? "Switch to dark theme" : "Switch to light theme"}
          >
            {mounted && (
              currentTheme === "light" ? <MoonIcon size={18} /> : <SunIcon size={18} />
            )}
          </Button>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            className="rounded-full md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-[300px] py-4" : "max-h-0"
        )}
      >
        <nav className="container flex flex-col gap-4">
          <Link 
            href="#about" 
            className="py-2 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('header.about')}
          </Link>
          <Link 
            href="#achievements" 
            className="py-2 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('header.achievements')}
          </Link>
          <Link 
            href="#testimonials" 
            className="py-2 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('header.testimonials')}
          </Link>
          <Link 
            href="#contact" 
            className="py-2 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('header.contact')}
          </Link>
        </nav>
      </div>
    </header>
  );
}