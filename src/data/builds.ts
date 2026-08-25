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
    id: "rf",
    name: "正义之火",
    nameEn: "Righteous Fire",
    class: " templar",
    ascendancy: "判官",
    tags: ["开荒", "近战", "坦克", "低价"],
    coreSkill: "Righteous Fire / 正义之火",
    budget: "低价",
    difficulty: "简单",
    summary:
      "老牌懒人开荒 BD。角色周围持续燃烧敌人，坦度极高、操作简单，边走位边烫怪即可farm剧情与异界。",
    pros: ["硬度高，适合新手", "刷图安逸，不需要精准瞄准", "装备门槛低，剧情即可启动"],
    cons: ["单体偏慢", "非常依赖火焰抗性上限与生命恢复"],
    links: [
      { label: "PoB 模板", href: "https://pobb.in" },
      { label: "poe.ninja 天梯", href: "https://poe.ninja/poe1/builds?skill=Righteous-Fire" },
    ],
  },
  {
    id: "ls-raider",
    name: "闪电箭锐眼",
    nameEn: "Lightning Arrow Deadeye",
    class: " ranger",
    ascendancy: "锐眼",
    tags: ["速刷", "远程", "清图", "中价"],
    coreSkill: "Lightning Arrow / 闪电箭",
    budget: "中价",
    difficulty: "中等",
    summary:
      "传统弓系速刷 BD。利用锐眼的弹射与连锁天赋，闪电箭在地图里全自动清屏，后期可转龙卷射击。",
    pros: ["清图效率顶尖", "打击感与视觉反馈强", "成型后打宝收益高"],
    cons: ["前期弓类武器较脆", "需要一定攻速与暴击投资"],
    links: [
      { label: "PoB 模板", href: "https://pobb.in" },
      { label: "poe.ninja 天梯", href: "https://poe.ninja/poe1/builds?skill=Lightning-Arrow" },
    ],
  },
  {
    id: "seismic",
    name: "震波陷阱破坏者",
    nameEn: "Seismic Trap Saboteur",
    class: " shadow",
    ascendancy: "破坏者",
    tags: ["开荒", "陷阱", "单体", "低价"],
    coreSkill: "Seismic Trap / 震波陷阱",
    budget: "低价",
    difficulty: "中等",
    summary:
      "性价比之王。破坏者升华提供大量陷阱增伤，震波陷阱负责 boss 输出，exsanguinate 陷阱负责清图。",
    pros: ["低造价打穿异界", "单体爆发极高", "不需要高额防御面即可过 boss"],
    cons: ["陷阱手感需要适应", "清图节奏略慢于弓系"],
    links: [
      { label: "PoB 模板", href: "https://pobb.in" },
      { label: "poe.ninja 天梯", href: "https://poe.ninja/poe1/builds?skill=Seismic-Trap" },
    ],
  },
  {
    id: "ea-elementalist",
    name: "元素使点燃爆炸箭",
    nameEn: "Explosive Arrow Elementalist",
    class: " witch",
    ascendancy: "元素使",
    tags: ["开荒", "图腾", "点燃", "低价"],
    coreSkill: "Explosive Arrow / 爆炸箭",
    budget: "低价",
    difficulty: "中等",
    summary:
      "通过图腾一次性叠加大量爆炸箭，触发巨型点燃伤害。元素使提供免疫元素异常与高额点燃增伤。",
    pros: [" boss 战输出稳定", "可免疫元素异常", "装备需求低"],
    cons: ["需要预判箭矢落地", "刷图需要图腾辅助"],
    links: [
      { label: "PoB 模板", href: "https://pobb.in" },
      { label: "poe.ninja 天梯", href: "https://poe.ninja/poe1/builds?skill=Explosive-Arrow" },
    ],
  },
  {
    id: "pcoc",
    name: "忏悔烙印判官",
    nameEn: "Penance Brand Inquisitor",
    class: " templar",
    ascendancy: "判官",
    tags: ["后期", "烙印", "暴击", "高价"],
    coreSkill: "Penance Brand / 忏悔烙印",
    budget: "高价",
    difficulty: "中等",
    summary:
      "高投资法系 BD。烙印自动吸附敌人并连锁爆发，判官提供优秀的暴击与元素无视抗性，适合后期攻坚。",
    pros: ["自动寻敌，走位友好", "后期 scaling 极高", "视觉效果华丽"],
    cons: ["启动成本较高", "对施法速度有硬性要求"],
    links: [
      { label: "PoB 模板", href: "https://pobb.in" },
      { label: "poe.ninja 天梯", href: "https://poe.ninja/poe1/builds?skill=Penance-Brand" },
    ],
  },
];
