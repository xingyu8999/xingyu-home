export const navItems = [
  { label: "关于", href: "#about" },
  { label: "能力", href: "#skills" },
  { label: "项目", href: "#projects" },
  { label: "论文", href: "#papers" },
  { label: "方法", href: "#method" },
  { label: "留言", href: "#guestbook" },
  { label: "联系", href: "#contact" },
] as const;


export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/xingyu8999",
    desc: "代码、实验和后续项目会陆续整理在这里。",
  },
] as const;

export const skills = [
  {
    title: "AI 开发",
    desc: "从需求拆解、模型调用到交互落地，重视可解释、可维护和真实场景中的稳定反馈。",
    tags: ["LLM", "Agent", "Prompt", "Workflow"],
  },
  {
    title: "前端开发",
    desc: "偏好清晰的信息层级、干净的组件结构和克制的动效，让界面有质感也有秩序。",
    tags: ["Next.js", "React", "TypeScript", "Motion"],
  },
  {
    title: "数学建模",
    desc: "用变量、约束和目标函数处理复杂问题，关注问题定义、推导路径和结果解释。",
    tags: ["建模", "优化", "推导", "仿真"],
  },
  {
    title: "机器视觉",
    desc: "关注视觉任务中的数据质量、特征表达、评估指标和工程部署，追求稳定与可复现。",
    tags: ["CV", "Detection", "Data", "Evaluation"],
  },
  {
    title: "音乐制作",
    desc: "把声音当作结构化语言，在节奏、音色、空间与情绪之间寻找可感知的秩序。",
    tags: ["编曲", "混音", "声音设计", "审美"],
  },
] as const;

export type ProjectLink = {
  label: string;
  href: string;
  kind: "github" | "demo" | "html" | "detail";
};

export type ProjectCard = {
  code: string;
  title: string;
  type: string;
  status: string;
  desc: string;
  focus: string[];
  stack: string[];
  evidence: string;
  result: string;
  links: ProjectLink[];
};

export const projects: ProjectCard[] = [
  {
    code: "P-00",
    title: "Elplayer",
    type: "Electron / Web / Multimedia",
    status: "已发布",
    desc: "一个透明浮动歌词多媒体播放器，支持本地音频、本地视频、LRC 歌词、SRT/VTT 字幕、桌面歌词浮窗和极简黑胶机模式。",
    focus: ["桌面歌词", "本地媒体", "视频字幕"],
    stack: ["Electron", "HTML", "CSS", "JavaScript"],
    evidence: "已完成 GitHub 仓库、GitHub Pages 展示页、下载页、Windows 桌面版打包流程和统一图标体系。",
    result: "展示从 Web 原型到 Electron 桌面软件、官网发布页和真实安装包发布流程的完整落地能力。",
    links: [
      { label: "项目介绍", href: "https://xingyu8999.github.io/elplayer/website.html", kind: "demo" },
      { label: "打开 Web 版", href: "https://xingyu8999.github.io/elplayer/", kind: "html" },
      { label: "下载桌面版", href: "https://xingyu8999.github.io/elplayer/download.html", kind: "detail" },
      { label: "GitHub", href: "https://github.com/xingyu8999/elplayer", kind: "github" },
    ],
  },
  {
    code: "P-01",
    title: "机器学习方法实验",
    type: "Machine Learning / Research",
    status: "方法沉淀",
    desc: "围绕数据、特征、训练、评估与复盘展开，强调把模型结果放回问题本身，而不是只追求指标数字。",
    focus: ["特征工程", "训练流程", "误差分析"],
    stack: ["Python", "PyTorch", "Scikit-learn", "Evaluation"],
    evidence: "样本划分、指标曲线、误差案例和实验记录共同构成判断依据。",
    result: "分类、回归、预测、推荐等小型研究实验中的方法选择与复盘能力。",
    links: [],
  },
  {
    code: "P-02",
    title: "前端设计系统",
    type: "Frontend / UI System",
    status: "正在使用",
    desc: "以藏蓝文字、玻璃材质、统一色调和轻动效构建个人主页视觉语言，兼顾审美、可读性和响应式体验。",
    focus: ["组件化", "视觉系统", "交互节奏"],
    stack: ["Next.js", "React", "CSS Variables", "Framer Motion"],
    evidence: "通过色彩变量、卡片组件、导航结构和动效策略体现工程化设计。",
    result: "作品详情、技术文章、实验笔记和长期个人品牌主页。",
    links: [],
  },
  {
    code: "P-03",
    title: "机器视觉研究项目",
    type: "Computer Vision / Evaluation",
    status: "视觉方向",
    desc: "面向检测、识别、分割或视觉质检任务，重点关注数据准备、结果可视化和模型在边界场景下的表现。",
    focus: ["数据处理", "模型评估", "可视化结果"],
    stack: ["OpenCV", "PyTorch", "Dataset", "Metrics"],
    evidence: "以结果图、错误样本、混淆矩阵、召回率和误检分析呈现判断过程。",
    result: "机器视觉项目中的实验逻辑、工程处理和结果解释能力。",
    links: [],
  },
  {
    code: "P-04",
    title: "数学建模推导集",
    type: "Modeling / Optimization",
    status: "长期积累",
    desc: "把现实问题转化为变量、约束、目标函数和求解策略，用清晰的推导解释复杂系统的结构。",
    focus: ["问题抽象", "公式推导", "结果解释"],
    stack: ["Optimization", "Simulation", "LaTeX", "Python"],
    evidence: "变量定义、约束条件、求解路径和灵敏度分析用于呈现完整推理链条。",
    result: "竞赛建模、研究型推导、优化问题和仿真实验。",
    links: [],
  },
  {
    code: "P-05",
    title: "AI 开发工作流",
    type: "AI / Agent / Tooling",
    status: "持续迭代",
    desc: "围绕智能助手、自动化流程和人机协作界面展开，从提示结构、调用链路到可视化反馈形成闭环。",
    focus: ["模型边界", "提示结构", "流程编排"],
    stack: ["LLM API", "Agent Workflow", "TypeScript", "Logging"],
    evidence: "以输入输出、链路步骤、失败样本和复盘结论展示 AI 工程能力。",
    result: "AI 工具、论文辅助、学习助手和业务自动化场景。",
    links: [],
  },
];

