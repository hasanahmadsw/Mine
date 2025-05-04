import type { Metadata } from "next";
import { Poppins, Almarai } from "next/font/google";
import "./globals.css";
import { getTranslations } from "../i18n/server";
import { TranslationsProvider } from "../i18n/client";
import { Locale, getDirection } from "../i18n/settings";
import { ThemeProvider } from "next-themes";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const almarai = Almarai({
  variable: "--font-almarai",
  subsets: ["latin"],
  weight: ["400", "700"],
});



export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  const translations = await getTranslations(lang);
  const dir = getDirection(lang);
  
  return (
    <html lang={lang} dir={dir} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${almarai.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TranslationsProvider translations={translations}>
            {children}
          </TranslationsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
