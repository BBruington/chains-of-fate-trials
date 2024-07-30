import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";

export default function MixturePropertiesChart() {
  const propertyValues = [
    { property: "abjuration", magic: 1 },
    { property: "conjuration", magic: 1 },
    { property: "divination", magic: 0 },
    { property: "enchantment", magic: 0 },
    { property: "evocation", magic: 4 },
    { property: "illusion", magic: 5 },
    { property: "necromancy", magic: 20 },
    { property: "transmutation", magic: 12 },
  ];
  const chartConfig = {
    magic: {
      label: "School",
      color: "#2563eb",
    },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={propertyValues}>
        <Bar dataKey="magic" fill="var(--color-magic)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
