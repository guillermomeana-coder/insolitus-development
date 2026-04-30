import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, Locale, locales } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Partners from '@/components/Partners';
import BlogPreview from '@/components/BlogPreview';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getDictionary(locale as Locale);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insolitusdevelopment.com';

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
      },
    },
    openGraph: {
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_MX',
      type: 'website',
      url: `${baseUrl}/${locale}`,
    },
  };
}

export default async function LocalePage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;
  const dictionary = getDictionary(validLocale);

  return (
    <>
      <Navbar locale={validLocale} dictionary={dictionary} />
      <main>
        <Hero dictionary={dictionary} />
        <About dictionary={dictionary} />
        <Projects locale={validLocale} dictionary={dictionary} />
        <Services dictionary={dictionary} />
        <Partners dictionary={dictionary} />
        <BlogPreview locale={validLocale} dictionary={dictionary} />
        <ContactForm locale={validLocale} dictionary={dictionary} />
      </main>
      <Footer locale={validLocale} dictionary={dictionary} />
    </>
  );
}
