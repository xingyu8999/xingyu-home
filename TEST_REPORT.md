# 修改记录与测试报告

## 本轮变更

- 使用最新上传的 `星雨云答辩训练台_已替换素材(1).html` 替换二级页面内容。
- 二级网站入口从 `/defense-training` 改为 `/xyy-defense-training`。
- 页面文件位置为 `public/xyy-defense-training/index.html`。
- 首页首屏公式面板中的“星雨云答辩训练台”入口已改为跳转 `/xyy-defense-training`。
- `next.config.ts` 已新增 rewrite：访问 `/xyy-defense-training` 或 `/xyy-defense-training/` 时展示 `public/xyy-defense-training/index.html`。
- 旧入口 `/defense-training`、`/defense-training/`、`/defense-training.html` 与 `/xyy-defense-training.html` 会重定向到 `/xyy-defense-training`。
- 页面测试中的入口地址断言已更新为 `/xyy-defense-training`。

## 静态检查

已确认：

- `public/defense-training` 旧目录已移除。
- 新 HTML 与用户最新上传文件内容一致。
- 首页入口引用为 `/xyy-defense-training`。
- 测试断言引用为 `/xyy-defense-training`。
- rewrite 与 redirect 配置均已更新。

## 本地测试

尝试执行：

```bash
npm test -- --runInBand
```

结果：当前压缩包内没有 `node_modules`，因此本地环境无法直接运行 Vitest：

```bash
sh: 1: vitest: not found
```

## 部署后访问

推荐访问：

```text
https://maxingyu.cn/xyy-defense-training
```

兼容地址会跳转到新地址：

```text
https://maxingyu.cn/defense-training
https://maxingyu.cn/defense-training.html
https://maxingyu.cn/xyy-defense-training.html
```
