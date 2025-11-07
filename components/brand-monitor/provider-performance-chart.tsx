'use client';

import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface ProviderPerformanceData {
  provider: string;
  brand: number;
  topCompetitor: number;
  competitorName: string;
}

interface ProviderPerformanceChartProps {
  data: ProviderPerformanceData[];
  brandName: string;
}

const chartConfig = {
  brand: {
    label: 'Your Brand',
    color: '#111111',
  },
  topCompetitor: {
    label: 'Top Competitor',
    color: '#8b867c',
  },
} satisfies ChartConfig;

export function ProviderPerformanceChart({ data, brandName }: ProviderPerformanceChartProps) {
  // Calculate win rate
  const wins = data.filter(d => d.brand > d.topCompetitor).length;
  const winRate = ((wins / data.length) * 100).toFixed(0);

  return (
    <Card className="p-2 bg-landing-card text-landing-base rounded-[6px] border border-landing-border shadow-landing-card">
      <CardHeader className="border-b border-landing-border pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="font-neueBit text-[20px] leading-[0.9] tracking-[-0.2px]">
              Competitive Performance
            </CardTitle>
            <CardDescription className="font-geist text-[13px] text-landing-muted mt-1">
              {brandName} vs top competitor across providers
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="font-neueBit text-[32px] leading-[0.9] text-landing-base">{winRate}%</p>
            <p className="font-geist text-[11px] text-landing-muted mt-1">Win Rate</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="provider"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="font-geist text-[13px]"
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dashed"
                  className="bg-landing-card border-landing-border"
                  labelFormatter={(value, payload) => {
                    const item = payload?.[0]?.payload;
                    return (
                      <div className="flex flex-col gap-1">
                        <span className="font-geist font-semibold text-landing-base">{value}</span>
                        {item && (
                          <span className="font-geist text-[11px] text-landing-muted">
                            vs {item.competitorName}
                          </span>
                        )}
                      </div>
                    );
                  }}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="brand"
              fill="var(--color-brand)"
              radius={[4, 4, 0, 0]}
              name={brandName}
            />
            <Bar
              dataKey="topCompetitor"
              fill="var(--color-topCompetitor)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
        <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-landing-border">
          <span className="font-geist text-[13px] font-medium text-landing-body">
            Outperforming in {wins} out of {data.length} providers
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
