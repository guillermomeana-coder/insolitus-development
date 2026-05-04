'use client';

import { Locale } from '@/lib/i18n';

const WA_NUMBER = '5216241517461';

const messages: Record<Locale, string> = {
  en: "Hello! I'm interested in learning more about Insolitus Development and your projects in Los Cabos.",
  es: '¡Hola! Me interesa conocer más sobre Insolitus Development y sus proyectos en Los Cabos.',
};

export default function WhatsAppButton({ locale }: { locale: Locale }) {
  const text = encodeURIComponent(messages[locale]);
  const href = `https://wa.me/${WA_NUMBER}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      {/* Label that appears on hover */}
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap pl-0 group-hover:pl-4 text-sm font-medium">
        WhatsApp
      </span>

      {/* WA icon */}
      <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.737 5.469 2.027 7.77L0 32l8.468-2.001A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.28 13.28 0 01-6.771-1.854l-.486-.288-5.026 1.187 1.21-4.898-.318-.503A13.254 13.254 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.199-2.355-1.162-2.72-1.295-.365-.133-.631-.199-.897.199-.266.398-1.03 1.295-1.263 1.561-.232.266-.465.299-.863.1-.398-.199-1.681-.62-3.202-1.977-1.183-1.056-1.981-2.36-2.214-2.758-.233-.398-.025-.613.175-.811.18-.178.398-.465.597-.698.2-.232.266-.398.398-.664.133-.266.067-.498-.033-.697-.1-.2-.897-2.163-1.23-2.96-.323-.778-.651-.672-.897-.685l-.764-.013c-.266 0-.697.1-1.063.498-.365.398-1.395 1.362-1.395 3.325 0 1.963 1.428 3.86 1.627 4.126.2.266 2.81 4.29 6.808 6.018.951.411 1.693.656 2.272.84.955.304 1.824.261 2.511.158.766-.115 2.355-.963 2.688-1.893.332-.93.332-1.728.232-1.893-.099-.166-.365-.265-.763-.464z"/>
        </svg>
      </div>
    </a>
  );
}
