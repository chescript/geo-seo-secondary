import fs from 'node:fs';
import path from 'node:path';
import { Button } from '@/components/ui/button';

type AssetEntry = { name: string; path: string };

function getAssetMap() {
  const mapPath = path.join(process.cwd(), 'public', 'figma', 'councile', '1545-6418', 'asset-map.json');
  const raw = fs.readFileSync(mapPath, 'utf-8');
  const list = JSON.parse(raw) as AssetEntry[];
  const map: Record<string, string> = {};
  for (const item of list) {
    // Convert to web path
    map[item.name] = '/' + item.path.replace(/\\/g, '/');
  }
  return map;
}

export default function CouncilePage() {
  const assets = getAssetMap();

  const logo = assets['imgLogo'] ?? assets['imgLogo1'] ?? assets['imgLogo2'];
  const pixelLeft = assets['img7Mjyf160WMHighlyDetailedPixelArtLandscapeInBrightDayl2Ac18033Fde24De883763Dbd91D1Cb9121'];
  const pixelRight = assets['img7Mjyf160WMHighlyDetailedPixelArtLandscapeInBrightDayl2Ac18033Fde24De883763Dbd91D1Cb9122'];
  const check = assets['imgPixelSolidBadgeCheck'] ?? assets['imgPixelSolidBadgeCheck1'];

  return (
    <main className="relative overflow-hidden">
      {/* Decorative pixel art backgrounds */}
      {pixelLeft && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={pixelLeft}
          alt=""
          className="pointer-events-none select-none hidden md:block absolute -left-24 bottom-0 w-[540px] opacity-20"
        />
      )}
      {pixelRight && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={pixelRight}
          alt=""
          className="pointer-events-none select-none hidden md:block absolute -right-24 -bottom-8 w-[580px] opacity-20"
        />
      )}

      <div className="relative z-10">
        {/* Header */}
        <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {logo && <img src={logo} alt="Councile" className="h-8" />}
            <span className="text-sm text-zinc-500">Multi-user AI Chatbot</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
            <a href="#features" className="hover:text-zinc-900">Features</a>
            <a href="#pricing" className="hover:text-zinc-900">Pricing</a>
            <a href="#faq" className="hover:text-zinc-900">FAQ</a>
          </nav>
        </header>

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-10 pb-14">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Bring AI assistance to every team member</h1>
            <p className="text-lg text-zinc-600 mb-8">
              Councile is a multi-user AI chatbot that centralizes knowledge, keeps conversations organized, and scales securely across your org.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="primary" size="sm" className="px-6 h-11">
                <a href="/register">
                  Start Free Trial
                </a>
              </Button>
              <Button asChild variant="secondary" size="sm" className="px-6 h-11">
                <a href="#features">
                  Explore Features
                </a>
              </Button>
            </div>
          </div>

          {/* Quick feature bullets */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              'Unlimited conversations and shared spaces',
              'Fine-grained access controls',
              'Enterprise-ready privacy & security',
            ].map((text) => (
              <div key={text} className="flex items-start gap-3 bg-white border rounded-lg p-4 analysis-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {check && <img src={check} alt="" className="mt-0.5 h-5 w-5" />}
                <p className="text-zinc-800">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
