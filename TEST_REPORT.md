# 测试报告

## 本轮变更

- 调整重点论文期刊标签：`无线电工程 · 中文核心期刊` 改为 `无线电工程`。
- 调整重点论文期刊标签：`激光与光电子学进展 · 62(13)` 改为 `激光与光电子学进展 · 62(13) · EI · CSCD`。
- 论文区改为“两篇重点论文 + 其他论文缩略/展开”的信息结构。
- 重点论文保留两篇：
  - X射线荧光光谱结合MLP-DNN实现化妆品纸质包装盒快速分类
  - 基于无人机平台的高速公路违法行为识别
- 其他论文默认缩略展示，点击“展开其他论文”后显示完整条目、简介和可用链接。
- 补充论文数据结构，支持期刊页面、DOI、知网页面等外链。
- 修复重构时暴露出的项目数据缺失问题，并用测试锁定项目区结构。

## 已执行命令

```bash
npm run lint
npm run test
npm run test:coverage
npm run build
npm audit --audit-level=high
```

## 结果

- ESLint：通过
- Vitest：通过，4 个测试文件，22 个测试用例
- Coverage：语句覆盖率 90.72%，行覆盖率 91.95%
- Next.js build：通过
- npm audit --audit-level=high：通过，无 high / critical 漏洞

## 说明

`npm audit` 仍报告 Next.js 内部 PostCSS 链路存在 2 个 moderate 级别提示。未执行 `npm audit fix --force`，因为它会把 Next.js 降级到破坏性版本，不适合当前项目。
