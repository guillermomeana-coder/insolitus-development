'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import { Locale } from '@/lib/i18n';

interface BlogPreviewProps {
  locale: Locale;
  dictionary: {
    blog: {
      headline: string;
      subtitle: string;
      readMore: string;
      allPosts: string;
      minRead: string;
    };
  };
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function BlogPreview({ locale, dictionary }: BlogPreviewProps) {
  const latestPosts = blogPosts.slice(0, 3);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section id="blog" className="py-24 md:py-32 bg-[#1A2530]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="font-accent text-[#A14A32] text-sm tracking-[0.2em] uppercase mb-4">
              {dictionary.blog.headline}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-white font-medium">
              {dictionary.blog.subtitle}
            </h2>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="shrink-0 text-sm font-accent tracking-wider uppercase text-[#EBE6DF]/60 hover:text-[#A14A32] transition-colors flex items-center gap-2"
          >
            {dictionary.blog.allPosts}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {latestPosts.map((post) => (
            <motion.article key={post.id} variants={fadeInUp}>
              <Link href={`/${locale}/blog/${post.slug}`} className="group block">
                {/* Image */}
                <div className="relative h-52 overflow-hidden mb-5">
                  <img
                    src={post.image}
                    alt={locale === 'es' ? post.title_es : post.title_en}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2530]/60 to-transparent" />
                  <span className="absolute top-4 left-4 bg-[#A14A32] text-white text-xs font-accent tracking-wider px-3 py-1">
                    {post.readTime} {dictionary.blog.minRead}
                  </span>
                </div>

                {/* Content */}
                <p className="text-[#EBE6DF]/50 text-xs font-accent tracking-wider uppercase mb-2">
                  {formatDate(post.date)}
                </p>
                <h3 className="font-heading text-lg text-white leading-snug mb-3 group-hover:text-[#EBE6DF] transition-colors">
                  {locale === 'es' ? post.title_es : post.title_en}
                </h3>
                <p className="text-[#EBE6DF]/60 text-sm leading-relaxed line-clamp-2 mb-4">
                  {locale === 'es' ? post.excerpt_es : post.excerpt_en}
                </p>
                <span className="text-[#A14A32] text-sm font-accent tracking-wider uppercase flex items-center gap-2 group-hover:gap-3 transition-all">
                  {dictionary.blog.readMore}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
