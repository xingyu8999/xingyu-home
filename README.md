# 马星煜个人主页

一个面向个人展示、项目沉淀和访客交流的 Next.js 作品集网站。视觉方向为藏蓝文字、低饱和色调、玻璃材质、留白充分、轻动效，重点突出数学、AI、前端、机器视觉与音乐制作的个人坐标。

## 页面结构

- 首页首屏：个人姓名、头像、核心表达、联系入口、项目入口
- 关于我：研究生身份、数学兴趣、技术方向与生活兴趣
- 能力矩阵：AI 开发、前端开发、数学建模、机器视觉、音乐制作
- 项目展示：机器学习、前端设计、机器视觉、数学建模、AI 开发
- 做事方式：问题定义、结构建立、反馈验证
- 留言板：留言提交、字数提示、状态提示、留言列表
- 主题切换：右上角亮色 / 暗色主题按钮
- 可访问性：主导航标签、跳过导航链接、可见焦点、动效降级

## 技术栈

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4 / CSS Variables
- Framer Motion
- next-themes
- Vitest
- Testing Library

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

## 测试与质量检查

```bash
npm run lint
npm run test
npm run test:coverage
npm run build
npm run check
```

## 内容维护

主要内容集中在：

```text
app/content.ts
```

页面结构集中在：

```text
app/page.tsx
```

视觉系统集中在：

```text
app/globals.css
```

主题切换组件：

```text
components/ThemeToggle.tsx
```
