export interface Project {
  id: number;
  name: string;
  slug: string;
  description_en: string;
  description_es: string;
  image: string;
  gallery: string[];
  externalLink: string | null;
  order: number;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Amate 9 Palms",
    slug: "amate-9-palms",
    description_en: "Luxury Residential Development",
    description_es: "Desarrollo Residencial de Lujo",
    image: "/images/projects/amate-9-palms.jpg",
    gallery: [
      "/images/projects/amate-9-palms.jpg",
      "/images/projects/amate-gallery/01.jpg",
      "/images/projects/amate-gallery/02.jpg",
      "/images/projects/amate-gallery/03.jpg",
      "/images/projects/amate-gallery/04.jpg",
      "/images/projects/amate-gallery/05.jpg",
    ],
    externalLink: "https://amate9palms.com/en/",
    order: 1,
  },
  {
    id: 2,
    name: "Punta Perfecta",
    slug: "punta-perfecta",
    description_en: "Oceanfront Estate",
    description_es: "Propiedad Frente al Mar",
    image: "/images/projects/punta-perfecta.webp",
    gallery: [
      "/images/projects/punta-perfecta.webp",
      "/images/projects/punta-gallery/01.webp",
      "/images/projects/punta-gallery/02.webp",
      "/images/projects/punta-gallery/03.webp",
      "/images/projects/punta-gallery/04.webp",
    ],
    externalLink: null,
    order: 2,
  },
  {
    id: 3,
    name: "Vila 38 O&O",
    slug: "vila-38-oo",
    description_en: "Boutique Villa Project",
    description_es: "Proyecto de Villa Boutique",
    image: "https://images.unsplash.com/photo-1530491396055-5aca4203edbf?crop=entropy&cs=srgb&fm=jpg&q=85",
    gallery: [],
    externalLink: null,
    order: 3,
  },
  {
    id: 4,
    name: "El Cielo",
    slug: "el-cielo",
    description_en: "Retaining Walls",
    description_es: "Muros de Contención",
    image: "/images/projects/el-cielo.jpg",
    gallery: [
      "/images/projects/el-cielo.jpg",
      "/images/projects/cielo-gallery/01.jpg",
      "/images/projects/cielo-gallery/02.jpg",
      "/images/projects/cielo-gallery/03.jpg",
      "/images/projects/cielo-gallery/04.jpg",
    ],
    externalLink: null,
    order: 4,
  },
  {
    id: 5,
    name: "Rosewood La Mandarina",
    slug: "rosewood-la-mandarina",
    description_en: "Luxury Hospitality",
    description_es: "Hospitalidad de Lujo",
    image: "/images/projects/rosewood-la-mandarina.jpg",
    gallery: [
      "/images/projects/rosewood-la-mandarina.jpg",
      "/images/projects/rosewood-gallery/01.jpg",
      "/images/projects/rosewood-gallery/02.jpg",
      "/images/projects/rosewood-gallery/03.jpg",
      "/images/projects/rosewood-gallery/04.jpg",
      "/images/projects/rosewood-gallery/05.jpg",
    ],
    externalLink: null,
    order: 5,
  },
];
