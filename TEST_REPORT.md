# 测试报告

## 本轮变更

- 在首页首屏操作区新增 GitHub 入口，链接到 `https://github.com/xingyu8999`。
- 在联系区新增 GitHub 联系卡片，并加入内联 GitHub SVG 图标。
- 新增 `socialLinks` 内容数据，方便后续扩展个人主页、GitHub、博客或其他公开链接。
- 更新测试，确保 GitHub 链接在内容数据和页面中都可被稳定访问。
- 保留上一轮 Vercel 安装修复配置：固定 npm 安装链路，并使用 `npm ci --no-audit --no-fund`。

## 已执行命令

```bash
npm run lint
npm run test
npm run test:coverage
npm run build
npm audit --audit-level=high --omit=dev
```

## 结果

- ESLint：通过
- Vitest：通过，4 个测试文件，23 个测试用例
- Coverage：语句覆盖率 90.9%，行覆盖率 92.13%
- Next.js build：通过
- npm audit --audit-level=high --omit=dev：通过，无 high / critical 漏洞

## 说明

`npm audit` 仍报告 Next.js 内部 PostCSS 链路存在 2 个 moderate 级别提示。未执行 `npm audit fix --force`，因为它会把 Next.js 降级到破坏性版本，不适合当前项目。
