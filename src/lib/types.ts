export interface JourneyStep {
  id: string;
  type: "brief" | "framework" | "design" | "feedback" | "final" | "production" | "shelf";
  title: string;
  title_bn?: string;
  date?: string;
  endDate?: string;
  image: string;
  imageAlt?: string;
  description: string;
  description_bn?: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

export interface DielineSpecs {
  type?: string;
  typeBn?: string;
  dimensions?: string;
  dimensionsBn?: string;
  material?: string;
  materialBn?: string;
  printProcess?: string;
  printProcessBn?: string;
  specialFinishing?: string;
  specialFinishingBn?: string;
}

export interface ProjectLocalization {
  title: string;
  client: string;
  summary: string;
  role: string;
  tools: string;
  brief?: string;
  problem?: string;
  thinking?: string;
  direction?: string;
  solution?: string;
  production?: string;
  mockup?: string;
  feedback?: string;
  result?: string;
}

export interface Project {
  id: string;
  featured: boolean;
  published: boolean;
  demo?: boolean;
  year: string;
  category: string;
  marketStatus?: string;
  originType?: "local" | "export";
  countryFlag?: string;
  targetMarket?: string;
  targetMarketBn?: string;
  exportRegion?: string;
  thumbnail: string;
  coverImage: string;
  gallery: string[];
  dielineSpecs?: DielineSpecs;
  en: ProjectLocalization;
  bn: ProjectLocalization;
  journey: {
    en: JourneyStep[];
    bn: JourneyStep[];
  };
}

export interface SiteProfile {
  name: string;
  shortName: string;
  role: string;
  specialty: string;
  heroKicker: string;
  heroTitle: string;
  heroBody: string;
  availability: string;
  heroPrimary: string;
  heroSecondary: string;
  workTitle: string;
  workIntro: string;
  aboutTitle: string;
  aboutBody: string;
  aboutBody2: string;
  skills: string[];
  stats: { value: string; label: string }[];
  processTitle: string;
  processIntro: string;
  process: [string, string, string][];
  experienceTitle: string;
  experienceCompany: string;
  experienceRole: string;
  experienceBody: string;
  educationTitle: string;
  educationDegree: string;
  educationSchool: string;
  educationBody: string;
  contactTitle: string;
  contactBody: string;
  email: string;
  phone?: string;
  location: string;
  resume: string;
  avatar?: string;
  social: {
    linkedin: string;
    behance: string;
    whatsapp: string;
    instagram?: string;
  };
}

export interface SiteData {
  en: SiteProfile;
  bn: SiteProfile;
}

export interface BrandRecommendation {
  id: string;
  name: string;
  nameBn?: string;
  parentCompany: string;
  category: string;
  categoryBn: string;
  logo: string;
  featured: boolean;
  order: number;
  manager: {
    name: string;
    nameBn: string;
    designation: string;
    designationBn: string;
    department: string;
    departmentBn: string;
    company: string;
    companyBn: string;
    location: string;
    locationBn: string;
    phone: string;
    email?: string;
    avatar?: string;
  };
  endorsement: {
    en: string;
    bn: string;
  };
  projectHighlight?: {
    en: string;
    bn: string;
  };
  yearWorked?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  titleBn: string;
  category: "press" | "studio" | "market" | "team" | "shoots";
  imageUrl: string;
  thumbnailUrl?: string;
  date: string;
  location: string;
  locationBn: string;
  aspectRatio?: "square" | "landscape" | "portrait";
  description: string;
  descriptionBn: string;
  tags: string[];
  featured?: boolean;
  gearOrProcess?: string;
}
