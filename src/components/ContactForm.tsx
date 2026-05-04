'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Locale } from '@/lib/i18n';

interface ContactFormProps {
  locale: Locale;
  dictionary: {
    nav: { contact: string };
    contact: {
      headline: string;
      form: {
        name: string;
        email: string;
        phone: string;
        country: string;
        message: string;
        send: string;
        sending: string;
      };
      success: string;
      error: string;
    };
  };
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const contactInfo = {
  phone: '+52 1 624 151 7461',
  email: 'insolitusdevelopment@gmail.com',
  address: 'Blvd Mijares #717, Local 202, Plaza Aires, Centro SJC, B.C.S., CP 23400',
};

const countries = [
  'United States', 'Mexico', 'Canada', 'United Kingdom', 'Germany', 'France',
  'Spain', 'Italy', 'Netherlands', 'Switzerland', 'Australia', 'Japan',
  'China', 'Brazil', 'Argentina', 'Colombia', 'Chile', 'Peru',
  'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Israel', 'South Africa',
  'Other',
];

export default function ContactForm({ locale, dictionary }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: '',
    honeypot: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      toast.success(dictionary.contact.success);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          message: formData.message,
          language: locale,
        }),
      });

      if (response.ok) {
        toast.success(dictionary.contact.success);
        setFormData({ name: '', email: '', phone: '', country: '', message: '', honeypot: '' });
      } else {
        toast.error(dictionary.contact.error);
      }
    } catch (error) {
      toast.error(dictionary.contact.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-white border border-[#D9D4CC] focus:border-[#A14A32] focus:ring-1 focus:ring-[#A14A32]/20 outline-none transition-colors";

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#F6F6F6]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="overline mb-4">{dictionary.nav.contact}</p>
            <h2 className="font-heading text-3xl md:text-4xl text-[#1A2530] font-medium mb-8">
              {dictionary.contact.headline}
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#EBE6DF] flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-[#A14A32]" />
                </div>
                <div>
                  <a href={`tel:${contactInfo.phone}`} className="text-[#1A2530] font-medium hover:text-[#A14A32] transition-colors">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#EBE6DF] flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-[#A14A32]" />
                </div>
                <div>
                  <a href={`mailto:${contactInfo.email}`} className="text-[#1A2530] font-medium hover:text-[#A14A32] transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#EBE6DF] flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-[#A14A32]" />
                </div>
                <div>
                  <p className="text-[#1A2530]">{contactInfo.address}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 h-[200px] bg-[#D9D4CC] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.7744275991!2d-109.70358!3d23.06277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86af50f6a8a8a8a9%3A0x0!2sPlaza%20Aires%2C%20San%20Jos%C3%A9%20del%20Cabo!5e0!3m2!1sen!2smx!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Insolitus Location"
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label className="block text-sm text-[#7A7369] mb-2">
                  {dictionary.contact.form.name}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  maxLength={100}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#7A7369] mb-2">
                    {dictionary.contact.form.email}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    maxLength={100}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#7A7369] mb-2">
                    {dictionary.contact.form.phone}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    maxLength={30}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#7A7369] mb-2">
                  {dictionary.contact.form.country}
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className={`${inputClass} appearance-none cursor-pointer text-[#1A2530]`}
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%237A7369' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                >
                  <option value="">—</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#7A7369] mb-2">
                  {dictionary.contact.form.message}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  maxLength={5000}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#A14A32] hover:bg-[#8B3F2A] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 font-medium transition-colors"
              >
                {isSubmitting ? dictionary.contact.form.sending : dictionary.contact.form.send}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
