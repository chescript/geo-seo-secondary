"use client";

import React, { useState } from "react";
import { ProviderSelector } from "@/components/brand-monitor/provider-selector";

export default function TestProviderSelectorPage() {
  const [selectedProviders, setSelectedProviders] = useState<string[]>([
    "OpenAI",
    "Anthropic",
  ]);
  const availableProviders = ["OpenAI", "Anthropic", "Perplexity"];

  const handleSelectionChange = (providers: string[]) => {
    setSelectedProviders(providers);
    console.log("Selected providers:", providers);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Provider Selector Test
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Test Provider Selection
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select AI Providers for Analysis
              </label>
              <ProviderSelector
                availableProviders={availableProviders}
                selectedProviders={selectedProviders}
                onSelectionChange={handleSelectionChange}
                disabled={false}
              />
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Current Selection:
              </h3>
              <p className="text-sm text-gray-600">
                {selectedProviders.length > 0
                  ? selectedProviders.join(", ")
                  : "No providers selected"}
              </p>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                Available Providers:
              </h3>
              <p className="text-sm text-blue-600">
                {availableProviders.join(", ")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Test Disabled State
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disabled Provider Selector
            </label>
            <ProviderSelector
              availableProviders={availableProviders}
              selectedProviders={selectedProviders}
              onSelectionChange={handleSelectionChange}
              disabled={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}