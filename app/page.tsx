"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ChangeEvent,
  CSSProperties,
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  defaultMessages,
  experienceSteps,
  interactionSpecs,
  lifeTags,
  methodCards,
  motionPrinciples,
  navItems,
  archivedPapers,
  featuredPapers,
  projects,
  quickActions,
  skills,
  socialLinks,
  type GuestbookMessage,
  type ProjectCard,
} from "./content";

const ease = [0.22, 1, 0.36, 1] as const;
const guestbookStorageKey = "mxy-guestbook";
const maxGuestbookMessages = 6;
const projectFilterOptions = ["全部", "已发布", "AI", "研究", "前端", "建模"] as const;
type ProjectFilter = (typeof projectFilterOptions)[number];

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {desc ? <p className="section-desc">{desc}</p> : null}
    </div>
  );
}

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72, ease, delay }}
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

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const actions = useMemo(() => [
    ...navItems.map((item) => ({ label: item.label, href: item.href, desc: "跳转到页面章节" })),
    ...quickActions,
  ], []);
  const visibleActions = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return actions;
    return actions.filter((item) => `${item.label} ${item.desc}`.toLowerCase().includes(needle));
  }, [actions, query]);

  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="command-overlay"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className="command-panel glass-card"
            role="dialog"
            aria-modal="true"
            aria-label="快速跳转面板"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.24, ease }}
          >
            <div className="command-head">
              <span>Command Center</span>
              <button type="button" onClick={onClose} aria-label="关闭快速跳转">Esc</button>
            </div>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="搜索章节、项目、联系方式..."
              aria-label="搜索快速跳转项目"
            />
            <div className="command-list">
              {visibleActions.map((item) => (
                <a href={item.href} key={`${item.label}-${item.href}`} onClick={onClose}>
                  <strong>{item.label}</strong>
                  <span>{item.desc}</span>
                  <ArrowIcon />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function FormulaPanel() {
  const lines = [
    "loss = signal - noise",
    "clean code > stable system",
    "music ≈ structure + emotion",
    "idea -> code -> reality",
  ];
  const nodes = ["AI", "UI", "CV", "Math", "Sound"];

  return (
    <motion.aside
      className="formula-panel glass-card hero-visual"
      aria-label="个人关键词公式面板"
      initial={{ opacity: 0, y: 18, rotate: 0.6 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.85, ease, delay: 0.18 }}
    >
      <div className="hero-visual-head">
        <div className="window-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>live interface</span>
      </div>

      <div className="orbit-system" aria-hidden="true">
        <div className="orbit-core">MXY</div>
        {nodes.map((node, index) => (
          <span className={`orbit-node orbit-node-${index + 1}`} key={node}>{node}</span>
        ))}
      </div>

      <div className="signal-card">
        <span>当前信号</span>
        <strong>Research × Code × Motion</strong>
        <p>把论文、项目、工具和生活质感统一到一个可浏览的系统里。</p>
      </div>

      <div className="formula-grid">
        <motion.a
          className="formula-entry"
          href="/xyy-defense-training"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.36 }}
          aria-label="打开星雨云答辩训练台"
        >
          <span aria-hidden="true">01</span>
          <strong>星雨云答辩训练台</strong>
          <em>点击打开</em>
          <ArrowIcon />
        </motion.a>
        {lines.map((line, index) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.46 + index * 0.1 }}
          >
            <span aria-hidden="true">0{index + 2}</span>
            {line}
          </motion.p>
        ))}
      </div>
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />
    </motion.aside>
  );
}

