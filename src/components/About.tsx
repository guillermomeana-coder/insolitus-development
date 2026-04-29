'use client';

import { motion, Variants } from 'framer-motion';

interface AboutProps {
  dictionary: {
    nav: { about: string };
    about: {
      headline: string;
      body: string;
    };
  };
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About({ dictionary }: AboutProps) {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#F6F6F6]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
          >
            <p className="overline mb-4">{dictionary.nav.about}</p>
            <h2 className="font-heading text-3xl md:text-4xl text-[#1A2530] font-medium mb-8 leading-tight">
              {dictionary.about.headline}
            </h2>
            <p className="text-[#7A7369] text-base md:text-lg leading-relaxed">
              {dictionary.about.body}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1746205930744-928d84e315aa?crop=entropy&cs=srgb&fm=jpg&q=85"
              alt="Baja California landscape"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#A14A32]/10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
