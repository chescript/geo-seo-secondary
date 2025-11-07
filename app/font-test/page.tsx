export default function FontTestPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold mb-8">Font Test Page</h1>

      {/* Test NeueBit font */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">PPNeueBit Test:</h2>
        <p className="font-neueBit text-6xl">
          The Quick Brown Fox
        </p>
        <p className="font-neueBit text-4xl font-bold">
          Bold: The Quick Brown Fox
        </p>
        <p className="text-sm text-gray-600">Should use PPNeueBit-Bold.otf font</p>
      </div>

      {/* Test Mondwest font */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">PPMondwest Test:</h2>
        <p className="font-mondwest text-6xl">
          The Quick Brown Fox
        </p>
        <p className="text-sm text-gray-600">Should use PPMondwest-Regular.otf font</p>
      </div>

      {/* Test Apercu font */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Apercu Mono Pro Test:</h2>
        <p className="font-apercu text-6xl font-light">
          Light: The Quick Brown Fox
        </p>
        <p className="font-apercu text-6xl">
          Regular: The Quick Brown Fox
        </p>
        <p className="font-apercu text-6xl font-medium">
          Medium: The Quick Brown Fox
        </p>
        <p className="font-apercu text-6xl font-bold">
          Bold: The Quick Brown Fox
        </p>
        <p className="text-sm text-gray-600">Should use Apercu Mono Pro font</p>
      </div>

      {/* Test Roboto Mono font */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Roboto Mono Test (ASCII Art):</h2>
        <p className="font-ascii text-6xl">
          The Quick Brown Fox
        </p>
        <p className="font-ascii text-4xl font-bold">
          Bold: The Quick Brown Fox
        </p>
        <p className="text-sm text-gray-600">Should use Roboto Mono font (for ASCII art)</p>
      </div>

      {/* Test default fonts for comparison */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Default Geist Sans Test:</h2>
        <p className="text-6xl">
          The Quick Brown Fox
        </p>
        <p className="text-sm text-gray-600">Should use Geist Sans font (default)</p>
      </div>

      {/* CSS Variable Test */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">CSS Variables Check:</h2>
        <div className="bg-gray-100 p-4 rounded text-sm font-mono">
          <p>Open DevTools Console and run:</p>
          <code className="block mt-2">
            getComputedStyle(document.documentElement).getPropertyValue('--font-neuebit')
          </code>
          <code className="block mt-1">
            getComputedStyle(document.documentElement).getPropertyValue('--font-mondwest')
          </code>
        </div>
      </div>

      {/* Network Check Instructions */}
      <div className="space-y-2 border-t pt-4">
        <h2 className="text-2xl font-bold">Debugging Steps:</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Open browser DevTools (F12)</li>
          <li>Go to Network tab</li>
          <li>Filter by "Font" or search for ".otf"</li>
          <li>Reload the page</li>
          <li>Check if PPNeueBit-Bold.otf and PPMondwest-Regular.otf are loaded</li>
          <li>If you see 404 errors, the fonts aren't being found</li>
          <li>If you see 200 OK, the fonts are loading correctly</li>
        </ol>
      </div>
    </div>
  );
}
