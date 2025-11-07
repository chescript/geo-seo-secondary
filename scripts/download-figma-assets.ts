import fs from 'node:fs';
import path from 'node:path';
import fetch from 'node-fetch';

type Asset = { name: string; url: string };

// Extracted from Figma get_design_context for node 1545-6418
const assets: Asset[] = [
  { name: 'imgFrame2147226628', url: 'https://www.figma.com/api/mcp/asset/b1fcc984-7637-454f-8b1a-5c0dfeb20f36' },
  { name: 'imgFrame2147226625', url: 'https://www.figma.com/api/mcp/asset/59200e6b-1755-4076-8d2d-50a38d9ea287' },
  { name: 'imgFrame2147226626', url: 'https://www.figma.com/api/mcp/asset/a36452f1-bb89-49ee-8a51-cc36c571c624' },
  { name: 'imgFrame2147226679', url: 'https://www.figma.com/api/mcp/asset/09f54006-853b-4e86-99c7-2713fdb2b004' },
  { name: 'imgFrame2147226673', url: 'https://www.figma.com/api/mcp/asset/bc69c6d5-9b2f-485f-805f-46399ef840d0' },
  { name: 'imgLine2', url: 'https://www.figma.com/api/mcp/asset/cef5ea20-d716-4425-bd00-a4b11bea815f' },
  { name: 'imgLine9', url: 'https://www.figma.com/api/mcp/asset/12e9d360-a3aa-407b-a343-4c8a7f2d3a0b' },
  { name: 'img7Mjyf160WMHighlyDetailedPixelArtLandscapeInBrightDayl2Ac18033Fde24De883763Dbd91D1Cb9121', url: 'https://www.figma.com/api/mcp/asset/3db1780f-bc39-4e48-99b4-5e1a47bbcae3' },
  { name: 'img7Mjyf160WMHighlyDetailedPixelArtLandscapeInBrightDayl2Ac18033Fde24De883763Dbd91D1Cb9122', url: 'https://www.figma.com/api/mcp/asset/b1d2a8c6-4f23-47fd-a656-73c2caef10e9' },
  { name: 'imgLine10', url: 'https://www.figma.com/api/mcp/asset/42dbb6ef-dfb9-497b-adf9-329d759be871' },
  { name: 'imgLine11', url: 'https://www.figma.com/api/mcp/asset/d324fae4-8629-4906-b176-6382e13c8352' },
  { name: 'imgLine12', url: 'https://www.figma.com/api/mcp/asset/9b2e2009-54be-4d4f-85d9-e41339e47e9d' },
  { name: 'imgImage1519', url: 'https://www.figma.com/api/mcp/asset/b3863327-57c2-4081-9c1d-be1fbf8c482a' },
  { name: 'imgImage1520', url: 'https://www.figma.com/api/mcp/asset/6e3abf8f-a68d-4a85-8364-5b1654fb3be1' },
  { name: 'imgLogo', url: 'https://www.figma.com/api/mcp/asset/58e0595c-f1c0-48da-b380-5e0215e6263b' },
  { name: 'imgFrame', url: 'https://www.figma.com/api/mcp/asset/8fb679e4-3e7b-4772-855a-8152039280df' },
  { name: 'imgFrame1', url: 'https://www.figma.com/api/mcp/asset/3eb91edb-ae2f-474a-8199-32fdd7f9eaab' },
  { name: 'imgFrame2', url: 'https://www.figma.com/api/mcp/asset/899786e9-f796-4ab6-a816-2363700fe05c' },
  { name: 'imgFrame3', url: 'https://www.figma.com/api/mcp/asset/66536a79-0c60-4ee4-9225-24a9699abde0' },
  { name: 'imgLine4', url: 'https://www.figma.com/api/mcp/asset/b9c55c44-6527-49c0-82c7-203a339f446d' },
  { name: 'imgPixelSolidBadgeCheck', url: 'https://www.figma.com/api/mcp/asset/55469098-d53c-4410-a787-1a99680c59ee' },
  { name: 'imgFrame4', url: 'https://www.figma.com/api/mcp/asset/f899221f-24bc-4bd5-b12d-7f4a225179c0' },
  { name: 'imgPixelSolidBadgeCheck1', url: 'https://www.figma.com/api/mcp/asset/9e95bee9-ab08-4889-830b-04c7929a7db3' },
  { name: 'imgFrame5', url: 'https://www.figma.com/api/mcp/asset/bdaea369-85f3-4f4e-83a4-964dc8d16f19' },
  { name: 'imgPixelSolidBadgeCheck2', url: 'https://www.figma.com/api/mcp/asset/2fa9523a-e4ea-476d-826d-6e12d91f5aca' },
  { name: 'imgFrame6', url: 'https://www.figma.com/api/mcp/asset/6274898f-dbca-48cc-8623-ffae7fbbd8e9' },
  { name: 'imgPixelSolidBadgeCheck3', url: 'https://www.figma.com/api/mcp/asset/c5c5aebf-8664-42f1-ad1e-5b0bc4ee00cd' },
  { name: 'imgFrame7', url: 'https://www.figma.com/api/mcp/asset/b72f99be-7d89-40f6-a0bb-1a62b4b9ab99' },
  { name: 'imgPixelSolidBadgeCheck4', url: 'https://www.figma.com/api/mcp/asset/ebdc5fb2-cb83-46f5-b8f2-97fabdb087b5' },
  { name: 'imgFrame8', url: 'https://www.figma.com/api/mcp/asset/f5861fcc-6abf-4ee3-b96e-3939b3570150' },
  { name: 'imgPixelSolidBadgeCheck5', url: 'https://www.figma.com/api/mcp/asset/70daf67c-1501-4a52-9db3-2961a18b88b2' },
  { name: 'imgFrame9', url: 'https://www.figma.com/api/mcp/asset/413e0023-fb5d-49f0-a803-8542b03dc5ed' },
  { name: 'imgPixelSolidBadgeCheck6', url: 'https://www.figma.com/api/mcp/asset/ecfba0f4-db4b-452b-a4ca-9ed803355e7c' },
  { name: 'imgFrame10', url: 'https://www.figma.com/api/mcp/asset/b6c587d9-e75c-4777-ab71-949e851d27ea' },
  { name: 'imgPixelSolidBadgeCheck7', url: 'https://www.figma.com/api/mcp/asset/d9f52fb4-e5cc-4859-bf72-f01a3366eef4' },
  { name: 'imgFrame11', url: 'https://www.figma.com/api/mcp/asset/0e286903-747d-4983-a26d-5a929f11b6a9' },
  { name: 'imgPixelSolidBadgeCheck8', url: 'https://www.figma.com/api/mcp/asset/1097aa62-92ed-4c4e-b958-bbaedcb76039' },
  { name: 'imgPixelSolidTimesCircle', url: 'https://www.figma.com/api/mcp/asset/449a9d3a-9d9e-4732-9f34-6da662c07a4c' },
  { name: 'imgPixelSolidTimesCircle1', url: 'https://www.figma.com/api/mcp/asset/3579ebef-bc51-41af-a81c-0827d87c6c21' },
  { name: 'imgPixelSolidBadgeCheck9', url: 'https://www.figma.com/api/mcp/asset/3bea8f17-f2fc-463b-b79a-dabf76162424' },
  { name: 'imgPixelSolidBadgeCheck10', url: 'https://www.figma.com/api/mcp/asset/a563bf44-6ad7-4415-847b-817ea140411f' },
  { name: 'imgPixelSolidSparkles', url: 'https://www.figma.com/api/mcp/asset/ff478740-2e34-4dea-96bb-08165e2778de' },
  { name: 'imgLine3', url: 'https://www.figma.com/api/mcp/asset/4ce3f53e-522d-426b-9eba-352383101945' },
  { name: 'imgFrame12', url: 'https://www.figma.com/api/mcp/asset/69c7acf7-a05b-40bf-85f2-bec25ce47c7b' },
  { name: 'imgLine5', url: 'https://www.figma.com/api/mcp/asset/554cd621-27ed-4b36-a1ae-260f3ed45ae3' },
  { name: 'imgLogo1', url: 'https://www.figma.com/api/mcp/asset/34fce05b-ee15-449a-8431-0f604c7957db' },
  { name: 'imgLogo2', url: 'https://www.figma.com/api/mcp/asset/e64c6e39-bcbb-4130-96d3-bb009709be2f' },
];

