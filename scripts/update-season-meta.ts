import protobuf from "protobufjs";
import { parseNdic } from "./parse-ndic";

const LEAGUE_URL = "allflame";
const LEAGUE_TYPE = "exp";
const INDEX_STATE_URL = "https://poe.ninja/poe1/api/data/index-state";
const SEARCH_TEMPLATE = "https://poe.ninja/poe1/api/builds/{version}/search?overview=allflame&type=exp";
const DICTIONARY_BASE = "https://poe.ninja/poe1/api/builds/dictionary";
const OUTPUT_PATH = "src/data/season-meta.json";
const TOP_N = 10;

const USER_AGENT = "Mozilla/5.0 (compatible; poe-helper-meta-bot/1.0)";

interface MetaItem {
  name: string;
  count: number;
  percentage: number;
}

interface DimensionResult {
  total: number;
  items: MetaItem[];
}

interface ExistingMeta {
  league: string;
  type: string;
  updatedAt: string;
  sourceUrl: string;
  notice?: string;
  ascendancy?: {
    title: string;
    items: { name: string; percentage: number; rank: number; trend: string }[];
  };
  equipment?: {
    title: string;
    items: { name: string; percentage: number; rank: number; type: string; trend: string }[];
  };
  skills?: {
    title: string;
    items: { name: string; percentage: number; rank: number; type: string; trend: string }[];
  };
}

