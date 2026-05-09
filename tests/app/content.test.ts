import { describe, expect, it } from "vitest";
import {
  archivedPapers,
  defaultMessages,
  featuredPapers,
  lifeTags,
  methodCards,
  navItems,
  papers,
  projects,
  skills,
} from "@/app/content";

describe("content model", () => {
  it("keeps navigation anchors unique and internal", () => {
    const hrefs = navItems.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs.every((href) => href.startsWith("#"))).toBe(true);
    expect(hrefs).toContain("#projects");
    expect(hrefs).toContain("#papers");
    expect(hrefs).toContain("#guestbook");
  });

  it("covers the expected personal capability directions", () => {
    const skillTitles = skills.map((skill) => skill.title);
    expect(skillTitles).toEqual(expect.arrayContaining(["AI 开发", "前端开发", "数学建模", "机器视觉", "音乐制作"]));
    expect(skills.every((skill) => skill.tags.length >= 4 && skill.desc.length >= 24)).toBe(true);
  });

  it("keeps two high-priority papers featured and the rest archived", () => {
    expect(featuredPapers.map((paper) => paper.title)).toEqual([
      "X射线荧光光谱结合MLP-DNN实现化妆品纸质包装盒快速分类",
      "基于无人机平台的高速公路违法行为识别",
    ]);
    expect(archivedPapers.length).toBeGreaterThanOrEqual(6);
    expect(papers).toHaveLength(featuredPapers.length + archivedPapers.length);
  });

  it("defines a paper archive with traceable publication metadata", () => {
    expect(papers.map((paper) => paper.title)).toEqual(expect.arrayContaining([
      "X射线荧光光谱结合MLP-DNN实现化妆品纸质包装盒快速分类",
      "基于无人机平台的高速公路违法行为识别",
      "多模型集成学习对皮鞋鞋底的X射线荧光光谱分类研究",
      "差分拉曼光谱结合PCA-RCSC-Transformer对快递面单的检验研究",
      "XRF结合SC-RFECV-CatBoost对手帕纸塑料包装袋的分类研究",
      "XRF结合EMDE-ProNet实现快递信封快速分类",
      "香烟烟丝物证检验研究进展",
      "基于XRF与递归选择CatBoost对口红的检验识别",
    ]));

    for (const paper of papers) {
      expect(paper.code).toMatch(/^(F|A)-/);
      expect(paper.authors).toContain("马星煜");
      expect(paper.desc.length).toBeGreaterThan(30);
      expect(paper.keywords.length).toBeGreaterThanOrEqual(4);
      expect(paper.links.every((link) => link.href.startsWith("https://"))).toBe(true);
    }
  });

  it("defines five ordered project cards for portfolio presentation", () => {
    expect(projects.map((project) => project.title)).toEqual([
      "机器学习方法实验",
      "前端设计系统",
      "机器视觉研究项目",
      "数学建模推导集",
      "AI 开发工作流",
    ]);

    for (const project of projects) {
      expect(project.title).toBeTruthy();
      expect(project.desc.length).toBeGreaterThan(35);
      expect(project.focus.length).toBeGreaterThanOrEqual(3);
      expect(project.stack.length).toBeGreaterThanOrEqual(4);
      expect(project.evidence.length).toBeGreaterThan(15);
      expect(project.result.length).toBeGreaterThan(20);
      expect(Array.isArray(project.links)).toBe(true);
    }
  });

  it("keeps project cards ready for GitHub, live demos, and static HTML work", () => {
    for (const project of projects) {
      expect(project).toHaveProperty("links");
    }

    const allowedKinds = ["github", "demo", "html", "detail"];
    const sampleLink = { label: "GitHub", href: "https://github.com/example/repo", kind: "github" };
    expect(allowedKinds).toContain(sampleLink.kind);
  });

  it("has enough human texture without crowding the page", () => {
    expect(lifeTags).toEqual(expect.arrayContaining(["茶", "音乐发烧友", "公路车", "摩托车", "钓鱼"]));
    expect(lifeTags.length).toBeLessThanOrEqual(10);
  });

  it("keeps method cards concise and formula-driven", () => {
    expect(methodCards).toHaveLength(3);
    expect(methodCards.every((card) => card.formula.includes("→") || card.formula.includes(">"))).toBe(true);
  });

  it("ships a clear default guestbook message", () => {
    expect(defaultMessages).toHaveLength(1);
    expect(defaultMessages[0].content).toContain("欢迎留下问题");
  });
});