export type PaperLink = {
  label: string;
  href: string;
};

export type PaperCard = {
  code: string;
  title: string;
  venue: string;
  year: string;
  authors: string;
  desc: string;
  keywords: string[];
  links: PaperLink[];
};

export const featuredPapers: PaperCard[] = [
  {
    code: "F-01",
    title: "X射线荧光光谱结合MLP-DNN实现化妆品纸质包装盒快速分类",
    venue: "激光与光电子学进展 · 62(13) · EI · CSCD",
    year: "2025",
    authors: "马星煜，胡晓光，姜红，胡保发，王昰鉴，满吉",
    desc: "将 XRF 光谱特征与 MLP-DNN 分类模型结合，面向化妆品纸质包装盒建立快速分类路径，强调光谱数据、深度学习和检验场景之间的连接。",
    keywords: ["XRF", "MLP-DNN", "包装盒分类", "快速检验"],
    links: [
      { label: "期刊页面", href: "https://www.opticsjournal.net/Articles/OJee1cfe81399f2c5c/Abstract" },
      { label: "DOI", href: "https://doi.org/10.3788/LOP242272" },
    ],
  },
  {
    code: "F-02",
    title: "基于无人机平台的高速公路违法行为识别",
    venue: "无线电工程",
    year: "2025",
    authors: "马星煜，胡晓光，胡保发，王昰鉴，屈音璇，白李薇薇",
    desc: "围绕无人机动态巡检场景下的交通违法行为识别展开，关注小目标特征提取、边界框回归优化与检测精度提升。",
    keywords: ["无人机", "YOLOv8", "小目标识别", "交通治理"],
    links: [
      { label: "期刊页面", href: "https://wxdg.cbpt.cnki.net/portal/journal/portal/client/paper/bf9f9b3ff1f000e43f18a9897a016032" },
    ],
  },
];

