import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home page", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders the revised personal positioning and primary sections", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("用代码把想法落地");
    expect(screen.getByText("马星煜")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "马星煜头像" })).toBeInTheDocument();
    expect(screen.getByText("星河有迹可循")).toBeInTheDocument();
    expect(screen.queryByText(/页面保留克制的表达/)).not.toBeInTheDocument();
    expect(screen.queryByText(/展示方式按/)).not.toBeInTheDocument();

    const nav = screen.getByRole("navigation", { name: "主导航" });
    expect(within(nav).getByRole("link", { name: "项目" })).toHaveAttribute("href", "#projects");
    expect(within(nav).getByRole("link", { name: "论文" })).toHaveAttribute("href", "#papers");
    expect(within(nav).getByRole("link", { name: "留言" })).toHaveAttribute("href", "#guestbook");

    expect(screen.getByRole("heading", { name: "能力矩阵" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "项目展示" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "我的论文" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "做事方式" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "留言板" })).toBeInTheDocument();
    expect(screen.getByText("一点勇气 一点耐心 一点毅力")).toBeInTheDocument();
    const githubLinks = screen.getAllByRole("link", { name: /GitHub|github\.com\/xingyu8999|访问马星煜的 GitHub/ });
    expect(githubLinks.some((link) => link.getAttribute("href") === "https://github.com/xingyu8999")).toBe(true);
  });

  it("renders the formula panel without garbled symbols and with an added line", () => {
    render(<Home />);

    expect(screen.getByRole("link", { name: "打开星雨云答辩训练台" })).toHaveAttribute("href", "/xyy-defense-training");
    expect(screen.getByText("loss = signal - noise")).toBeInTheDocument();
    expect(screen.getByText("clean code > stable system")).toBeInTheDocument();
    expect(screen.getByText("music ≈ structure + emotion")).toBeInTheDocument();
    expect(screen.getByText("idea -> code -> reality")).toBeInTheDocument();
  });

  it("renders two featured papers and keeps the rest in a collapsible archive", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const paperHeading = screen.getByRole("heading", { name: "我的论文" });
    expect(paperHeading).toBeInTheDocument();

    const mlpPaper = screen.getByRole("heading", { name: "X射线荧光光谱结合MLP-DNN实现化妆品纸质包装盒快速分类" }).closest("article");
    expect(mlpPaper).not.toBeNull();
    expect(within(mlpPaper as HTMLElement).getByText("激光与光电子学进展 · 62(13) · EI · CSCD")).toBeInTheDocument();
    expect(within(mlpPaper as HTMLElement).getByRole("link", { name: /DOI/ })).toHaveAttribute("href", "https://doi.org/10.3788/LOP242272");

    expect(screen.getByRole("heading", { name: "基于无人机平台的高速公路违法行为识别" })).toBeInTheDocument();
    expect(screen.getByText("无线电工程")).toBeInTheDocument();

    const toggle = screen.getByRole("button", { name: "展开其他论文（6）" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("XRF结合SC-RFECV-CatBoost对手帕纸塑料包装袋的分类研究")).toBeInTheDocument();
    expect(screen.queryByText("香烟烟丝物证检验研究进展")).not.toBeInTheDocument();

    await user.click(toggle);

    expect(screen.getByRole("button", { name: "收起其他论文" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("香烟烟丝物证检验研究进展")).toBeInTheDocument();
    expect(screen.getByText("基于XRF与递归选择CatBoost对口红的检验识别")).toBeInTheDocument();
  });

  it("renders project cards in the requested order with stack and evidence details", () => {
    render(<Home />);

    const projectHeadings = screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent);
    expect(projectHeadings).toEqual(expect.arrayContaining([
      "Elplayer",
      "机器学习方法实验",
      "前端设计系统",
      "机器视觉研究项目",
      "数学建模推导集",
      "AI 开发工作流",
    ]));

    const elplayerProject = screen.getByRole("heading", { name: "Elplayer" }).closest("article");
    expect(elplayerProject).not.toBeNull();
    expect(within(elplayerProject as HTMLElement).getByText("已发布")).toBeInTheDocument();
    expect(within(elplayerProject as HTMLElement).getByRole("link", { name: /项目介绍/ })).toHaveAttribute("href", "https://xingyu8999.github.io/elplayer/website.html");
    expect(within(elplayerProject as HTMLElement).getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", "https://github.com/xingyu8999/elplayer");

    const mlProject = screen.getByRole("heading", { name: "机器学习方法实验" }).closest("article");
    expect(mlProject).not.toBeNull();
    expect(within(mlProject as HTMLElement).getByText("方法沉淀")).toBeInTheDocument();
    expect(within(mlProject as HTMLElement).getByText("PyTorch")).toBeInTheDocument();
    expect(within(mlProject as HTMLElement).getByText(/误差案例/)).toBeInTheDocument();
  });

  it("adds a guestbook message, shows status, and persists it locally", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByPlaceholderText("怎么称呼你"), "测试访客");
    await user.selectOptions(screen.getByRole("combobox"), "项目合作");
    await user.type(screen.getByPlaceholderText("写下你的问题、想法或合作方向。"), "我想交流一个 AI 项目。");
    expect(screen.getByText("13/220")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "留下信息" }));

    expect(screen.getByRole("status")).toHaveTextContent("留言已记录");
    expect(screen.getByText("测试访客")).toBeInTheDocument();
    expect(screen.getByText("我想交流一个 AI 项目。")).toBeInTheDocument();

    const stored = JSON.parse(window.localStorage.getItem("mxy-guestbook") ?? "[]") as Array<{ name: string; topic: string; content: string }>;
    expect(stored[0]).toMatchObject({ name: "测试访客", topic: "项目合作", content: "我想交流一个 AI 项目。" });
  });

  it("limits guestbook preview messages to six entries", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const textarea = screen.getByPlaceholderText("写下你的问题、想法或合作方向。");
    const submit = screen.getByRole("button", { name: "留下信息" });

    for (let index = 1; index <= 7; index += 1) {
      await user.clear(textarea);
      await user.type(textarea, `留言 ${index}`);
      await user.click(submit);
    }

    const stored = JSON.parse(window.localStorage.getItem("mxy-guestbook") ?? "[]") as Array<{ content: string }>;
    expect(stored).toHaveLength(6);
    expect(stored[0].content).toBe("留言 7");
    expect(stored.at(-1)?.content).toBe("留言 2");
  });

  it("recovers from malformed guestbook storage", async () => {
    window.localStorage.setItem("mxy-guestbook", "not-json");
    render(<Home />);

    expect(screen.getByText(/欢迎留下问题、想法或合作方向/)).toBeInTheDocument();
    await waitFor(() => expect(window.localStorage.getItem("mxy-guestbook")).toBeNull());
  });
});
