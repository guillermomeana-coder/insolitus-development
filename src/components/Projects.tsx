'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { projects, Project } from '@/data/projects';
import { Locale } from '@/lib/i18n';
import ProjectGallery from './ProjectGallery';

interface ProjectsProps {
  locale: Locale;
  dictionary: {
    nav: { projects: string };
    projects: {
      headline: string;
      viewProject: string;
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

const ProjectCard = ({
  project,
  isLarge = false,
  onOpenGallery,
}: {
  project: typeof projects[0];
  locale: Locale;
  viewProjectText: string;
  isLarge?: boolean;
  onOpenGallery?: () => void;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const cardClass = isLarge
    ? 'md:col-span-2 lg:row-span-2'
    : '';

  const innerClass = isLarge
    ? 'h-full min-h-[400px] lg:min-h-full'
    : 'h-[280px]';

  const transform = isHovered
    ? `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * 5}deg) rotateX(${(mousePosition.y - 0.5) * -5}deg)`
    : 'perspective(1000px) rotateY(0deg) rotateX(0deg)';

  const gradientBg = `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.15) 0%, transparent 50%)`;

  const bottomPad = isLarge ? 'p-8' : 'p-6';
  const titleSize = isLarge ? 'text-2xl md:text-3xl' : 'text-xl';

  return (
    <motion.div
      variants={fadeInUp}
      className={`group cursor-pointer ${cardClass}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpenGallery}
    >
      <div
        className={`relative overflow-hidden bg-[#1A2530] ${innerClass}`}
        style={{ transform, transition: 'transform 0.3s ease-out' }}
      >
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: gradientBg }}
        />

        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          style={{ filter: isHovered ? 'brightness(1.1) saturate(1.1)' : 'brightness(0.9)' }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2530] via-[#1A2530]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 30px rgba(161, 74, 50, 0.3)' }}
        />

        <div className={`absolute bottom-0 left-0 right-0 ${bottomPad} transform transition-transform duration-500 group-hover:translate-y-[-8px]`}>
          <h3 className={`font-heading ${titleSize} text-white transition-all duration-300 group-hover:text-[#EBE6DF]`}>
            {project.name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects({ locale, dictionary }: ProjectsProps) {
  const [galleryProject, setGalleryProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="py-24 md:py-32 bg-[#EBE6DF]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16"
          >
            <p className="overline mb-4">{dictionary.nav.projects}</p>
            <h2 className="font-heading text-3xl md:text-4xl text-[#1A2530] font-medium">
              {dictionary.projects.headline}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <ProjectCard
              project={projects[0]}
              locale={locale}
              viewProjectText={dictionary.projects.viewProject}
              isLarge={true}
              onOpenGallery={() => projects[0].gallery.length > 0 && setGalleryProject(projects[0])}
            />
            {projects.slice(1).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                locale={locale}
                viewProjectText={dictionary.projects.viewProject}
                onOpenGallery={() => project.gallery.length > 0 && setGalleryProject(project)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {galleryProject && (
        <ProjectGallery
          project={galleryProject}
          locale={locale}
          onClose={() => setGalleryProject(null)}
        />
      )}
    </>
  );
}
