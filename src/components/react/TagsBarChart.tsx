import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

// Define chart configuration with TypeScript support
const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// Main component for rendering the bar chart
export function Component({
  tags,
}: {
  tags: {
    value: string;
    count: number;
  }[];
}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("count");

  // Calculate total count of tags for potential use in the future
  const total = React.useMemo(
    () => tags.reduce((acc, tag) => acc + tag.count, 0),
    [tags],
  );

  return (
    <Card className="min-w-[375px] w-full">
      <CardContent className="px-2 py-4 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={tags}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="value"
              tickLine={false}
              axisLine={false}
              tickMargin={9}
              minTickGap={2}
              tickFormatter={(value) =>
                value.length < 10 ? value : `${value.slice(0, 6)}...`
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="count"
                  labelFormatter={(value) => value}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default Component;
