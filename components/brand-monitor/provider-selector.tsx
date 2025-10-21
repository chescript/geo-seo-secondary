
import React from 'react';
import { Check, ChevronDown, Settings } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/shadcn/dropdown-menu';
import { Badge } from '@/components/ui/shadcn/badge';
import { getEnabledProviders } from '@/lib/provider-config';

interface ProviderSelectorProps {
  availableProviders: string[];
  selectedProviders: string[];
  onSelectionChange: (providers: string[]) => void;
  disabled?: boolean;
}

export function ProviderSelector({
  availableProviders,
  selectedProviders,
  onSelectionChange,
  disabled = false
}: ProviderSelectorProps) {
  const enabledProviders = getEnabledProviders();

  // Use enabled providers directly if availableProviders is empty (initialization)
  // Otherwise filter available providers to only show enabled ones
  const validProviders = availableProviders.length === 0
    ? enabledProviders.map(p => p.name)
    : availableProviders.filter(provider =>
        enabledProviders.some(config => config.name === provider)
      );

  const handleProviderToggle = (provider: string, checked: boolean) => {
    if (checked) {
      // Add provider if not already selected
      if (!selectedProviders.includes(provider)) {
        onSelectionChange([...selectedProviders, provider]);
      }
    } else {
      // Remove provider, but ensure at least one remains selected
      const newSelection = selectedProviders.filter(p => p !== provider);
      if (newSelection.length > 0) {
        onSelectionChange(newSelection);
      }
    }
  };

  const ProviderIcon = ({ provider, size = 20 }: { provider: string; size?: number }) => {
    const logoPath = `/providers/${provider.toLowerCase()}.svg`;
    return (
      <div className="flex-shrink-0" style={{ width: size, height: size }}>
        <Image
          src={logoPath}
          alt={`${provider} logo`}
          width={size}
          height={size}
          className="object-contain"
        />
      </div>
    );
  };

  const getProviderInfo = (provider: string) => {
    switch (provider) {
      case 'OpenAI':
        return {
          description: 'GPT models for comprehensive analysis',
          bgGradient: 'from-green-500 to-emerald-600',
          hoverBg: 'hover:bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'Anthropic':
        return {
          description: 'Claude models for detailed insights',
          bgGradient: 'from-orange-500 to-amber-600',
          hoverBg: 'hover:bg-orange-50',
          borderColor: 'border-orange-200'
        };
      case 'Google':
        return {
          description: 'Gemini models for search-focused analysis',
          bgGradient: 'from-blue-500 to-indigo-600',
          hoverBg: 'hover:bg-blue-50',
          borderColor: 'border-blue-200'
        };
      case 'Perplexity':
        return {
          description: 'Real-time web search capabilities',
          bgGradient: 'from-teal-500 to-cyan-600',
          hoverBg: 'hover:bg-teal-50',
          borderColor: 'border-teal-200'
        };
      default:
        return {
          description: 'AI-powered analysis',
          bgGradient: 'from-gray-500 to-gray-600',
          hoverBg: 'hover:bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  // If no providers are selected, default to all available
  const effectiveSelection = selectedProviders.length > 0 ? selectedProviders : validProviders;

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <Settings className="h-4 w-4" />
        AI Providers
      </label>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between h-auto min-h-[2.75rem] p-4 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all duration-200 rounded-lg"
            disabled={disabled || validProviders.length === 0}
          >
            <div className="flex flex-wrap gap-2 items-center">
              {effectiveSelection.length === 0 ? (
                <span className="text-gray-500 text-sm">Select providers...</span>
              ) : effectiveSelection.length === validProviders.length ? (
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {effectiveSelection.slice(0, 3).map(provider => (
                      <div key={provider} className="w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                        <ProviderIcon provider={provider} size={16} />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">All providers selected ({validProviders.length})</span>
                </div>
              ) : (
                effectiveSelection.map(provider => {
                  const info = getProviderInfo(provider);
                  return (
                    <Badge key={provider} className={`text-xs bg-gradient-to-r ${info.bgGradient} text-white hover:opacity-90 transition-opacity flex items-center gap-1.5 px-2.5 py-1`}>
                      <ProviderIcon provider={provider} size={14} />
                      {provider}
                    </Badge>
                  );
                })
              )}
            </div>
            <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-80" align="start">
          <DropdownMenuLabel className="text-xs text-gray-500 uppercase tracking-wide">
            Select AI Providers for Analysis
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {validProviders.length === 0 ? (
            <div className="p-3 text-sm text-gray-500 text-center">
              No providers available. Please check your configuration.
            </div>
          ) : (
            validProviders.map(provider => {
              const isSelected = effectiveSelection.includes(provider);
              const isLastSelected = effectiveSelection.length === 1 && isSelected;
              const info = getProviderInfo(provider);

              return (
                <DropdownMenuCheckboxItem
                  key={provider}
                  checked={isSelected}
                  onCheckedChange={(checked) => handleProviderToggle(provider, checked)}
                  disabled={isLastSelected} // Prevent unchecking the last selected provider
                  className={`flex items-start gap-3 p-3 cursor-pointer transition-colors duration-150 ${info.hoverBg} ${isSelected ? 'bg-gray-50' : ''}`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg border-2 ${info.borderColor} bg-white flex items-center justify-center shadow-sm`}>
                      <ProviderIcon provider={provider} size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-900">{provider}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {info.description}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${info.bgGradient} flex items-center justify-center flex-shrink-0`}>
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </DropdownMenuCheckboxItem>
              );
            })
          )}
          
          {validProviders.length > 1 && (
            <>
              <DropdownMenuSeparator />
              <div className="p-2 space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={() => onSelectionChange(validProviders)}
                >
                  Select All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={() => onSelectionChange([validProviders[0]])}
                  disabled={validProviders.length === 0}
                >
                  Select Only {validProviders[0]}
                </Button>
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {effectiveSelection.length > 0 && (
        <p className="text-xs text-gray-500">
          {effectiveSelection.length} provider{effectiveSelection.length !== 1 ? 's' : ''} selected
          {effectiveSelection.length > 1 && ' • Results will be compared across providers'}
        </p>
      )}
    </div>
  );
}