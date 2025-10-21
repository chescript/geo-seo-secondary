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
    color: 'hsl(var(--chart-1))',
  },
  topCompetitor: {
    label: 'Top Competitor',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function ProviderPerformanceChart({ data, brandName }: ProviderPerformanceChartProps) {
  // Calculate win rate
  const wins = data.filter(d => d.brand > d.topCompetitor).length;
  const winRate = ((wins / data.length) * 100).toFixed(0);

  return (
    <Card className="p-2 bg-card text-card-foreground rounded-xl border shadow-sm border-gray-200">
      <CardHeader className="border-b pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold">
              Competitive Performance
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 mt-1">
              {brandName} vs top competitor across providers
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-orange-600">{winRate}%</p>
            <p className="text-xs text-gray-500 mt-1">Win Rate</p>
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
              className="text-sm"
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dashed"
                  labelFormatter={(value, payload) => {
                    const item = payload?.[0]?.payload;
                    return (
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">{value}</span>
                        {item && (
                          <span className="text-xs text-gray-500">
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
        <div className="flex items-center justify-center gap-2 text-sm mt-4 pt-4 border-t text-gray-600">
          <span>
            Outperforming in {wins} out of {data.length} providers
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
