'use client';

import { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ServicesProps {
  dictionary: {
    nav: { services: string };
    services: {
      headline: string;
      learnMore: string;
      close: string;
      items: {
        design: string;
        project: string;
        construction: string;
        renovations: string;
        permits: string;
      };
      details: {
        design: string;
        project: string;
        construction: string;
        renovations: string;
        permits: string;
      };
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
    transition: { staggerChildren: 0.12 },
  },
};

const services = [
  {
    key: 'design',
    image: '/images/projects/amate-9-palms.jpg',
    accent: '#A14A32',
  },
  {
    key: 'project',
    image: '/images/projects/rosewood-la-mandarina.jpg',
    accent: '#A14A32',
  },
  {
    key: 'construction',
    image: '/images/projects/el-cielo.jpg',
    accent: '#A14A32',
  },
  {
    key: 'renovations',
    image: '/images/projects/villa-38-oo.jpg',
    accent: '#A14A32',
  },
  {
    key: 'permits',
    image: '/images/projects/4seasons-cabo-del-sol.jpg',
    accent: '#A14A32',
  },
] as const;

export default function Services({ dictionary }: ServicesProps) {
  const [activeService, setActiveService] = useState<string | null>(null);

  const activeData = activeService
    ? services.find((s) => s.key === activeService)
    : null;

  return (
    <section id="services" className="py-24 md:py-32 bg-[#F6F6F6]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-16"
        >
          <p className="overline mb-4">{dictionary.nav.services}</p>
          <h2 className="font-heading text-3xl md:text-4xl text-[#1A2530] font-medium">
            {dictionary.services.headline}
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map(({ key, image }) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              className="group relative overflow-hidden cursor-pointer h-64 md:h-72"
              onClick={() => setActiveService(key)}
            >
              {/* Background photo */}
              <img
                src={image}
                alt={dictionary.services.items[key]}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark overlay — lighter on hover */}
              <div className="absolute inset-0 bg-[#1A2530]/60 group-hover:bg-[#1A2530]/40 transition-all duration-500" />

              {/* Bottom terracotta accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#A14A32] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-heading text-xl text-white font-medium leading-snug mb-3">
                  {dictionary.services.items[key]}
                </h3>
                <span className="inline-flex items-center gap-2 text-[#A14A32] text-sm font-accent tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {dictionary.services.learnMore}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeService && activeData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setActiveService(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#1A2530]/80 backdrop-blur-sm" />

            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="relative w-full max-w-2xl bg-[#F6F6F6] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo header */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={activeData.image}
                  alt={dictionary.services.items[activeService as keyof typeof dictionary.services.items]}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2530]/80 to-transparent" />
                <h3 className="absolute bottom-6 left-8 font-heading text-2xl text-white font-medium">
                  {dictionary.services.items[activeService as keyof typeof dictionary.services.items]}
                </h3>
              </div>

              {/* Body */}
              <div className="p-8">
                <p className="text-[#4A5568] leading-relaxed">
                  {dictionary.services.details[activeService as keyof typeof dictionary.services.details]}
                </p>
              </div>

              {/* Footer */}
              <div className="px-8 pb-8 flex justify-between items-center">
                <div className="h-px flex-1 bg-[#D9D4CC]" />
                <button
                  onClick={() => setActiveService(null)}
                  className="ml-6 flex items-center gap-2 text-sm text-[#7A7369] hover:text-[#1A2530] transition-colors font-accent tracking-wider uppercase"
                >
                  {dictionary.services.close}
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
