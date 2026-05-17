"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  defaultMessages,
  lifeTags,
  methodCards,
  navItems,
  archivedPapers,
  featuredPapers,
  projects,
  skills,
  socialLinks,
  type GuestbookMessage,
  type ProjectCard,
} from "./content";

const ease = [0.22, 1, 0.36, 1] as const;
const guestbookStorageKey = "mxy-guestbook";
const maxGuestbookMessages = 6;
const projectFilters = ["全部", "已发布", "AI", "研究", "前端", "建模"] as const;

type ProjectFilter = (typeof projectFilters)[number];

type PaletteItem = {
  label: string;
  hint: string;
  href: string;
  external?: boolean;
};

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {desc ? <p className="section-desc">{desc}</p> : null}
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.68, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.04-.02-1.9-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.31 9.31 0 0 1 12 6.92c.85 0 1.7.12 2.5.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.09 10.09 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0);
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return <span className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />;
}

function SignalPanel() {
  const lines = [
    "loss = signal - noise",
    "clean code > stable system",
    "music ≈ structure + emotion",
    "idea -> code -> reality",
  ];

  const signalTags = ["AI", "Front-end", "XRF", "CV", "Music"];

  return (
    <motion.aside
      className="signal-panel glass-card"
      aria-label="个人关键词面板"
      initial={{ opacity: 0, y: 20, rotate: 0.8 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.82, ease, delay: 0.18 }}
    >
      <div className="window-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="panel-orbit" aria-hidden="true">
        <span className="orbit-ring orbit-ring-a" />
        <span className="orbit-ring orbit-ring-b" />
        <span className="orbit-core">MXY</span>
        {signalTags.map((tag, index) => <span className={`orbit-chip orbit-chip-${index + 1}`} key={tag}>{tag}</span>)}
      </div>

      <a
        className="feature-link-card"
        href="/xyy-defense-training"
        target="_blank"
        rel="noreferrer"
        aria-label="打开星雨云答辩训练台"
      >
        <span>Featured</span>
        <strong>星雨云答辩训练台</strong>
        <em>答辩场景 · 训练流程 · 即开即用</em>
        <ArrowIcon />
      </a>

      <div className="formula-list" aria-label="个人关键词公式">
        {lines.map((line, index) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.48, ease, delay: 0.38 + index * 0.08 }}
          >
            <span>0{index + 1}</span>
            <code>{line}</code>
          </motion.p>
        ))}
      </div>

      <span className="panel-glow panel-glow-a" aria-hidden="true" />
      <span className="panel-glow panel-glow-b" aria-hidden="true" />
    </motion.aside>
  );
}

function isGuestbookMessage(value: unknown): value is GuestbookMessage {
  if (!value || typeof value !== "object") return false;
  const candidate = value as GuestbookMessage;
  return [candidate.id, candidate.name, candidate.topic, candidate.content, candidate.time].every((item) => typeof item === "string");
}

function readStoredMessages() {
  const stored = window.localStorage.getItem(guestbookStorageKey);
  if (!stored) return defaultMessages;

  try {
    const parsed = JSON.parse(stored) as unknown;
    if (Array.isArray(parsed) && parsed.every(isGuestbookMessage)) {
      return parsed.slice(0, maxGuestbookMessages);
    }
  } catch {
    window.localStorage.removeItem(guestbookStorageKey);
  }

  return defaultMessages;
}

function PaperLinks({ paper }: { paper: { title: string; links: { label: string; href: string }[] } }) {
  if (paper.links.length === 0) return null;

  return (
    <div className="paper-links" aria-label={`${paper.title}相关链接`}>
      {paper.links.map((link) => (
        <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
          {link.label} <ArrowIcon />
        </a>
      ))}
    </div>
  );
}