export const archivedPapers: PaperCard[] = [
  {
    code: "A-01",
    title: "多模型集成学习对皮鞋鞋底的X射线荧光光谱分类研究",
    venue: "皮革科学与工程 · 35(6):69-73",
    year: "2025",
    authors: "姜红，马星煜，陈越",
    desc: "以材料检测与光谱分类为研究对象，用多模型集成学习提升鞋底样本的分类识别效果。",
    keywords: ["集成学习", "X射线荧光", "分类识别", "材料检测"],
    links: [
      { label: "期刊页面", href: "https://www.scupgkg.cn/article/doi/10.12472/j.issn.1004-7964.202500059" },
      { label: "DOI", href: "https://doi.org/10.12472/j.issn.1004-7964.202500059" },
    ],
  },
  {
    code: "A-02",
    title: "差分拉曼光谱结合PCA-RCSC-Transformer对快递面单的检验研究",
    venue: "中国造纸 · 44(11):172-176",
    year: "2025",
    authors: "姜红，马星煜",
    desc: "结合差分拉曼光谱、降维与 Transformer 结构，探索热敏纸类快递面单的检验与分类方法。",
    keywords: ["差分拉曼", "PCA", "Transformer", "检验研究"],
    links: [
      { label: "期刊页面", href: "https://zgzz.ijournals.cn/zgzz/ch/reader/view_abstract.aspx?file_no=202511023" },
    ],
  },
  {
    code: "A-03",
    title: "XRF结合SC-RFECV-CatBoost对手帕纸塑料包装袋的分类研究",
    venue: "上海塑料 · 53(03):48-52",
    year: "2025",
    authors: "马星煜，马凯，姜红",
    desc: "面向手帕纸塑料包装袋样本，结合 XRF 光谱、递归特征选择与 CatBoost 进行分类识别。",
    keywords: ["XRF", "SC-RFECV", "CatBoost", "包装袋分类"],
    links: [
      { label: "DOI", href: "https://doi.org/10.16777/j.cnki.issn.1009-5993.2025.03.010" },
    ],
  },
  {
    code: "A-04",
    title: "XRF结合EMDE-ProNet实现快递信封快速分类",
    venue: "化学研究与应用 · 37(09):2824-2828",
    year: "2025",
    authors: "姜红，马星煜，陈越",
    desc: "围绕快递信封检验场景，将 XRF 光谱信息与 EMDE-ProNet 方法结合，服务于快速分类判断。",
    keywords: ["XRF", "EMDE-ProNet", "快递信封", "快速分类"],
    links: [],
  },
  {
    code: "A-05",
    title: "香烟烟丝物证检验研究进展",
    venue: "中国人民公安大学学报(自然科学版) · 32(01):36-44",
    year: "2026",
    authors: "姜红，陈越，马星煜",
    desc: "对香烟烟丝物证检验研究进行梳理，关注法庭科学语境下的样本特征、检验路径与方法进展。",
    keywords: ["物证检验", "法庭科学", "烟丝", "研究进展"],
    links: [
      { label: "期刊页面", href: "https://goan.cbpt.cnki.net/" },
    ],
  },
  {
    code: "A-06",
    title: "基于XRF与递归选择CatBoost对口红的检验识别",
    venue: "浙江大学学报(理学版) · J/OL",
    year: "2026",
    authors: "姜红，马星煜，张馨艺，等",
    desc: "结合 XRF 光谱与递归特征选择 CatBoost 模型，面向口红样本开展检验识别研究。",
    keywords: ["XRF", "CatBoost", "递归选择", "口红检验"],
    links: [
      { label: "知网页面", href: "https://link.cnki.net/urlid/33.1246.N.20251212.1419.002" },
    ],
  },
];

export const papers: PaperCard[] = [...featuredPapers, ...archivedPapers];

export const methodCards = [
  {
    title: "先定义问题",
    desc: "把模糊想法拆成目标、约束、输入和输出，先把方向看清楚。",
    formula: "problem → variables + constraints",
  },
  {
    title: "再建立结构",
    desc: "用组件、数据结构和交互路径承载内容，让形式服务于表达。",
    formula: "structure > decoration",
  },
  {
    title: "最后验证反馈",
    desc: "用测试、复盘和真实使用反馈持续迭代，让作品经得起长期维护。",
    formula: "feedback → iteration",
  },
] as const;

export const lifeTags = ["茶", "盘串", "音乐发烧友", "公路车", "摩托车", "钓鱼", "公式", "逻辑"] as const;

export type GuestbookMessage = {
  id: string;
  name: string;
  topic: string;
  content: string;
  time: string;
};

export const defaultMessages: GuestbookMessage[] = [
  {
    id: "seed-1",
    name: "站点主人",
    topic: "欢迎交流",
    content: "欢迎留下问题、想法或合作方向。技术、数学、AI、前端、音乐和生活都可以聊。",
    time: "置顶",
  },
];