function isGuestbookMessage(value: unknown): value is GuestbookMessage {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<GuestbookMessage>;
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

function projectMatchesFilter(project: ProjectCard, filter: ProjectFilter) {
  if (filter === "全部") return true;
  if (filter === "已发布") return project.status.includes("发布");
  if (filter === "AI") return `${project.title}${project.type}${project.stack.join("")}`.toLowerCase().includes("ai") || project.title.includes("AI");
  if (filter === "研究") return project.type.includes("Research") || project.title.includes("视觉") || project.title.includes("机器学习");
  if (filter === "前端") return project.type.includes("Frontend") || project.stack.includes("Next.js") || project.stack.includes("React");
  if (filter === "建模") return project.title.includes("建模") || project.type.includes("Modeling");
  return true;
}

function ProjectShowcase() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("全部");
  const visibleProjects = useMemo(() => projects.filter((project) => projectMatchesFilter(project, activeFilter)), [activeFilter]);

  return (
    <>
      <div className="project-toolbar" aria-label="项目筛选">
        {projectFilterOptions.map((option) => (
          <button
            type="button"
            key={option}
            aria-pressed={activeFilter === option}
            onClick={() => setActiveFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {visibleProjects.map((project, index) => (
          <Reveal delay={index * 0.06} key={project.title}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </>
  );
}

function ProjectCard({ project, index }: { project: ProjectCard; index: number }) {
  const cardStyle = { "--project-hue": `${156 + index * 31}` } as CSSProperties;

  return (
    <motion.article
      className="glass-card project-card"
      style={cardStyle}
      whileHover={{ y: -8, rotateX: 1, rotateY: index % 2 === 0 ? -1 : 1 }}
      transition={{ duration: 0.28, ease }}
    >
      <div className="project-topline">
        <span>{project.code}</span>
        <small>{project.type}</small>
      </div>
      <div className="project-card-glow" aria-hidden="true" />
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
  );
}

function InterfaceSystem() {
  return (
    <div className="system-grid">
      <Reveal className="system-map" delay={0.04}>
        <div className="glass-card system-card system-card-large">
          <div className="system-card-head">
            <span>Experience Map</span>
            <small>01 / 04</small>
          </div>
          <div className="experience-steps">
            {experienceSteps.map((step, index) => (
              <article key={step.title}>
                <span>0{index + 1}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="system-specs">
        {interactionSpecs.map((item, index) => (
          <Reveal delay={0.08 + index * 0.05} key={item.title}>
            <motion.article className="glass-card system-card spec-card" whileHover={{ y: -5 }} transition={{ duration: 0.24, ease }}>
              <span>{item.kicker}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function MotionPrinciples() {
  return (
    <div className="motion-lab-grid">
      {motionPrinciples.map((item, index) => (
        <Reveal delay={index * 0.06} key={item.title}>
          <motion.article
            className="glass-card motion-lab-card"
            whileHover={{ y: -6, rotate: index % 2 ? -0.35 : 0.35 }}
            transition={{ duration: 0.28, ease }}
          >
            <span>0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <code>{item.pattern}</code>
          </motion.article>
        </Reveal>
      ))}
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

function FloatingSectionRail({ activeSection }: { activeSection: string }) {
  return (
    <div className="section-rail" aria-label="页面章节进度">
      {navItems.map((item) => {
        const sectionId = item.href.slice(1);
        return (
          <a
            key={item.href}
            href={item.href}
            className={activeSection === sectionId ? "is-active" : undefined}
            aria-label={`跳转到${item.label}`}
          >
            <span>{item.label}</span>
          </a>
        );
      })}
    </div>
  );
}

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });
  const [activeSection, setActiveSection] = useState("top");
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    function handlePointerMove(event: PointerEvent) {
      setSpotlight({ x: event.clientX, y: event.clientY, active: true });
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        setIsCommandOpen((current) => !current);
      }
      if (event.key === "Escape") setIsCommandOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const ids = ["top", ...navItems.map((item) => item.href.slice(1))];
    const sections = ids.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0.12, 0.24, 0.42] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function openCommand(event?: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event && event.key !== "Enter" && event.key !== " ") return;
    setIsCommandOpen(true);
  }

  const spotlightStyle = {
    "--spotlight-x": `${spotlight.x}px`,
    "--spotlight-y": `${spotlight.y}px`,
    opacity: spotlight.active ? 1 : 0,
  } as CSSProperties;

  return (
    <main id="main-content">
      <motion.div className="page-progress" style={{ scaleX: progressScale }} aria-hidden="true" />
      <div className="interactive-spotlight" style={spotlightStyle} aria-hidden="true" />
      <FloatingSectionRail activeSection={activeSection} />
      <CommandPalette open={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
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
              const sectionId = item.href.slice(1);
              return (
                <a
                  href={item.href}
                  key={item.href}
                  className={activeSection === sectionId ? "is-active" : undefined}
                  aria-current={activeSection === sectionId ? "page" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
          <button
            type="button"
            className="command-button"
            onClick={() => setIsCommandOpen(true)}
            onKeyDown={openCommand}
            aria-label="打开快速跳转面板"
          >
            <span>⌘K</span>
          </button>
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
                <span>AI Developer / Frontend Developer / Research Builder</span>
              </div>
            </motion.div>

            <motion.div
              className="hero-superbar"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.04 }}
            >
              <span>Portfolio 2026</span>
              <span>Available for ideas & collaboration</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.76, ease, delay: 0.08 }}
            >
              <span className="hero-title-line">用代码把想法落地</span>
              <span className="hero-title-line accent-line">让作品有逻辑，也有手感。</span>
            </motion.h1>

            <motion.p
              className="hero-desc"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.76, ease, delay: 0.16 }}
            >
              我是马星煜，一名在读研究生。技术上主攻前端开发与 AI 开发，也关注数学建模、机器视觉与音乐制作。新版个人站以“研究可信度 + 产品级交互 + 轻量动效”为核心，把作品、论文和联系方式组织成更清晰的浏览路径。
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.76, ease, delay: 0.24 }}
            >
              <motion.a className="primary-button magnetic-button" href="#projects" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                查看项目 <ArrowIcon />
              </motion.a>
              <motion.a className="secondary-button magnetic-button" href="#papers" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                阅读论文
              </motion.a>
              <motion.a className="github-button magnetic-button" href={socialLinks[0].href} target="_blank" rel="noreferrer" aria-label="打开马星煜的 GitHub 主页" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <GitHubIcon />
                GitHub
              </motion.a>
            </motion.div>

            <motion.div
              className="metric-row hero-meta-grid"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.76, ease, delay: 0.32 }}
            >
              <div><strong>05</strong><span>核心方向</span></div>
              <div><strong>{String(projects.length).padStart(2, "0")}</strong><span>项目方向</span></div>
              <div><strong>{String(featuredPapers.length + archivedPapers.length).padStart(2, "0")}</strong><span>论文记录</span></div>
            </motion.div>

            <motion.div
              className="motion-strip"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.76, ease, delay: 0.4 }}
              aria-label="站点动效关键词"
            >
              <span>Command palette</span>
              <span>Active nav</span>
              <span>Project filter</span>
              <span>Reduced-motion safe</span>
            </motion.div>
          </div>
          <FormulaPanel />
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
              desc="用可复用的能力模块承接不同类型的项目，不只展示技术名词，也展示问题处理方式。"
            />
          </Reveal>
          <div className="skill-grid">
            {skills.map((skill, index) => (
              <Reveal delay={index * 0.05} key={skill.title}>
                <motion.article className="glass-card skill-card" whileHover={{ y: -6 }} transition={{ duration: 0.24, ease }}>
                  <div className="card-index">0{index + 1}</div>
                  <h3>{skill.title}</h3>
                  <p>{skill.desc}</p>
                  <div aria-label={`${skill.title}关键词`}>
                    {skill.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="system" className="content-section system-section">
          <Reveal>
            <SectionTitle
              eyebrow="UI SYSTEM"
              title="界面体验系统"
              desc="把风格、交互逻辑和 UI 层级重新组织：先建立信任，再引导探索，最后促成联系。"
            />
          </Reveal>
          <InterfaceSystem />
        </section>

        <section id="projects" className="content-section">
          <Reveal>
            <SectionTitle
              eyebrow="PROJECTS"
              title="项目展示"
              desc="加入项目筛选和更强的卡片反馈，让访客可以按目的快速浏览，而不是被动从上到下读完。"
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
              desc="把灵感变成可以验证、可以维护、可以复盘的结构。"
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

        <section id="motion" className="content-section motion-lab-section">
          <Reveal>
            <SectionTitle
              eyebrow="MOTION"
              title="动效升级策略"
              desc="把 Behance / Awwwards 常见的开场欢迎、滚动叙事、卡片反馈和快速跳转转译成适合个人站的轻量交互。"
            />
          </Reveal>
          <MotionPrinciples />
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
          <span>Built with Next.js · Logic in motion</span>
        </footer>
      </div>
    </main>
  );
}
