import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import NavBar from "../NavBar";
import zh from "@/messages/zh.json";

// Mock next-intl navigation hooks
vi.mock("next-intl/navigation", () => ({
  useLocale: () => "zh",
  usePathname: () => "/zh",
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => "/zh",
}));

describe("NavBar", () => {
  it("renders site title and panorama link", () => {
    render(
      <NextIntlClientProvider locale="zh" messages={zh}>
        <NavBar />
      </NextIntlClientProvider>
    );
    expect(screen.getByText("太极图 × 现代科学")).toBeDefined();
    expect(screen.getByText("全景地图")).toBeDefined();
  });
});
