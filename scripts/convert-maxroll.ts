import { writeFileSync } from "fs";

const raw = await Bun.file("maxroll-data.json").json();
const post = raw.post;
const planner = post.gutenbergBlock[0].plannerProfile;

function lexicalToText(node: any): string {
  if (!node) return "";

  if (node.type === "text") {
    return node.text || "";
  }

  if (node.type === "embed") {
    return node.text || "";
  }

  if (node.children && Array.isArray(node.children)) {
    const children = node.children.map(lexicalToText).join("");

    if (node.type === "paragraph") {
      return children ? `<p>${children}</p>` : "";
    }
    if (node.type === "listitem") {
      return children ? `<li>${children}</li>` : "";
    }
    if (node.type === "list") {
      const tag = node.listType === "number" ? "ol" : "ul";
      return `<${tag}>${children}</${tag}>`;
    }
    if (node.type === "heading") {
      return `<h${node.tag}>${children}</h${node.tag}>`;
    }

    return children;
  }

  return "";
}

function cleanHtml(html: string): string {
  return html
    .replace(/<p><\/p>/g, "")
    .replace(/\n+/g, "\n")
    .trim();
}

function formatGems(gems: any[]): string {
  return gems.map((g) => g.id).join(" → ");
}

function transformProfile(p: any) {
  const activeEquip = p.equipment.variants[p.equipment.active];
  const activeSkills = p.skills.step !== undefined ? p.skills.steps[p.skills.step] : p.skills.steps[0];

  return {
    name: p.name,
    level: p.level,
    equipment: activeEquip?.items
      ? Object.entries(activeEquip.items).map(([slot, id]) => ({ slot, id }))
      : [],
    equipmentVariants: p.equipment.variants.map((v: any) => ({
      name: v.name,
      items: Object.entries(v.items || {}).map(([slot, id]) => ({ slot, id })),
    })),
    skills: activeSkills?.skills?.map((group: any) => ({
      slot: group.slot || "Main",
      gems: group.gems.map((g: any) => g.id),
    })),
    passives: p.passives,
    ascendancy: p.ascendancy,
    bandits: p.bandits,
    pantheon: p.pantheon,
    skillRotations: p.skillRotations?.map((r: any) => ({
      name: r.name,
      html: cleanHtml(lexicalToText(r.notes?.root)),
      gems: r.groups?.map((g: any) => g.gems.map((gem: any) => gem.id)) || [],
    })),
  };
}

const out = {
  title: post.title,
  slug: post.slug,
  author: post.author?.name,
  date: post.date,
  modified: post.modified,
  featuredImage: post.featuredImage,
  tags: post.tags.map((t: any) => t.name),
  category: post.category,
  tableOfContents: post.tableOfContents.items.map((i: any) => ({ id: i.id, title: i.title })),
  plannerLink: `https://maxroll.gg/poe/planner/${planner.id}`,
  overview: cleanHtml(lexicalToText(planner.data.profiles[0].widgetNotes?.genesis?.root)),
  profiles: planner.data.profiles.map(transformProfile),
  widgetNotes: Object.fromEntries(
    Object.entries(planner.data.profiles[0].widgetNotes || {}).map(([key, value]: [string, any]) => [
      key,
      cleanHtml(lexicalToText(value?.root)),
    ])
  ),
};

writeFileSync("src/data/maxroll-build.json", JSON.stringify(out, null, 2));
console.log("Converted to src/data/maxroll-build.json");
