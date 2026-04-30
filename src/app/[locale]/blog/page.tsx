import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary, Locale, locales } from '@/lib/i18n';
import { blogPosts } from '@/data/blog';
import Navbar from '@/components/Navbar';
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
    title: `${dictionary.blog.headline} — Insolitus Development`,
    description: dictionary.blog.subtitle,
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
    },
  };
}

export default async function BlogListPage({ params }: PageProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const validLocale = locale as Locale;
  const dictionary = getDictionary(validLocale);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(validLocale === 'es' ? 'es-MX' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Navbar locale={validLocale} dictionary={dictionary} />
      <main className="bg-[#F6F6F6] min-h-screen">
        {/* Hero */}
        <div className="bg-[#1A2530] pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="font-accent text-[#A14A32] text-sm tracking-[0.2em] uppercase mb-4">
              {dictionary.blog.headline}
            </p>
            <h1 className="font-heading text-4xl md:text-5xl text-white font-medium">
              {dictionary.blog.subtitle}
            </h1>
          </div>
        </div>

        {/* Posts grid */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id}>
                <Link href={`/${validLocale}/blog/${post.slug}`} className="group block">
                  <div className="relative h-56 overflow-hidden mb-5">
                    <img
                      src={post.image}
                      alt={validLocale === 'es' ? post.title_es : post.title_en}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute top-4 left-4 bg-[#A14A32] text-white text-xs font-accent tracking-wider px-3 py-1">
                      {post.readTime} {dictionary.blog.minRead}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[#A14A32] text-xs font-accent tracking-wider uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-[#7A7369] text-xs font-accent tracking-wider uppercase mb-2">
                    {formatDate(post.date)}
                  </p>
                  <h2 className="font-heading text-xl text-[#1A2530] leading-snug mb-3 group-hover:text-[#A14A32] transition-colors">
                    {validLocale === 'es' ? post.title_es : post.title_en}
                  </h2>
                  <p className="text-[#7A7369] text-sm leading-relaxed line-clamp-3">
                    {validLocale === 'es' ? post.excerpt_es : post.excerpt_en}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer locale={validLocale} dictionary={dictionary} />
    </>
  );
}
