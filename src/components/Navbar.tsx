'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Locale } from '@/lib/i18n';

interface NavbarProps {
  locale: Locale;
  dictionary: {
    nav: {
      about: string;
      projects: string;
      services: string;
      partners: string;
      blog: string;
      contact: string;
    };
  };
}

export default function Navbar({ locale, dictionary }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const anchorLinks = [
    { href: '#about', label: dictionary.nav.about },
    { href: '#projects', label: dictionary.nav.projects },
    { href: '#services', label: dictionary.nav.services },
    { href: '#partners', label: dictionary.nav.partners },
  ];

  const showTransparent = !scrolled && !mobileMenuOpen;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  const switchLocale = (newLocale: Locale) => {
    localStorage.setItem('preferred-locale', newLocale);
    window.location.href = `/${newLocale}`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showTransparent
          ? 'bg-transparent'
          : 'bg-[#F6F6F6]/95 backdrop-blur-md border-b border-[#D9D4CC]/50'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href={`/${locale}`} className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <img
              src="/insolitus-logo.svg"
              alt="Insolitus Development"
              className={`h-10 md:h-12 w-auto transition-all duration-300 ${
                showTransparent ? 'brightness-0 invert' : ''
              }`}
            />
            <div className="hidden md:flex flex-col leading-none">
              <span className={`font-heading text-sm tracking-widest uppercase transition-colors duration-300 ${
                showTransparent ? 'text-white' : 'text-[#1A2530]'
              }`}>Insolitus</span>
              <span className={`font-accent text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 ${
                showTransparent ? 'text-white/70' : 'text-[#A14A32]'
              }`}>Development</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {anchorLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm tracking-wide transition-colors duration-200 ${
                  showTransparent
                    ? 'text-white/80 hover:text-white'
                    : 'text-[#7A7369] hover:text-[#1A2530]'
                }`}
              >
                {link.label}
              </a>
            ))}
            <Link
              href={`/${locale}/blog`}
              className={`text-sm tracking-wide transition-colors duration-200 ${
                showTransparent
                  ? 'text-white/80 hover:text-white'
                  : 'text-[#7A7369] hover:text-[#1A2530]'
              }`}
            >
              {dictionary.nav.blog}
            </Link>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`text-sm tracking-wide transition-colors duration-200 ${
                showTransparent
                  ? 'text-white/80 hover:text-white'
                  : 'text-[#7A7369] hover:text-[#1A2530]'
              }`}
            >
              {dictionary.nav.contact}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`flex items-center rounded overflow-hidden text-sm ${
                showTransparent ? 'border border-white/30' : 'border border-[#D9D4CC]'
              }`}
            >
              <button
                onClick={() => switchLocale('en')}
                className={`px-3 py-1.5 font-medium transition-all duration-200 ${
                  locale === 'en'
                    ? showTransparent
                      ? 'bg-white text-[#1A2530]'
                      : 'bg-[#1A2530] text-white'
                    : showTransparent
                    ? 'text-white/80 hover:text-white'
                    : 'text-[#7A7369] hover:text-[#1A2530]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLocale('es')}
                className={`px-3 py-1.5 font-medium transition-all duration-200 ${
                  locale === 'es'
                    ? showTransparent
                      ? 'bg-white text-[#1A2530]'
                      : 'bg-[#1A2530] text-white'
                    : showTransparent
                    ? 'text-white/80 hover:text-white'
                    : 'text-[#7A7369] hover:text-[#1A2530]'
                }`}
              >
                ES
              </button>
            </div>

            <button
              className={`lg:hidden p-2 transition-colors ${
                showTransparent ? 'text-white' : 'text-[#1A2530]'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden fixed left-0 right-0 bg-[#F6F6F6] border-b border-[#D9D4CC] transition-all duration-300 ease-out ${
          mobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}
        style={{ top: '80px' }}
      >
        <div className="flex flex-col p-6">
          {anchorLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="py-4 text-lg text-[#1A2530] border-b border-[#D9D4CC]/50 transition-colors hover:text-[#A14A32]"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={`/${locale}/blog`}
            onClick={() => setMobileMenuOpen(false)}
            className="py-4 text-lg text-[#1A2530] border-b border-[#D9D4CC]/50 transition-colors hover:text-[#A14A32]"
          >
            {dictionary.nav.blog}
          </Link>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="py-4 text-lg text-[#1A2530] transition-colors hover:text-[#A14A32]"
          >
            {dictionary.nav.contact}
          </a>
        </div>
      </div>
    </nav>
  );
}
