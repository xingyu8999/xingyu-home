import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("app/globals.css", "utf8");
const layout = readFileSync("app/layout.tsx", "utf8");

describe("CSS interaction safety", () => {
  it("supports keyboard users with skip link and visible focus", () => {
    expect(css).toContain(".skip-link");
    expect(css).toContain(":focus-visible");
  });

  it("keeps the theme toggle from covering navigation links", () => {
    expect(css).toContain("right: clamp(10px, 1.2vw, 22px)");
    expect(css).toContain("margin-right: 116px");
    expect(css).toContain("@media (max-width: 1320px)");
  });

  it("uses dark mode as the first-visit default", () => {
    expect(layout).toContain('defaultTheme="dark"');
    expect(layout).toContain("enableSystem={false}");
  });

  it("gives mobile screens a separate navigation and theme-toggle layout", () => {
    expect(css).toContain("Mobile refinement");
    expect(css).toContain("overflow-x: auto");
    expect(css).toContain("bottom: max(18px, env(safe-area-inset-bottom))");
    expect(css).toContain("grid-template-columns: 1fr 1fr");
  });

  it("respects reduced-motion preferences", () => {
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain("animation-duration: 0.01ms");
  });

  it("keeps the paper archive readable and collapsible", () => {
    expect(css).toContain(".paper-featured-grid");
    expect(css).toContain(".paper-compact-panel");
    expect(css).toContain(".paper-expand-button");
  });

  it("keeps the visual system tokenized with CSS variables", () => {
    expect(css).toContain("--color-breath");
    expect(css).toContain("--color-glass");
    expect(css).toContain("backdrop-filter");
  });
});