const outDir = path.join(process.cwd(), 'public', 'figma', 'councile', '1545-6418');

async function ensureDir(dir: string) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function downloadAsset(asset: Asset) {
  const res = await fetch(asset.url);
  if (!res.ok) throw new Error(`Failed ${asset.name}: ${res.status} ${res.statusText}`);

  const contentType = res.headers.get('content-type') || '';
  let ext = '.bin';
  if (contentType.includes('image/png')) ext = '.png';
  else if (contentType.includes('image/jpeg')) ext = '.jpg';
  else if (contentType.includes('image/svg')) ext = '.svg';
  else if (contentType.includes('image/webp')) ext = '.webp';
  else if (contentType.includes('application/json')) ext = '.json';

  const filePath = path.join(outDir, `${asset.name}${ext}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.promises.writeFile(filePath, buf);
  return path.relative(process.cwd(), filePath);
}

async function main() {
  await ensureDir(outDir);
  console.log(`Downloading ${assets.length} assets to ${outDir}`);
  const results: { name: string; path: string }[] = [];
  for (const a of assets) {
    try {
      const p = await downloadAsset(a);
      results.push({ name: a.name, path: p });
      console.log(`✔ ${a.name} -> ${p}`);
    } catch (err: any) {
      console.error(`✖ ${a.name} failed:`, err.message || err);
    }
  }
  const mapPath = path.join(outDir, 'asset-map.json');
  await fs.promises.writeFile(mapPath, JSON.stringify(results, null, 2));
  console.log(`Wrote map: ${path.relative(process.cwd(), mapPath)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

