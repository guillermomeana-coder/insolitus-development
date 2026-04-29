'use client';

import { Locale } from '@/lib/i18n';

interface FooterProps {
  locale: Locale;
  dictionary: {
    nav: {
      about: string;
      projects: string;
      services: string;
      partners: string;
      contact: string;
    };
    footer: {
      rights: string;
      location: string;
    };
  };
}

export default function Footer({ locale, dictionary }: FooterProps) {
  const navLinks = [
    { href: '#about', label: dictionary.nav.about },
    { href: '#projects', label: dictionary.nav.projects },
    { href: '#services', label: dictionary.nav.services },
    { href: '#partners', label: dictionary.nav.partners },
    { href: '#contact', label: dictionary.nav.contact },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#1A2530] text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div className="flex items-center gap-3">
            <img
              src="/insolitus-logo.svg"
              alt="Insolitus Development"
              className="h-10 w-auto brightness-0 invert"
            />
          </div>

          <nav className="flex flex-wrap gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[#EBE6DF]/70 text-sm hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="w-full h-px bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#EBE6DF]/50 text-sm">{dictionary.footer.rights}</p>
          <p className="text-[#EBE6DF]/50 text-sm">{dictionary.footer.location}</p>
        </div>
      </div>
    </footer>
  );
}
