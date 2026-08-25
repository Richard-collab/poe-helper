export interface NdicDictionary {
  version: number;
  count: number;
  values: string[];
  properties: Record<string, string[]>;
}

export function parseNdic(buffer: Uint8Array): NdicDictionary {
  if (buffer.length < 4 || new TextDecoder().decode(buffer.slice(0, 4)) !== "NDIC") {
    throw new Error("Invalid NDIC buffer: missing magic");
  }
  if (buffer.length < 36) {
    throw new Error(`NDIC buffer too short: ${buffer.length} bytes`);
  }

  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const version = view.getUint32(4, true);
  const count = view.getUint32(12, true);
  const syncCount = view.getUint32(28, true);
  const lengthsRegionSize = view.getUint32(32, true);

  // The actual poe.ninja native dictionary layout:
  // [0..36) header
  // [36, 36 + syncCount * 8) sync table (ignored for name lookup)
  // [36 + syncCount * 8, 36 + syncCount * 8 + lengthsRegionSize) varint lengths
  // [36 + syncCount * 8 + lengthsRegionSize, end) concatenated UTF-8 strings
  const dataStart = 36 + syncCount * 8;
  const stringTableStart = dataStart + lengthsRegionSize;

  const decoder = new TextDecoder();
  const values: string[] = [];
  let dataPos = dataStart;
  let stringPos = stringTableStart;

  for (let i = 0; i < count; i++) {
    let length = 0;
    let shift = 0;
    // varint encoded length of the next string
    for (;;) {
      const byte = buffer[dataPos++];
      length |= (byte & 0x7f) << shift;
      if ((byte & 0x80) === 0) break;
      shift += 7;
    }
    const slice = buffer.subarray(stringPos, stringPos + length);
    values.push(decoder.decode(slice));
    stringPos += length;
  }

  return {
    version,
    count,
    values,
    properties: {},
  };
}

if (import.meta.main) {
  const file = process.argv[2] || "class-dict.bin";
  const buf = new Uint8Array(await Bun.file(file).bytes());
  const parsed = parseNdic(buf);
  console.log("version:", parsed.version);
  console.log("count:", parsed.count);
  console.log("values first 10:", parsed.values.slice(0, 10));
}
