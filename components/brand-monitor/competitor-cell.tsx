'use client';

import React from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

interface CompetitorCellProps {
  name: string;
  isOwn?: boolean;
  description?: string;
  favicon?: string;
  url?: string;
}

export const CompetitorCell: React.FC<CompetitorCellProps> = ({
  name,
  isOwn = false,
  description,
  favicon,
  url
}) => {
  const [faviconError, setFaviconError] = React.useState(false);
  
  // Generate favicon URL if not provided
  const faviconUrl = favicon || (url ? `https://www.google.com/s2/favicons?domain=${url}&sz=64` : null);
  
  return (
    <div className="flex items-center gap-2 p-3 hover:bg-landing-background transition-colors">
      <div className="w-6 h-6 flex items-center justify-center rounded overflow-hidden flex-shrink-0">
        {faviconUrl && !faviconError ? (
          <Image
            src={faviconUrl}
            alt={`${name} logo`}
            width={24}
            height={24}
            className="object-contain"
            onError={() => setFaviconError(true)}
          />
        ) : (
          <div className="w-6 h-6 bg-landing-border rounded flex items-center justify-center">
            <span className="text-landing-muted font-geist text-[11px] font-semibold">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          {url && !isOwn ? (
            <a
              href={url.startsWith('http') ? url : `https://${url}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-geist text-[13px] font-medium hover:underline ${isOwn ? 'text-landing-base font-semibold' : 'text-landing-base hover:text-landing-body'} flex items-center gap-1`}
              onClick={(e) => e.stopPropagation()}
            >
              {name}
              <ExternalLink className="w-3.5 h-3.5 text-landing-muted" />
            </a>
          ) : (
            <h3 className={`font-geist text-[13px] font-medium ${isOwn ? 'font-semibold' : ''}`}>
              {name}
            </h3>
          )}
        </div>
        {description && (
          <p className="font-geist text-[11px] text-landing-muted">{description}</p>
        )}
      </div>
    </div>
  );
};