import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

const animationProps = new Set([
  "initial",
  "animate",
  "whileInView",
  "viewport",
  "transition",
  "layout",
  "whileHover",
  "whileTap",
]);

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => {
    const imgProps = { ...props };
    delete imgProps.priority;

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={alt ?? ""} {...imgProps} />
    );
  },
}));

vi.mock("framer-motion", () => {
  const motion = new Proxy({}, {
    get: (_target, tag: string) => {
      const Component = React.forwardRef<HTMLElement, Record<string, unknown>>(({ children, ...props }, ref) => {
        const cleanProps = Object.fromEntries(Object.entries(props).filter(([key]) => !animationProps.has(key)));
        return React.createElement(tag, { ...cleanProps, ref }, children as React.ReactNode);
      });
      Component.displayName = `motion.${tag}`;
      return Component;
    },
  });

  return { motion };
});
