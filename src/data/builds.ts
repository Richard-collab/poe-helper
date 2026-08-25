export interface BuildLink {
  label: string;
  href: string;
}

export interface Build {
  id: string;
  name: string;
  nameEn: string;
  class: string;
  ascendancy: string;
  tags: string[];
  coreSkill: string;
  budget: "低价" | "中价" | "高价";
  difficulty: "简单" | "中等" | "困难";
  summary: string;
  pros: string[];
  cons: string[];
  links: BuildLink[];
}

export const recommendedBuilds: Build[] = [
  {
    id: "winter-orb-elementalist",
    name: "寒冬宝珠元素使",
    nameEn: "Winter Orb Elementalist League Starter",
    class: "witch",
    ascendancy: "元素使",
    tags: ["开荒", "法术", "投射物", "清图"],
    coreSkill: "Winter Orb / 寒冬宝珠",
    budget: "低价",
    difficulty: "中等",
    summary:
      "Maxroll 推荐的赛季开荒 BD。寒冬宝珠自动发射冰霜投射物，角色移动时也能持续输出；元素使提供元素异常免疫与高额元素增伤，剧情到异界过渡平滑。",
    pros: [
      "可移动施法，手感流畅",
      "元素使免疫元素异常",
      "清图与单体兼顾",
      "装备门槛友好",
    ],
    cons: [
      "需要维持宝珠层数",
      "对施法速度有一定要求",
      "近距离输出才能达到最大伤害",
    ],
    links: [
      { label: "Maxroll 开荒指南", href: "https://maxroll.gg/poe/build-guides/winter-orb-elementalist-league-starter" },
    ],
  },
];
