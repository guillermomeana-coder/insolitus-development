import type { ReactNode } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary, Locale, locales } from '@/lib/i18n';
import { blogPosts } from '@/data/blog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const paths = [];
  for (const locale of locales) {
    for (const post of blogPosts) {
      paths.push({ locale, slug: post.slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  const validLocale = locale as Locale;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insolitusdevelopment.com';
  return {
    title: `${validLocale === 'es' ? post.title_es : post.title_en} — Insolitus Development`,
    description: validLocale === 'es' ? post.excerpt_es : post.excerpt_en,
    alternates: { canonical: `${baseUrl}/${locale}/blog/${slug}` },
    openGraph: {
      title: validLocale === 'es' ? post.title_es : post.title_en,
      description: validLocale === 'es' ? post.excerpt_es : post.excerpt_en,
      images: [{ url: `${baseUrl}${post.image}` }],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

function parseInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderContent(content: string): ReactNode[] {
  const lines = content.split('\n');
  const elements: ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="font-heading text-2xl md:text-3xl text-[#1A2530] font-medium mt-12 mb-4">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="mb-2" />);
    } else {
      elements.push(
        <p key={key++} className="text-[#4A5568] leading-relaxed mb-4">
          {parseInline(line)}
        </p>
      );
    }
  }
  return elements;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const validLocale = locale as Locale;
  const dictionary = getDictionary(validLocale);

  const title = validLocale === 'es' ? post.title_es : post.title_en;
  const content = validLocale === 'es' ? post.content_es : post.content_en;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(validLocale === 'es' ? 'es-MX' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

  const otherPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <>
      <Navbar locale={validLocale} dictionary={dictionary} />
      <main className="bg-[#F6F6F6] min-h-screen">
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img src={post.image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2530] via-[#1A2530]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-6 pb-10">
            <div className="flex items-center gap-4 mb-4">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[#A14A32] text-xs font-accent tracking-wider uppercase">{tag}</span>
              ))}
            </div>
            <h1 className="font-heading text-3xl md:text-4xl text-white font-medium leading-snug">{title}</h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="flex items-center gap-6 mb-10 pb-8 border-b border-[#D9D4CC]">
            <div>
              <p className="text-[#1A2530] text-sm font-medium">{post.author}</p>
              <p className="text-[#7A7369] text-xs">{formatDate(post.date)} · {post.readTime} {(dictionary as any).blog.minRead}</p>
            </div>
          </div>

          <div>{renderContent(content)}</div>

          <div className="mt-16 pt-8 border-t border-[#D9D4CC]">
            <Link
              href={`/${validLocale}/blog`}
              className="inline-flex items-center gap-2 text-sm font-accent tracking-wider uppercase text-[#7A7369] hover:text-[#A14A32] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {(dictionary as any).blog.allPosts}
            </Link>
          </div>
        </div>

        {otherPosts.length > 0 && (
          <div className="bg-[#1A2530] py-16">
            <div className="max-w-6xl mx-auto px-6">
              <p className="font-accent text-[#A14A32] text-sm tracking-[0.2em] uppercase mb-8">
                {(dictionary as any).blog.related}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {otherPosts.map((p) => (
                  <Link key={p.id} href={`/${validLocale}/blog/${p.slug}`} className="group flex gap-4">
                    <div className="w-24 h-20 shrink-0 overflow-hidden">
                      <img
                        src={p.image}
                        alt={validLocale === 'es' ? p.title_es : p.title_en}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading text-base text-white group-hover:text-[#EBE6DF] transition-colors leading-snug">
                        {validLocale === 'es' ? p.title_es : p.title_en}
                      </h3>
                      <p className="text-[#EBE6DF]/50 text-xs mt-1">{p.readTime} {(dictionary as any).blog.minRead}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer locale={validLocale} dictionary={dictionary} />
    </>
  );
}
