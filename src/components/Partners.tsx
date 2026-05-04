'use client';

import { motion, Variants } from 'framer-motion';

interface PartnersProps {
  dictionary: {
    nav: { partners: string };
    partners: {
      headline: string;
      roles: {
        construction: string;
        design: string;
        visionary: string;
      };
      team: {
        alonso: { name: string; role: string; bio: string };
        manu: { name: string; role: string; bio: string };
        rodrigo: { name: string; role: string; bio: string };
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

const partners = [
  {
    key: 'rodrigo',
    roleKey: 'visionary',
    image: '/images/team/rodrigo-caldeira.jpeg',
    position: 'center 13%',
  },
  {
    key: 'manu',
    roleKey: 'design',
    image: '/images/team/maria-ponte.jpeg',
    position: 'center 15%',
  },
  {
    key: 'alonso',
    roleKey: 'construction',
    image: '/images/team/alonso-ramirez.jpeg',
    position: 'center 25%',
  },
] as const;

export default function Partners({ dictionary }: PartnersProps) {
  return (
    <section id="partners" className="py-24 md:py-32 bg-[#1A2530]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-16"
        >
          <p className="font-accent text-[#A14A32] text-sm tracking-[0.2em] uppercase mb-4">
            {dictionary.nav.partners}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-white font-medium">
            {dictionary.partners.headline}
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {partners.map(({ key, roleKey, image, position }) => (
            <motion.div key={key} variants={fadeInUp} className="text-center">
              <div className="w-36 h-36 mx-auto mb-6 overflow-hidden rounded-full bg-[#2D3A47]">
                <img
                  src={image}
                  alt={dictionary.partners.team[key].name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  style={{ objectPosition: position }}
                />
              </div>
              <p className="font-accent text-[#A14A32] text-sm tracking-wider uppercase mb-2">
                {dictionary.partners.roles[roleKey]}
              </p>
              <h3 className="font-heading text-xl text-white mb-1">
                {dictionary.partners.team[key].name}
              </h3>
              <p className="text-[#A3B19B] text-sm mb-4">{dictionary.partners.team[key].role}</p>
              <p className="text-[#EBE6DF]/70 text-sm leading-relaxed">
                {dictionary.partners.team[key].bio}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
