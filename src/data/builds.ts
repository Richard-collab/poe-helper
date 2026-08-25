export interface BuildLink {
  label: string;
  href: string;
}

export interface GearSlot {
  slot: string;
  name: string;
  note?: string;
}

export interface SkillLink {
  name: string;
  gems: string[];
  note?: string;
}

export interface LevelStep {
  level: string;
  note: string;
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
  overview: string[];
  pros: string[];
  cons: string[];
  gear: GearSlot[];
  skills: SkillLink[];
  treeUrl: string;
  ascendancyOrder: string[];
  pantheon: { major: string; minor: string };
  bandit: string;
  levelProgression: LevelStep[];
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
    overview: [
      "Winter Orb Elementalist 是元素使升华配合寒冬宝珠技能的法术清图流派。寒冬宝珠在角色身边持续生成并自动向附近敌人发射冰霜投射物，因此你可以在移动、走位的同时保持输出。",
      "元素使升华提供对元素异常的免疫以及强大的元素汇聚（Exposure）效果，配合 Herald of Ice 与寒冰技能，可以实现非常流畅的剧情与异界开荒体验。",
      "本指南为 League Starter 版本，目标是低造价、易获取装备、平滑过渡到异界地图（Maps）。后期可转向更高投入的版本或更换核心技能。",
    ],
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
    gear: [
      { slot: "武器", name: "Wand / 魔杖", note: "优先找 +1 所有法术技能宝石、冰霜伤害、施法速度、暴击率（后期）" },
      { slot: "盾牌", name: "Shield / 盾牌", note: "生命、抗性、施法速度；后期可换法格盾" },
      { slot: "头盔", name: "Helmet / 头盔", note: "生命、抗性、能量护盾；留意附近有敌人减抗附魔" },
      { slot: "胸甲", name: "Body Armour / 胸甲", note: "生命、抗性；赛季初可用任意高生命黄装" },
      { slot: "手套", name: "Gloves / 手套", note: "生命、抗性、攻击速度（可选）" },
      { slot: "靴子", name: "Boots / 靴子", note: "生命、抗性、移动速度 30%" },
      { slot: "腰带", name: "Belt / 腰带", note: "生命、抗性；后期可用 Stygian Vise 插珠宝" },
      { slot: "项链", name: "Amulet / 项链", note: "生命、施法速度、抗性；后期找 +1 冰霜宝石" },
      { slot: "戒指", name: "Rings / 戒指 ×2", note: "生命、抗性、补足属性需求" },
    ],
    skills: [
      {
        name: "主输出 · 寒冬宝珠",
        gems: ["Winter Orb", "Greater Multiple Projectiles", "Added Lightning Damage", "Added Cold Damage", "Elemental Damage with Attacks / Inspiration"],
        note: "剧情期先用低阶辅助宝石，异界后逐步替换为 Controlled Destruction、Hypothermia、Cold Penetration 等。",
      },
      {
        name: "位移 · 烈焰冲刺",
        gems: ["Flame Dash", "Second Wind", "Arcane Surge"],
        note: "提供机动性与奥术涌动增伤。",
      },
      {
        name: "光环 · 战旗与捷",
        gems: ["Herald of Ice", "Summon Skitterbots", "Clarity / 清晰"],
        note: "保留魔力不溢出；后期可加入 Discipline 或 Zealotry。",
      },
      {
        name: "防御 · 不朽怒吼",
        gems: ["Immortal Call", "Cast when Damage Taken", "Increased Duration"],
        note: "绑定受到伤害释放，提供减伤窗口。",
      },
    ],
    treeUrl: "https://www.pathofexile.com/passive-skill-tree/3.25.0/AAAABgM...（占位，请从 PoB 生成）",
    ascendancyOrder: ["Shaper of Storms", "Mastermind of Discord", "Bastard Elementalist", "Liege of the Primordial"],
    pantheon: { major: "Soul of the Brine King（防晕）", minor: "Soul of Shakari（减毒）或 Soul of Garukhan（移动免伤）" },
    bandit: "帮助阿莉亚（Alira）获得 +15% 元素抗性、暴击倍率与回蓝；或全杀拿 2 天赋点。通常建议帮助阿莉亚。",
    levelProgression: [
      { level: "剧情 Act 1-3", note: "用 Frostbolt / Freezing Pulse 过渡，拿到 Winter Orb 后立即切换。" },
      { level: "剧情 Act 4-5", note: "补充生命与抗性，优先开启 Herald of Ice。" },
      { level: "剧情 Act 6-10", note: "购买技能宝石，完成元素使升华 Mastermind of Discord。" },
      { level: "异界 T1-T10", note: "使用 4L/5L 寒冬宝珠，farm 地图积累通货。" },
      { level: "异界 T11-T16", note: "升级至 6 连胸甲，补充暴击与施法速度，提升生存面。" },
    ],
    links: [
      { label: "Maxroll 原文", href: "https://maxroll.gg/poe/build-guides/winter-orb-elementalist-league-starter" },
    ],
  },
];
