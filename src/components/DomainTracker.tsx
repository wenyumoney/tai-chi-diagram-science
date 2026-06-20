"use client";

import { useEffect } from "react";
import { markDomainVisited } from "@/lib/progress-store";

export default function DomainTracker({ slug }: { slug: string }) {
  useEffect(() => {
    markDomainVisited(slug);
  }, [slug]);

  return null;
}
