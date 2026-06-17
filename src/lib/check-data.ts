import type { DomainContent, LocaleString, PanoramaNode } from "@/data/types";

function checkLocaleString(
  obj: LocaleString,
  path: string,
  errors: string[]
): void {
  if (!obj.zh || obj.zh.trim().length === 0) {
    errors.push(`${path}: empty zh field`);
  }
  if (!obj.en || obj.en.trim().length === 0) {
    errors.push(`${path}: empty en field`);
  }
}

export function validateDomains(domains: DomainContent[]): void {
  const errors: string[] = [];

  if (domains.length < 6) {
    throw new Error(`Expected at least 6 domains, got ${domains.length}`);
  }

  const slugs = new Set<string>();
  const orders = new Set<number>();

  for (const domain of domains) {
    if (slugs.has(domain.slug)) {
      errors.push(`Duplicate slug: ${domain.slug}`);
    }
    slugs.add(domain.slug);

    if (orders.has(domain.order)) {
      errors.push(`Duplicate order: ${domain.order}`);
    }
    orders.add(domain.order);

    const prefix = `domains.${domain.slug}`;

    // Check all LocaleString fields
    checkLocaleString(domain.title, `${prefix}.title`, errors);
    checkLocaleString(domain.tagline, `${prefix}.tagline`, errors);
    checkLocaleString(domain.overview, `${prefix}.overview`, errors);

    for (let i = 0; i < domain.taijiConnections.length; i++) {
      checkLocaleString(
        domain.taijiConnections[i].point,
        `${prefix}.taijiConnections[${i}].point`,
        errors
      );
    }

    for (let i = 0; i < domain.keyExamples.length; i++) {
      checkLocaleString(
        domain.keyExamples[i].title,
        `${prefix}.keyExamples[${i}].title`,
        errors
      );
      checkLocaleString(
        domain.keyExamples[i].description,
        `${prefix}.keyExamples[${i}].description`,
        errors
      );
    }

    for (let i = 0; i < domain.taijiComparison.length; i++) {
      checkLocaleString(
        domain.taijiComparison[i].taijiAspect,
        `${prefix}.taijiComparison[${i}].taijiAspect`,
        errors
      );
      checkLocaleString(
        domain.taijiComparison[i].scienceAspect,
        `${prefix}.taijiComparison[${i}].scienceAspect`,
        errors
      );
    }

    for (let i = 0; i < domain.references.length; i++) {
      if (!domain.references[i].title.trim()) {
        errors.push(`${prefix}.references[${i}]: empty title`);
      }
      if (!domain.references[i].url.trim()) {
        errors.push(`${prefix}.references[${i}]: empty url`);
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
}

export function validatePanoramaNodes(nodes: PanoramaNode[]): void {
  const errors: string[] = [];
  const ids = new Set(nodes.map((n) => n.id));

  for (const node of nodes) {
    const prefix = `panorama.${node.id}`;

    for (const conn of node.connections) {
      if (!ids.has(conn)) {
        errors.push(`${prefix}: references non-existent node "${conn}"`);
      }
    }

    checkLocaleString(node.name, `${prefix}.name`, errors);
    checkLocaleString(node.description, `${prefix}.description`, errors);
  }

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
}
