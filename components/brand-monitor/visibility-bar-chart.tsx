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
    color: 'var(--chart-1)',
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
    <Card className="p-2 bg-card text-card-foreground rounded-xl border shadow-sm border-gray-200">
      <CardHeader className="border-b pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold">
              Provider Visibility Breakdown
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 mt-1">
              {brandName}'s visibility across AI providers
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-orange-600">{averageScore}%</p>
            <p className="text-xs text-gray-500 mt-1">Average Score</p>
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
                  formatter={(value, name, props) => (
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">{props.payload.provider}</span>
                      <span className="text-sm">Visibility: {value}%</span>
                      <span className="text-xs text-gray-500">
                        Mention Rate: {props.payload.mentionRate}%
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Bar
              dataKey="visibilityScore"
              fill="hsl(var(--chart-1))"
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
        <div className="flex items-center justify-center gap-2 text-sm mt-4 pt-4 border-t">
          {trend === 'up' ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
          <span className="font-medium">
            Top performer is {trendPercentage}% {trend === 'up' ? 'above' : 'below'} average
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
