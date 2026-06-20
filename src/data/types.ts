export interface LocaleString {
  zh: string;
  en: string;
}

export interface DomainContent {
  slug: string;
  order: number;
  icon: string;
  title: LocaleString;
  tagline: LocaleString;
  overview: LocaleString;
  taijiConnections: {
    point: LocaleString;
    diagram?: string;
  }[];
  keyExamples: {
    title: LocaleString;
    description: LocaleString;
  }[];
  taijiComparison: {
    taijiAspect: LocaleString;
    scienceAspect: LocaleString;
  }[];
  references: {
    title: string;
    url: string;
    type: "wikipedia" | "article" | "video" | "paper";
  }[];
  color: string;
}

export interface PanoramaNode {
  id: string;
  name: LocaleString;
  description: LocaleString;
  category: string;
  x?: number;
  y?: number;
  z?: number;
  connections: string[];
  isCore: boolean;
  coreSlug?: string;
  externalLink?: string;
}

export function getDomainBySlug(
  domains: DomainContent[],
  slug: string
): DomainContent | undefined {
  return domains.find((d) => d.slug === slug);
}
