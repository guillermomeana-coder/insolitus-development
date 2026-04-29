'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  dictionary: {
    hero: {
      tagline: string;
      subtitle: string;
      cta: string;
    };
  };
}

export default function Hero({ dictionary }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 30,
        y: (clientY / innerHeight - 0.5) * 30,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxY = scrollY * 0.4;
  const opacity = Math.max(0, 1 - scrollY / 500);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 scale-110"
        style={{
          transform: `translateY(${parallaxY}px) translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <img
          src="/images/hero-bg.jpg"
          alt="Los Cabos coastline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2530]/30 via-[#1A2530]/40 to-[#1A2530]/70" />
      </div>

      <div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{
          opacity,
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-accent text-[#EBE6DF] text-sm tracking-[0.3em] uppercase mb-8"
        >
          Insolitus Development
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-5xl md:text-6xl lg:text-7xl text-white font-medium leading-[1.1] mb-8"
          style={{
            textShadow: '0 4px 30px rgba(0,0,0,0.3)',
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          {dictionary.hero.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#EBE6DF]/90 text-lg md:text-xl mb-12 max-w-2xl mx-auto"
        >
          {dictionary.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center bg-[#A14A32] text-white px-10 py-5 text-base font-medium overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(161,74,50,0.4)]"
          >
            <span className="relative z-10 flex items-center">
              {dictionary.hero.cta}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-[#8B3F2A] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ opacity }}
      >
        <div className="w-[1px] h-20 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className="w-[1px] h-8 bg-white/80 absolute"
          />
        </div>
      </motion.div>
    </section>
  );
}
