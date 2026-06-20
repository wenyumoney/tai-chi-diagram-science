"use client";

const STORAGE_KEY = "taiji-science-progress";

interface ProgressData {
  visitedDomains: string[];
  lastVisited: string | null;
}

function readStorage(): ProgressData {
  if (typeof window === "undefined") return { visitedDomains: [], lastVisited: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { visitedDomains: [], lastVisited: null };
    return JSON.parse(raw) as ProgressData;
  } catch {
    return { visitedDomains: [], lastVisited: null };
  }
}

function writeStorage(data: ProgressData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or disabled - silently ignore
  }
}

export function getVisitedDomains(): string[] {
  return readStorage().visitedDomains;
}

export function markDomainVisited(slug: string): void {
  const data = readStorage();
  if (!data.visitedDomains.includes(slug)) {
    data.visitedDomains.push(slug);
  }
  data.lastVisited = slug;
  writeStorage(data);
}

export function getLastVisitedDomain(): string | null {
  return readStorage().lastVisited;
}

export function getProgress(): { visited: number; total: number } {
  const visited = readStorage().visitedDomains.length;
  // 11 domains total (6 core + 5 extended)
  return { visited, total: 11 };
}
