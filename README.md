# 流放之路 · 国际服助手

一个为流放之路（Path of Exile）国际服玩家制作的导航页，使用 **Bun + React + Tailwind CSS** 构建。

## 功能

- 新手起步：游戏下载、中文化补丁
- 交易与经济：官方交易市集、Awakened PoE Trade、Poedb 编年史、Wealthy Exile
- BD 流派：Path of Building、pob.cool、pobb.in、poe.ninja 天梯
- 推荐 BD：本地镜像 Maxroll Winter Orb Elementalist 开荒指南
- 本赛季 META：每天自动从 poe.ninja Allflame 赛季抓取升华 / 装备 / 技能使用率（GitHub Actions 定时任务）
- 视觉复刻自 `example.html`：暗色金铜主题、粒子余烬背景、滚动渐显动画

## 开发

```bash
# 安装依赖
bun install

# 启动开发服务器
bun dev
```

访问 http://localhost:3000 预览。

## 构建

```bash
bun run build
```

构建产物输出到 `dist/` 目录，可直接部署到 GitHub Pages / Cloudflare Pages / Vercel 等静态托管平台。

## 更新本赛季 META 数据

META 数据来自 poe.ninja 的私有 builds search API（protobuf + NDIC 字典）。仓库每天北京时间 08:00 自动抓取。

手动更新：

```bash
bun run update-meta
```

## 部署到 Vercel

1. 在 [Vercel Dashboard](https://vercel.com/dashboard) 导入本仓库。
2. Framework Preset 选择 **Other**，Build Command 留空或填写 `bun run build`，Output Directory 填写 `dist`。
3. 推送后 Vercel 会自动触发构建。
4. 项目已包含 `vercel.json`，配置 SPA 回退到 `index.html` 并设置基础安全响应头。

## 部署到 GitHub Pages

1. 在仓库 Settings > Pages 中选择部署源为 **GitHub Actions**。
2. 使用 `.github/workflows/deploy.yml` 工作流（示例见下方）在每次 push 到 `main` 时自动构建并部署 `dist/`。

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

## 技术栈

- [Bun](https://bun.sh) - JavaScript 运行时与构建工具
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
