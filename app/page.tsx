"use client";

import { motion } from "framer-motion";

// 根据标题返回对应的极简线性图标（SVG 线条，1.5px 粗细，currentColor 继承）
const SectionIcon = ({ title }: { title: string }) => {
  const iconMap: Record<string, React.JSX.Element> = {
    "关于我": (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M12 14c-5 0-8 3-8 5h16c0-2-3-5-8-5z" />
      </svg>
    ),
    "项目": (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="8" height="8" rx="1" />
        <rect x="14" y="3" width="8" height="8" rx="1" />
        <rect x="2" y="14" width="8" height="8" rx="1" />
        <rect x="14" y="14" width="8" height="8" rx="1" />
      </svg>
    ),
    "联系方式": (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 6 10-6" />
        <line x1="12" y1="13" x2="12" y2="21" />
      </svg>
    ),
  };
  return iconMap[title] || (
    // 默认回退图标：一个小圆点前缀
    <span className="inline-block w-[6px] h-[6px] rounded-full bg-breath mr-2" />
  );
};

// 区块包装组件：控制入场动画和级联延迟
const Section = ({
  title,
  delay = 0,
  children,
}: {
  title: string;
  delay?: number;
  children: React.ReactNode;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 6 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
      delay: delay,
    }}
    className="mb-12"
  >
    <div className="flex items-center gap-2 mb-3">
      <span className="text-ink-light">
        <SectionIcon title={title} />
      </span>
      <h2 className="text-xl font-semibold text-ink tracking-normal">
        {title}
      </h2>
    </div>
    <div className="border-t border-divider mb-6" />
    {children}
  </motion.section>
);

// 具有优雅下划线展开的链接组件
const LinkUnderline = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="relative inline-block text-ink transition-colors duration-200 ease-spring hover:text-breath"
    whileHover="hover"
  >
    {children}
    <motion.span
      className="absolute left-0 bottom-0 h-[1px] bg-breath"
      variants={{
        hover: { width: "100%" },
        initial: { width: "0%" },
      }}
      initial="initial"
      animate="initial"
      whileHover="hover"
      transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
    />
  </motion.a>
);

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      className="max-w-prose mx-auto px-6 py-16 md:py-20"
    >
      {/* 头部：姓名 + 身份 */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
      >
        <img
          src="/avatar.jpg"
          alt="马星煜"
          className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mx-auto mb-4 border border-divider shadow-sm"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        />
        <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight leading-tight text-ink">
          马星煜
        </h1>
        <p className="text-ink-light mt-3 text-sm md:text-base">
          前端开发 · AI 开发 · 独立音乐制作人 · 在读研究生 · 数学爱好者
        </p>
      </motion.div>

      {/* 关于我 */}
      <Section title="关于我" delay={0}>
        <p className="text-ink/90 leading-relaxed whitespace-pre-line">
          Hi，我是马星煜。{"\n"}
          一位在读研究生，深度数学爱好者，喜欢用公式和逻辑去理解世界的底牌。{"\n"}
          技术上主攻前端开发与 AI 开发，习惯把代码写干净，也热衷让模型变聪明。{"\n"}
          爱喝茶，盘串，音乐发烧友，公路车，摩托车，钓鱼……欢迎大家交流提问。
        </p>
      </Section>

      {/* 项目 */}
      <Section title="项目" delay={0.08}>
        <p className="text-ink-light italic">
          暂无项目，正在蓄力中。
        </p>
      </Section>

      {/* 联系方式 */}
      <Section title="联系方式" delay={0.16}>
        <ul className="space-y-2 text-ink-light">
          <li className="flex items-center gap-2">
            <span className="text-ink">📧</span>
            <LinkUnderline href="mailto:mxyppusc@foxmail.com">
              mxyppusc@foxmail.com
            </LinkUnderline>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-ink">📧</span>
            <LinkUnderline href="mailto:xingyu8999@gmail.com">
              xingyu8999@gmail.com
            </LinkUnderline>
          </li>
        </ul>
      </Section>

      {/* 页脚 */}
      <footer className="text-center text-ink-light text-sm mt-16 pt-8 border-t border-divider">
        <p>© 2026 马星煜</p>
      </footer>
    </motion.main>
  );
}