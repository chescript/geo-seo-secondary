'use client';

import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ProviderVisibilityData {
  provider: string;
  visibilityScore: number;
  mentionRate: number;
}

interface VisibilityBarChartProps {
  data: ProviderVisibilityData[];
  brandName: string;
  averageScore: number;
}

const chartConfig = {
  visibilityScore: {
    label: 'Visibility Score',
    color: '#111111',
  },
} satisfies ChartConfig;

export function VisibilityBarChart({ data, brandName, averageScore }: VisibilityBarChartProps) {
  // Sort data by visibility score descending
  const sortedData = [...data].sort((a, b) => b.visibilityScore - a.visibilityScore);

  // Calculate trend (compare to average)
  const topScore = sortedData[0]?.visibilityScore || 0;
  const trend = topScore > averageScore ? 'up' : 'down';
  const trendPercentage = Math.abs(((topScore - averageScore) / averageScore) * 100).toFixed(1);

  return (
    <Card className="p-2 bg-landing-card text-landing-base rounded-[6px] border border-landing-border shadow-landing-card">
      <CardHeader className="border-b border-landing-border pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="font-neueBit text-[20px] leading-[0.9] tracking-[-0.2px]">
              Provider Visibility Breakdown
            </CardTitle>
            <CardDescription className="font-geist text-[13px] text-landing-muted mt-1">
              {brandName}'s visibility across AI providers
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="font-neueBit text-[32px] leading-[0.9] text-landing-base">{averageScore}%</p>
            <p className="font-geist text-[11px] text-landing-muted mt-1">Average Score</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={sortedData}
            layout="vertical"
            margin={{
              left: 20,
              right: 30,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="provider"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="text-sm"
            />
            <XAxis
              type="number"
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  className="bg-landing-card border-landing-border"
                  formatter={(value, name, props) => (
                    <div className="flex flex-col gap-1">
                      <span className="font-geist font-semibold text-landing-base">{props.payload.provider}</span>
                      <span className="font-geist text-[13px] text-landing-body">Visibility: {value}%</span>
                      <span className="font-geist text-[11px] text-landing-muted">
                        Mention Rate: {props.payload.mentionRate}%
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Bar
              dataKey="visibilityScore"
              fill="#111111"
              radius={[0, 8, 8, 0]}
            >
              <LabelList
                dataKey="visibilityScore"
                position="right"
                offset={8}
                className="fill-foreground text-xs font-medium"
                formatter={(value: number) => `${value}%`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
        <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-landing-border">
          {trend === 'up' ? (
            <TrendingUp className="h-4 w-4 text-landing-base" />
          ) : (
            <TrendingDown className="h-4 w-4 text-landing-muted" />
          )}
          <span className="font-geist text-[13px] font-medium text-landing-body">
            Top performer is {trendPercentage}% {trend === 'up' ? 'above' : 'below'} average
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
