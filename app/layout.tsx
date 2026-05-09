import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "马星煜｜AI 开发 · 前端开发 · 数学建模",
  description: "马星煜的个人主页：AI 开发、前端开发、数学建模、机器视觉与音乐制作。",
  keywords: ["马星煜", "AI 开发", "前端开发", "数学建模", "机器视觉", "音乐制作"],
  authors: [{ name: "马星煜" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ea" },
    { media: "(prefers-color-scheme: dark)", color: "#101514" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">跳过导航，进入主要内容</a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
