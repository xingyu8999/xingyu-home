# 测试报告

## 本轮变更

- 将答辩训练台从 `.html` 文件入口调整为二级路径入口：`/defense-training`。
- 将独立页面文件移动到 `public/defense-training/index.html`，形成类似二级网站目录结构。
- 首页首屏公式面板中的“星雨云答辩训练台”入口已改为跳转 `/defense-training`。
- 在 `next.config.ts` 中新增 rewrite：访问 `/defense-training` 时展示 `public/defense-training/index.html`。
- 在 `next.config.ts` 中新增 redirect：旧地址 `/defense-training.html` 会跳转到 `/defense-training`。
- 更新页面测试中的入口地址断言。

## 本地检查

已执行：

```bash
npm test -- --runInBand
```

## 结果

当前压缩包内没有 `node_modules`，因此本地环境无法直接运行 Vitest：

```bash
sh: 1: vitest: not found
```

代码层面已完成静态检查：

- 首页入口引用已从 `/defense-training.html` 改为 `/defense-training`。
- 新的二级目录 HTML 文件存在于 `public/defense-training/index.html`。
- 旧 `.html` 路径保留重定向规则，避免旧链接失效。

## 部署后访问

部署到 Vercel 后，推荐访问：

```text
https://maxingyu.cn/defense-training
```

旧地址会跳转到新地址：

```text
https://maxingyu.cn/defense-training.html
```
