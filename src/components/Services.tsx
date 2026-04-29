'use client';

import { motion, Variants } from 'framer-motion';
import { Compass, Ruler, Hammer, RefreshCw, FileCheck } from 'lucide-react';

interface ServicesProps {
  dictionary: {
    nav: { services: string };
    services: {
      headline: string;
      items: {
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
    transition: { staggerChildren: 0.15 },
  },
};

const services = [
  { key: 'design', icon: Compass },
  { key: 'project', icon: Ruler },
  { key: 'construction', icon: Hammer },
  { key: 'renovations', icon: RefreshCw },
  { key: 'permits', icon: FileCheck },
] as const;

export default function Services({ dictionary }: ServicesProps) {
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map(({ key, icon: Icon }) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              className="bg-white p-8 border border-[#D9D4CC] hover:border-[#A14A32]/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-[#EBE6DF] flex items-center justify-center mb-6 group-hover:bg-[#A14A32]/10 transition-colors">
                <Icon className="h-6 w-6 text-[#A14A32]" />
              </div>
              <h3 className="font-heading text-lg text-[#1A2530] font-medium">
                {dictionary.services.items[key]}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
