'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/data/projects';
import { Locale } from '@/lib/i18n';

interface ProjectGalleryProps {
  project: Project;
  locale: Locale;
  onClose: () => void;
}

export default function ProjectGallery({ project, locale, onClose }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % project.gallery.length);
  }, [project.gallery.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
  }, [project.gallery.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, next, prev]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#1A2530]/95 backdrop-blur-sm" />

        {/* Content */}
        <div
          className="relative z-10 w-full max-w-5xl mx-4 md:mx-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading text-2xl md:text-3xl text-white font-medium">
                {project.name}
              </h3>
              <p className="text-[#A3B19B] text-sm mt-1">
                {locale === 'es' ? project.description_es : project.description_en}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image */}
          <div className="relative aspect-[16/10] bg-[#2D3A47] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={project.gallery[currentIndex]}
                alt={`${project.name} ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Navigation Arrows */}
            {project.gallery.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 right-4 bg-black/50 text-white/90 text-xs px-3 py-1.5 rounded-full">
              {currentIndex + 1} / {project.gallery.length}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {project.gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden transition-all duration-200 ${
                  i === currentIndex
                    ? 'ring-2 ring-[#A14A32] opacity-100'
                    : 'opacity-50 hover:opacity-80'
                }`}
              >
                <img
                  src={src}
                  alt={`${project.name} thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
