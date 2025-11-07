import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { CompetitorRanking, ProviderSpecificRanking } from '@/lib/types';
import { IdentifiedCompetitor } from '@/lib/brand-monitor-reducer';
import { VisibilityBarChart } from './visibility-bar-chart';
import { ProviderPerformanceChart } from './provider-performance-chart';

interface VisibilityScoreTabProps {
  competitors: CompetitorRanking[];
  brandData: CompetitorRanking;
  identifiedCompetitors: IdentifiedCompetitor[];
  providerRankings?: ProviderSpecificRanking[];
  companyName?: string;
}

export function VisibilityScoreTab({
  competitors,
  brandData,
  identifiedCompetitors,
  providerRankings,
  companyName = 'Your Brand'
}: VisibilityScoreTabProps) {
  const topCompetitor = competitors.filter(c => !c.isOwn)[0];
  const brandRank = competitors.findIndex(c => c.isOwn) + 1;
  const difference = topCompetitor ? brandData.visibilityScore - topCompetitor.visibilityScore : 0;

  // Transform provider rankings for the new charts
  const providerVisibilityData = providerRankings?.map(ranking => {
    const brandInProvider = ranking.competitors.find(c => c.isOwn);
    const totalMentions = ranking.competitors.reduce((sum, c) => sum + (c.shareOfVoice || 0), 0);
    const mentionRate = totalMentions > 0 ? ((brandInProvider?.shareOfVoice || 0) / totalMentions * 100) : 0;

    return {
      provider: ranking.provider,
      visibilityScore: brandInProvider?.visibilityScore || 0,
      mentionRate: Math.round(mentionRate)
    };
  }) || [];

  const providerPerformanceData = providerRankings?.map(ranking => {
    const brandInProvider = ranking.competitors.find(c => c.isOwn);
    const competitorsInProvider = ranking.competitors.filter(c => !c.isOwn);
    const topInProvider = competitorsInProvider[0];

    return {
      provider: ranking.provider,
      brand: brandInProvider?.visibilityScore || 0,
      topCompetitor: topInProvider?.visibilityScore || 0,
      competitorName: topInProvider?.name || 'N/A'
    };
  }) || [];

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Main Content Card */}
      <Card className="analysis-card bg-landing-card text-landing-base border-landing-border gap-6 h-full flex flex-col">
        <CardHeader className="border-b border-landing-border px-6 sm:px-8">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="font-neueBit text-[32px] leading-[0.9] tracking-[-0.32px]">Visibility Score</CardTitle>
              <CardDescription className="font-geist text-[13px] text-landing-muted mt-2">
                Your brand visibility across AI providers
              </CardDescription>
            </div>
            {/* Visibility Score in top right */}
            <div className="text-right">
              <p className="font-neueBit text-[40px] leading-[0.9] text-landing-base">{brandData.visibilityScore}%</p>
              <p className="font-geist text-[11px] text-landing-muted mt-2">
                Overall score
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 px-6 sm:px-8 flex-1">
          <div className="flex gap-8">
            {/* Left side - Pie Chart */}
            <div className="flex-1">
              <div className="h-80 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#111111" />
                        <stop offset="100%" stopColor="#4a473f" />
                      </linearGradient>
                      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                        <feOffset dx="0" dy="2" result="offsetblur"/>
                        <feFlood floodColor="#000000" floodOpacity="0.1"/>
                        <feComposite in2="offsetblur" operator="in"/>
                        <feMerge>
                          <feMergeNode/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <Pie
                      data={competitors.slice(0, 8).map((competitor) => ({
                        name: competitor.name,
                        value: competitor.visibilityScore,
                        isOwn: competitor.isOwn
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={1}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                      animationBegin={0}
                      animationDuration={800}
                      filter="url(#shadow)"
                    >
                      {competitors.slice(0, 8).map((competitor, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={competitor.isOwn ? 'url(#brandGradient)' :
                            ['#8b867c', '#a8a399', '#c5bfb3', '#d7d0c3', '#ece8dd', '#b5afa3', '#9d988d', '#8a857a'][idx % 8]}
                          stroke={competitor.isOwn ? '#111111' : 'none'}
                          strokeWidth={competitor.isOwn ? 2 : 0}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fdfbf5',
                        border: '1px solid #ece8dd',
                        borderRadius: '6px',
                        fontSize: '13px',
                        padding: '8px 12px',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
                        fontFamily: 'var(--font-geist-sans)'
                      }}
                      formatter={(value: number, name: string) => [`${value}% visibility`, name]}
                      labelStyle={{ fontWeight: 600, color: '#111111' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Center text showing relative performance */}
                <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <p className="font-neueBit text-[36px] leading-none text-landing-base">#{brandRank}</p>
                  <p className="font-geist text-[13px] text-landing-muted mt-2">Rank</p>
                  {difference !== 0 && (
                    <p className={`font-geist text-[12px] mt-2 font-medium ${difference > 0 ? 'text-landing-body' : 'text-landing-muted'}`}>
                      {difference > 0 ? '+' : ''}{Math.abs(difference).toFixed(1)}% vs #1
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right side - Legend */}
            <div className="w-80 space-y-2">
              {competitors.slice(0, 8).map((competitor, idx) => {
                const competitorData = identifiedCompetitors.find(c =>
                  c.name === competitor.name ||
                  c.name.toLowerCase() === competitor.name.toLowerCase()
                );
                const faviconUrl = competitorData?.url ?
                  `https://www.google.com/s2/favicons?domain=${competitorData.url}&sz=64` : null;

                const color = competitor.isOwn ? '#111111' :
                  ['#8b867c', '#a8a399', '#c5bfb3', '#d7d0c3', '#ece8dd', '#b5afa3', '#9d988d', '#8a857a'][idx % 8];

                return (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-5 h-5 rounded flex items-center justify-center bg-landing-background flex-shrink-0">
                        {faviconUrl ? (
                          <img
                            src={faviconUrl}
                            alt={competitor.name}
                            className="w-4 h-4 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.nextSibling as HTMLDivElement;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className={`w-full h-full ${
                          competitor.isOwn ? 'bg-landing-base' : 'bg-landing-muted'
                        } flex items-center justify-center text-white font-geist text-[8px] font-bold rounded`}
                        style={{ display: faviconUrl ? 'none' : 'flex' }}>
                          {competitor.name.charAt(0)}
                        </div>
                      </div>
                      <span className={`font-geist text-[13px] truncate ${
                        competitor.isOwn ? 'font-semibold text-landing-base' : 'font-medium text-landing-body'
                      }`}>
                        {competitor.name}
                      </span>
                      <span className="font-geist text-[13px] font-semibold text-landing-base ml-auto">
                        {competitor.visibilityScore}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Provider-specific visualizations */}
      {providerRankings && providerRankings.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VisibilityBarChart
            data={providerVisibilityData}
            brandName={companyName}
            averageScore={brandData.visibilityScore}
          />
          <ProviderPerformanceChart
            data={providerPerformanceData}
            brandName={companyName}
          />
        </div>
      )}
    </div>
  );
}
