import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { Footer } from "./components/Footer";
import "./index.css";

const sections = [
  {
    id: "start",
    no: "01",
    title: "新手起步",
    en: "Getting Started",
    desc: "进入瓦尔克拉斯之前，先装好游戏、配好中文。",
    links: [
      {
        idx: "01",
        name: "游戏下载",
        en: "Official Client",
        desc: "官网客户端下载页，支持独立客户端与 Steam 版本，国际服账号注册也在这里。",
        href: "https://www.pathofexile.com/download",
      },
      {
        idx: "02",
        name: "中文化补丁",
        en: "Chinese Localization",
        desc: "Poedb 编年史提供的国际服汉化工具与词缀对照，含详细安装教程，赛季更新同步维护。",
        href: "https://poedb.tw/tw/chinese",
      },
    ],
  },
  {
    id: "trade",
    no: "02",
    title: "交易与经济",
    en: "Trade & Economy",
    desc: "市集淘货、实时查价、资料检索——搬砖与剁手的基本功。",
    links: [
      {
        idx: "03",
        name: "官方交易市集",
        en: "Official Trade",
        desc: "GGG 官方交易平台，词缀筛选、在线状态、批量兑换一应俱全，买卖装备的第一入口。",
        href: "https://www.pathofexile.com/trade",
      },
      {
        idx: "04",
        name: "Awakened PoE Trade",
        en: "Price Checker",
        desc: "游戏内 Ctrl+D 一键查价，支持词缀勾选与实时行情，国际服玩家必备插件。",
        href: "https://snosme.github.io/awakened-poe-trade/download",
      },
      {
        idx: "05",
        name: "Poedb 编年史",
        en: "Game Database",
        desc: "最全的中文数据库：物品、技能宝石、词缀权重、机制详解，配装查资料的百科全书。",
        href: "https://poedb.tw/cn/",
      },
    ],
  },
  {
    id: "builds",
    no: "03",
    title: "BD 流派",
    en: "Build & Planner",
    desc: "从抄作业到写作业：模拟、分享、参考天梯，一站走完。",
    links: [
      {
        idx: "06",
        name: "Path of Building",
        en: "Offline Planner",
        desc: "社区版离线 BD 模拟器，精确计算伤害、承伤与天赋路线，配装开发的行业标准。",
        href: "https://pathofbuilding.community/",
      },
      {
        idx: "07",
        name: "pob.cool",
        en: "Online Planner",
        desc: "网页版 PoB，无需安装，浏览器里直接导入导出 BD 代码，摸鱼配装利器。",
        href: "https://pob.cool",
      },
      {
        idx: "08",
        name: "pobb.in",
        en: "Build Sharing",
        desc: "粘贴 PoB 代码生成分享链接，天赋树、装备、技能连接一目了然，交流 BD 的标准姿势。",
        href: "https://pobb.in",
      },
      {
        idx: "09",
        name: "poe.ninja 天梯",
        en: "Ladder Builds",
        desc: "实时抓取天梯前列角色，按职业与技能筛选主流 BD，赛季开荒抄作业首选。",
        href: "https://poe.ninja/poe1/builds",
      },
    ],
  },
];

export function App() {
  return (
    <>
      <Header />
      <Hero />
      <div className="wrap">
        {sections.map((s) => (
          <Section key={s.id} {...s} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default App;