function PaperArchive() {
  const [showArchive, setShowArchive] = useState(false);
  const visibleArchivePapers = showArchive ? archivedPapers : archivedPapers.slice(0, 3);

  return (
    <div className="paper-archive">
      <div className="paper-featured-grid" aria-label="重点论文">
        {featuredPapers.map((paper, index) => (
          <Reveal delay={index * 0.06} key={paper.title}>
            <article className="glass-card paper-card paper-featured-card">
              <div className="paper-meta">
                <span>{paper.code}</span>
                <span>{paper.year}</span>
              </div>
              <h3>{paper.title}</h3>
              <p className="paper-venue">{paper.venue}</p>
              <p className="paper-authors">{paper.authors}</p>
              <p>{paper.desc}</p>
              <div className="paper-keywords" aria-label={`${paper.title}关键词`}>
                {paper.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
              </div>
              <PaperLinks paper={paper} />
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <div className="glass-card paper-compact-panel">
          <div className="paper-compact-head">
            <div>
              <p className="eyebrow">ARCHIVE</p>
              <h3>其他论文</h3>
              <span>{archivedPapers.length} 篇已收录，默认缩略展示。</span>
            </div>
            <button
              type="button"
              className="paper-expand-button"
              aria-expanded={showArchive}
              aria-controls="paper-archive-list"
              onClick={() => setShowArchive((current) => !current)}
            >
              {showArchive ? "收起其他论文" : `展开其他论文（${archivedPapers.length}）`}
            </button>
          </div>

          <div id="paper-archive-list" className="paper-compact-list">
            {visibleArchivePapers.map((paper) => (
              <article className="paper-compact-card" key={paper.title}>
                <div>
                  <span>{paper.code}</span>
                  <strong>{paper.title}</strong>
                  <small>{paper.authors}</small>
                </div>
                <p>{paper.venue} · {paper.year}</p>
                {showArchive ? (
                  <>
                    <p className="paper-compact-desc">{paper.desc}</p>
                    <PaperLinks paper={paper} />
                  </>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function Guestbook() {
  const [messages, setMessages] = useState<GuestbookMessage[]>(defaultMessages);
  const [contentLength, setContentLength] = useState(0);
  const [status, setStatus] = useState("等待输入留言");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMessages(readStoredMessages());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContentLength(event.currentTarget.value.length);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "匿名访客").trim() || "匿名访客";
    const topic = String(data.get("topic") || "随便聊聊").trim() || "随便聊聊";
    const content = String(data.get("content") || "").trim();

    if (!content) {
      setStatus("留言内容不能为空");
      return;
    }

    const nextMessages = [
      {
        id: `${Date.now()}`,
        name,
        topic,
        content,
        time: new Intl.DateTimeFormat("zh-CN", {
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      },
      ...messages,
    ].slice(0, maxGuestbookMessages);

    setMessages(nextMessages);
    window.localStorage.setItem(guestbookStorageKey, JSON.stringify(nextMessages));
    setStatus("留言已记录");
    setContentLength(0);
    form.reset();
  }

  return (
    <div className="guestbook-grid">
      <form className="glass-card message-form" onSubmit={handleSubmit} aria-describedby="guestbook-note guestbook-status">
        <div className="field-row">
          <label>
            <span>昵称</span>
            <input name="name" placeholder="怎么称呼你" maxLength={18} autoComplete="name" />
          </label>
          <label>
            <span>主题</span>
            <select name="topic" defaultValue="技术交流">
              <option>技术交流</option>
              <option>项目合作</option>
              <option>数学建模</option>
              <option>音乐与生活</option>
              <option>随便聊聊</option>
            </select>
          </label>
        </div>
        <label>
          <span>留言</span>
          <textarea name="content" placeholder="写下你的问题、想法或合作方向。" maxLength={220} required onChange={handleContentChange} />
        </label>
        <div className="form-meta">
          <p id="guestbook-status" role="status" aria-live="polite">{status}</p>
          <span>{contentLength}/220</span>
        </div>
        <div className="form-footer">
          <p id="guestbook-note">写下问题、想法或合作方向。</p>
          <button type="submit">留下信息</button>
        </div>
      </form>

      <div className="message-list" aria-live="polite" aria-label="留言列表">
        {messages.map((message) => (
          <motion.article
            layout
            className="glass-card message-card"
            key={message.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <div>
              <strong>{message.name}</strong>
              <span>{message.time}</span>
            </div>
            <p>{message.content}</p>
            <small>{message.topic}</small>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function projectMatchesFilter(project: ProjectCard, filter: ProjectFilter) {
  if (filter === "全部") return true;
  const text = [project.title, project.type, project.status, project.desc, ...project.focus, ...project.stack].join(" ").toLowerCase();
  const filterMap: Record<Exclude<ProjectFilter, "全部">, string[]> = {
    已发布: ["已发布"],
    AI: ["ai", "llm", "agent", "machine learning", "模型"],
    研究: ["research", "实验", "研究", "论文", "evaluation"],
    前端: ["frontend", "前端", "next.js", "react", "typescript", "ui"],
    建模: ["modeling", "optimization", "建模", "优化", "simulation"],
  };

  return filterMap[filter].some((keyword) => text.includes(keyword.toLowerCase()));
}

function ProjectShowcase() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("全部");
  const visibleProjects = projects.filter((project) => projectMatchesFilter(project, activeFilter));

  return (
    <div className="project-showcase">
      <div className="project-filter-row" aria-label="项目筛选">
        {projectFilters.map((filter) => (
          <button
            type="button"
            key={filter}
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div className="project-grid" layout>
        {visibleProjects.map((project, index) => (
          <Reveal delay={index * 0.05} key={project.title}>
            <motion.article className="glass-card project-card" layout whileHover={{ y: -8 }} transition={{ duration: 0.22, ease }}>
              <div className="project-topline">
                <span>{project.code}</span>
                <small>{project.type}</small>
              </div>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <div className="project-status">
                <span>{project.status}</span>
                <span>{project.evidence}</span>
              </div>
              <div className="focus-list" aria-label={`${project.title}重点`}>
                {project.focus.map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="stack-list" aria-label={`${project.title}技术栈`}>
                {project.stack.map((item) => <code key={item}>{item}</code>)}
              </div>
              <div className="project-result">
                <strong>展示重点</strong>
                <p>{project.result}</p>
              </div>
              {project.links.length > 0 ? (
                <div className="project-links" aria-label={`${project.title}相关链接`}>
                  {project.links.map((link) => (
                    <a
                      href={link.href}
                      key={`${project.title}-${link.label}`}
                      target={link.href.startsWith("#") ? undefined : "_blank"}
                      rel={link.href.startsWith("#") ? undefined : "noreferrer"}
                    >
                      {link.label} <ArrowIcon />
                    </a>
                  ))}
                </div>
              ) : null}
            </motion.article>
          </Reveal>
        ))}
      </motion.div>
    </div>
  );
}

function CommandPalette({ items }: { items: PaletteItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }

      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredItems = items.filter((item) => {
    const haystack = `${item.label} ${item.hint}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  function visit(item: PaletteItem) {
    setOpen(false);
    setQuery("");
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.hash = item.href.replace(/^#/, "");
  }

  return (
    <>
      <button type="button" className="palette-trigger" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>
        <SearchIcon />
        <span>快速跳转</span>
        <kbd>⌘K</kbd>
      </button>

      {open ? (
        <motion.div className="palette-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="command-palette glass-card"
            role="dialog"
            aria-modal="true"
            aria-label="快速跳转"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.22, ease }}
          >
            <div className="palette-search">
              <SearchIcon />
              <input autoFocus value={query} placeholder="搜索章节、项目或联系方式" onChange={(event) => setQuery(event.currentTarget.value)} />
              <button type="button" onClick={() => setOpen(false)}>关闭</button>
            </div>
            <div className="palette-results">
              {filteredItems.map((item) => (
                <button type="button" key={`${item.label}-${item.href}`} onClick={() => visit(item)}>
                  <span>{item.label}</span>
                  <small>{item.hint}</small>
                </button>
              ))}
              {filteredItems.length === 0 ? <p>没有匹配项。</p> : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </>
  );
}

function SectionRail({ activeId }: { activeId: string }) {
  return (
    <aside className="section-rail" aria-label="页面章节进度">
      {navItems.map((item) => {
        const id = item.href.replace("#", "");
        return (
          <a href={item.href} key={item.href} aria-label={item.label} aria-current={activeId === id ? "true" : undefined}>
            <span />
          </a>
        );
      })}
    </aside>
  );
}

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [activeId, setActiveId] = useState(navItems[0].href.replace("#", ""));
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });

  const paletteItems = useMemo<PaletteItem[]>(() => [
    ...navItems.map((item) => ({ label: item.label, hint: "页面章节", href: item.href })),
    { label: "星雨云答辩训练台", hint: "答辩训练入口", href: "/xyy-defense-training", external: true },
    { label: "GitHub", hint: "代码与项目", href: socialLinks[0].href, external: true },
    { label: "邮件", hint: "mxyppusc@foxmail.com", href: "mailto:mxyppusc@foxmail.com", external: true },
  ], []);

  useEffect(() => {
    const targets = navItems
      .map((item) => document.querySelector(item.href))
      .filter((target): target is Element => target !== null);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveId(visible.target.id);
    }, { rootMargin: "-35% 0px -55% 0px", threshold: [0.08, 0.2, 0.42] });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    setSpotlight({ x: event.clientX, y: event.clientY });
  }

  return (
    <main id="main-content" onPointerMove={handlePointerMove}>
      <ScrollProgress />
      <div
        className="site-spotlight"
        style={{ "--spotlight-x": `${spotlight.x}px`, "--spotlight-y": `${spotlight.y}px` } as CSSProperties}
        aria-hidden="true"
      />
      <SectionRail activeId={activeId} />

      <div className="site-shell">
        <motion.nav
          className="top-nav glass-card"
          aria-label="主导航"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <a className="brand" href="#top" aria-label="回到顶部">
            <span>MXY</span>
            <em>Logic · Code · Sound</em>
          </a>
          <div className="nav-links">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              return (
                <a href={item.href} key={item.href} aria-current={activeId === id ? "page" : undefined}>{item.label}</a>
              );
            })}
          </div>
          <CommandPalette items={paletteItems} />
        </motion.nav>

        <section id="top" className="hero-section">
          <div className="hero-copy">
            <motion.div
              className="profile-line"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <Image src="/avatar.jpg" alt="马星煜头像" width={88} height={88} priority />
              <div>
                <p>马星煜</p>
                <span>AI Developer / Frontend Developer</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.76, ease, delay: 0.08 }}
            >
              用代码把想法落地
            </motion.h1>

            <motion.p
              className="hero-desc"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.76, ease, delay: 0.16 }}
            >
              我是马星煜，一名在读研究生。技术上主攻前端开发与 AI 开发，也关注数学建模、机器视觉与音乐制作。这里记录项目、论文、方法和一些真实可聊的兴趣。
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.76, ease, delay: 0.24 }}
            >
              <a className="primary-button" href="#projects">
                查看项目 <ArrowIcon />
              </a>
              <a className="secondary-button" href="mailto:mxyppusc@foxmail.com">
                发邮件交流
              </a>
              <a className="github-button" href={socialLinks[0].href} target="_blank" rel="noreferrer" aria-label="打开马星煜的 GitHub 主页">
                <GitHubIcon />
                GitHub
              </a>
            </motion.div>

            <motion.div
              className="metric-row"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.76, ease, delay: 0.32 }}
            >
              <div><strong>05</strong><span>核心方向</span></div>
              <div><strong>{String(projects.length).padStart(2, "0")}</strong><span>项目方向</span></div>
              <div><strong>{String(featuredPapers.length + archivedPapers.length).padStart(2, "0")}</strong><span>论文记录</span></div>
            </motion.div>
          </div>
          <SignalPanel />
        </section>

        <section id="about" className="content-section about-grid">
          <Reveal>
            <SectionTitle
              eyebrow="ABOUT"
              title="星河有迹可循"
              desc="数学、代码、模型、声音和生活爱好共同构成这个主页的内容骨架。"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="glass-card about-card">
              <p>
                一位在读研究生，深度数学爱好者，喜欢用公式和逻辑去理解世界的底牌。技术上主攻前端开发与 AI 开发，习惯把代码写干净，也热衷让模型变聪明。
              </p>
              <p>
                爱喝茶，盘串，音乐发烧友，公路车，摩托车，钓鱼。欢迎技术问题、项目想法、音乐与生活方式相关的交流。
              </p>
              <div className="life-tags" aria-label="个人兴趣标签">
                {lifeTags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </Reveal>
        </section>

        <section id="skills" className="content-section">
          <Reveal>
            <SectionTitle
              eyebrow="CAPABILITY"
              title="能力矩阵"
              desc="把研究、工程、界面和审美放在同一条表达线索里。"
            />
          </Reveal>
          <div className="skill-grid">
            {skills.map((skill, index) => (
              <Reveal delay={index * 0.05} key={skill.title}>
                <article className="glass-card skill-card">
                  <div className="card-index">0{index + 1}</div>
                  <h3>{skill.title}</h3>
                  <p>{skill.desc}</p>
                  <div aria-label={`${skill.title}关键词`}>
                    {skill.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" className="content-section">
          <Reveal>
            <SectionTitle
              eyebrow="PROJECTS"
              title="项目展示"
              desc="保留原有项目内容，用更清晰的筛选、状态和证据层级呈现。"
            />
          </Reveal>
          <ProjectShowcase />
        </section>

        <section id="papers" className="content-section papers-section">
          <Reveal>
            <SectionTitle
              eyebrow="PAPERS"
              title="我的论文"
              desc="研究不只停在代码里，也落在可追溯的文字和实验记录中。"
            />
          </Reveal>
          <PaperArchive />
        </section>

        <section id="method" className="content-section method-section">
          <Reveal>
            <SectionTitle
              eyebrow="METHOD"
              title="做事方式"
              desc="先看清问题，再搭建结构，最后用反馈修正。"
            />
          </Reveal>
          <div className="method-grid">
            {methodCards.map((item, index) => (
              <Reveal delay={index * 0.06} key={item.title}>
                <article className="glass-card method-card">
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <code>{item.formula}</code>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="content-section quote-band" aria-label="个人表达">
          <Reveal>
            <div className="glass-card quote-card">
              <p>一点勇气 一点耐心 一点毅力</p>
              <span>Formula · Interface · Intelligence · Sound</span>
            </div>
          </Reveal>
        </section>

        <section id="guestbook" className="content-section">
          <Reveal>
            <SectionTitle
              eyebrow="GUESTBOOK"
              title="留言板"
              desc="留下问题、想法或合作意向。"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Guestbook />
          </Reveal>
        </section>

        <section id="contact" className="content-section contact-section">
          <Reveal>
            <div className="glass-card contact-card">
              <div>
                <p className="eyebrow">CONTACT</p>
                <h2>欢迎交流提问。</h2>
                <p>技术、建模、AI、前端、音乐制作，或者单纯聊茶、车、钓鱼，都可以。</p>
              </div>
              <div className="contact-links" aria-label="联系方式">
                <a className="contact-link-github" href={socialLinks[0].href} target="_blank" rel="noreferrer" aria-label="访问马星煜的 GitHub">
                  <GitHubIcon />
                  <span>github.com/xingyu8999</span>
                  <ArrowIcon />
                </a>
                <a href="mailto:mxyppusc@foxmail.com">mxyppusc@foxmail.com <ArrowIcon /></a>
                <a href="mailto:xingyu8999@gmail.com">xingyu8999@gmail.com <ArrowIcon /></a>
              </div>
            </div>
          </Reveal>
        </section>

        <footer className="site-footer">
          <span>© {year} 马星煜</span>
          <span>Personal archive · Research · Code · Sound</span>
        </footer>
      </div>
    </main>
  );
}