async function fetchJson(url: string) {
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function fetchBytes(url: string) {
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return new Uint8Array(await res.arrayBuffer());
}

function buildSearchResultType(root: protobuf.Root) {
  const SearchResultDimensionCount = new protobuf.Type("SearchResultDimensionCount");
  SearchResultDimensionCount.add(new protobuf.Field("key", 1, "int32"));
  SearchResultDimensionCount.add(new protobuf.Field("count", 2, "int32"));
  root.add(SearchResultDimensionCount);

  const SearchResultDimension = new protobuf.Type("SearchResultDimension");
  SearchResultDimension.add(new protobuf.Field("id", 1, "string"));
  SearchResultDimension.add(new protobuf.Field("dictionary_id", 2, "string"));
  SearchResultDimension.add(new protobuf.Field("counts", 3, "SearchResultDimensionCount", "repeated"));
  root.add(SearchResultDimension);

  const SearchResultDictionaryReference = new protobuf.Type("SearchResultDictionaryReference");
  SearchResultDictionaryReference.add(new protobuf.Field("id", 1, "string"));
  SearchResultDictionaryReference.add(new protobuf.Field("hash", 2, "string"));
  SearchResultDictionaryReference.add(new protobuf.Field("properties_hash", 3, "string", "optional"));
  root.add(SearchResultDictionaryReference);

  const SearchResult = new protobuf.Type("SearchResult");
  SearchResult.add(new protobuf.Field("total", 1, "int32"));
  SearchResult.add(new protobuf.Field("dimensions", 2, "SearchResultDimension", "repeated"));
  SearchResult.add(new protobuf.Field("dictionaries", 6, "SearchResultDictionaryReference", "repeated"));
  root.add(SearchResult);

  const NinjaSearchResult = new protobuf.Type("NinjaSearchResult");
  NinjaSearchResult.add(new protobuf.Field("result", 1, "SearchResult"));
  root.add(NinjaSearchResult);
}

async function getSnapshotVersion(): Promise<string> {
  const state = await fetchJson(INDEX_STATE_URL) as any;
  const snapshot = state.snapshotVersions.find(
    (s: any) => s.url === LEAGUE_URL && s.type === LEAGUE_TYPE
  );
  if (!snapshot) throw new Error(`No snapshot found for ${LEAGUE_URL}/${LEAGUE_TYPE}`);
  return snapshot.version;
}

async function getSearchResult(version: string) {
  const url = SEARCH_TEMPLATE.replace("{version}", version);
  const bytes = await fetchBytes(url);

  const root = new protobuf.Root();
  buildSearchResultType(root);
  const NinjaSearchResult = root.lookupType("NinjaSearchResult");
  const decoded = NinjaSearchResult.decode(bytes) as any;
  return decoded.result;
}

async function getDictionary(hash: string): Promise<string[]> {
  const bytes = await fetchBytes(`${DICTIONARY_BASE}/${hash}`);
  return parseNdic(bytes).values;
}

function computeTrend(newItems: { name: string; rank: number }[], oldItems?: { name: string; rank: number }[]) {
  if (!oldItems) return "stable";
  const oldRank = new Map(oldItems.map((x) => [x.name, x.rank]));
  return newItems.map((item) => {
    const prev = oldRank.get(item.name);
    if (prev === undefined) return "up";
    if (item.rank < prev) return "up";
    if (item.rank > prev) return "down";
    return "stable";
  });
}

async function extractDimension(
  searchResult: any,
  dimensionId: string,
  total: number,
  labelFn?: (name: string, index: number) => string
): Promise<DimensionResult> {
  const dim = searchResult.dimensions.find((d: any) => d.id === dimensionId);
  if (!dim) throw new Error(`Dimension ${dimensionId} not found`);

  const dictRef = searchResult.dictionaries.find((d: any) => d.id === dim.dictionary_id);
  if (!dictRef) throw new Error(`Dictionary reference for ${dimensionId} not found`);

  const dictValues = await getDictionary(dictRef.hash);

  const items = dim.counts
    .map((c: any) => ({
      name: dictValues[c.key] ?? `unknown(${c.key})`,
      count: c.count,
      percentage: (c.count / total) * 100,
    }))
    .filter((x: MetaItem) => x.name && !x.name.startsWith("unknown("))
    .sort((a: MetaItem, b: MetaItem) => b.count - a.count)
    .slice(0, TOP_N)
    .map((x: MetaItem, idx: number) => ({
      ...x,
      name: labelFn ? labelFn(x.name, idx) : x.name,
    }));

  return { total, items };
}

async function main() {
  console.log(`[meta] Fetching index-state for ${LEAGUE_URL}/${LEAGUE_TYPE}...`);
  const version = await getSnapshotVersion();
  console.log(`[meta] Found snapshot version: ${version}`);

  console.log("[meta] Fetching search result...");
  const searchResult = await getSearchResult(version);
  const total = searchResult.total;
  console.log(`[meta] Total characters: ${total}`);

  console.log("[meta] Extracting ascendancy, skills and equipment...");
  const [ascendancyResult, skillsResult, equipmentResult] = await Promise.all([
    extractDimension(searchResult, "class", total),
    extractDimension(searchResult, "skills", total, (name) => {
      // Remove Vaal prefix for cleaner display; keep game terms in English.
      return name;
    }),
    extractDimension(searchResult, "items", total, (name) => {
      return name;
    }),
  ]);

  let existing: ExistingMeta | undefined;
  try {
    existing = await Bun.file(OUTPUT_PATH).json();
  } catch {
    // no existing file
  }

  const ascRanked = ascendancyResult.items.map((x, i) => ({ name: x.name, rank: i + 1 }));
  const skillRanked = skillsResult.items.map((x, i) => ({ name: x.name, rank: i + 1 }));
  const equipRanked = equipmentResult.items.map((x, i) => ({ name: x.name, rank: i + 1 }));

  const ascTrends = computeTrend(ascRanked, existing?.ascendancy?.items);
  const skillTrends = computeTrend(skillRanked, existing?.skills?.items);
  const equipTrends = computeTrend(equipRanked, existing?.equipment?.items);

  const meta = {
    league: LEAGUE_URL.charAt(0).toUpperCase() + LEAGUE_URL.slice(1),
    type: LEAGUE_TYPE,
    updatedAt: new Date().toISOString(),
    sourceUrl: `https://poe.ninja/poe1/builds/${LEAGUE_URL}`,
    notice:
      "Data is updated daily at 08:00 CST from poe.ninja's private builds search API and mirrored locally.",
    ascendancy: {
      title: "Ascendancy Usage",
      items: ascendancyResult.items.map((x, i) => ({
        name: x.name,
        percentage: Math.round(x.percentage * 100) / 100,
        rank: i + 1,
        trend: ascTrends[i],
      })),
    },
    skills: {
      title: "Skill Usage",
      items: skillsResult.items.map((x, i) => ({
        name: x.name,
        percentage: Math.round(x.percentage * 100) / 100,
        type: "Skill",
        trend: skillTrends[i],
      })),
    },
    equipment: {
      title: "Popular Equipment",
      items: equipmentResult.items.map((x, i) => ({
        name: x.name,
        percentage: Math.round(x.percentage * 100) / 100,
        type: "Item",
        trend: equipTrends[i],
      })),
    },
  };

  await Bun.write(OUTPUT_PATH, JSON.stringify(meta, null, 2) + "\n");
  console.log(`[meta] Wrote ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("[meta] Failed to update season meta:", err);
  process.exit(1);
});
