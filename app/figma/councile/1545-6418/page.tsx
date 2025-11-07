import Image from 'next/image';
import fs from 'node:fs';
import path from 'node:path';

export const dynamic = 'force-static';

function getAssets() {
  const dir = path.join(process.cwd(), 'public', 'figma', 'councile', '1545-6418');
  const files = fs.readdirSync(dir)
    .filter((f) => !f.endsWith('asset-map.json'))
    .sort();
  return files.map((f) => ({
    name: f,
    src: `/figma/councile/1545-6418/${f}`,
  }));
}

export default function Page() {
  const assets = getAssets();
  return (
    <main className="px-6 py-8">
      <h1 className="text-2xl font-semibold mb-4">Figma Assets: Councile (1545-6418)</h1>
      <p className="text-gray-600 mb-6">All images pulled from Figma and served statically below.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {assets.map((a) => (
          <div key={a.name} className="border rounded-lg p-3 bg-white">
            <div className="text-xs mb-2 truncate" title={a.name}>{a.name}</div>
            <div className="relative w-full aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.src} alt={a.name} className="object-contain w-full h-full" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

