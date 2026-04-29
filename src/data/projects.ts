export interface Project {
  id: number;
  name: string;
  slug: string;
  description_en: string;
  description_es: string;
  image: string;
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
    image: "https://images.pexels.com/photos/13201411/pexels-photo-13201411.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    externalLink: "https://amate9palms.com/en/",
    order: 1,
  },
  {
    id: 2,
    name: "Punta Perfecta",
    slug: "punta-perfecta",
    description_en: "Oceanfront Estate",
    description_es: "Propiedad Frente al Mar",
    image: "https://images.unsplash.com/photo-1772657290984-b6f3f0da51e8?crop=entropy&cs=srgb&fm=jpg&q=85",
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
    externalLink: null,
    order: 3,
  },
  {
    id: 4,
    name: "El Cielo",
    slug: "el-cielo",
    description_en: "Private Residence",
    description_es: "Residencia Privada",
    image: "https://images.unsplash.com/photo-1521750465-672a0f580901?crop=entropy&cs=srgb&fm=jpg&q=85",
    externalLink: null,
    order: 4,
  },
  {
    id: 5,
    name: "Rosewood La Mandarina",
    slug: "rosewood-la-mandarina",
    description_en: "Luxury Hospitality",
    description_es: "Hospitalidad de Lujo",
    image: "https://images.pexels.com/photos/12848727/pexels-photo-12848727.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    externalLink: null,
    order: 5,
  },
];
