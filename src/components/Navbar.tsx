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

  const navLinks = [
    { href: '#about', label: dictionary.nav.about },
    { href: '#projects', label: dictionary.nav.projects },
    { href: '#services', label: dictionary.nav.services },
    { href: '#partners', label: dictionary.nav.partners },
    { href: '#contact', label: dictionary.nav.contact },
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
    window.location.href = ;
  };

  return (
    <nav
      className={}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href={} className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <img
              src="/insolitus-logo.svg"
              alt="Insolitus Development"
              className={}
            />
            <div className="hidden md:flex flex-col leading-none">
              <span className={}>Insolitus</span>
              <span className={}>Development</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div
              className={}
            >
              <button
                onClick={() => switchLocale('en')}
                className={}
              >
                EN
              </button>
              <button
                onClick={() => switchLocale('es')}
                className={}
              >
                ES
              </button>
            </div>

            <button
              className={}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={}
        style={{ top: '80px' }}
      >
        <div className="flex flex-col p-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="py-4 text-lg text-[#1A2530] border-b border-[#D9D4CC]/50 transition-colors hover:text-[#A14A32]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
