import { ChartSharePercentage } from '@/components/building-blocks/chart-share-percentage/chart-share-percentage';
import { ChartConfig } from '@/components/ui/chart';

export const subscriptionTierQuery = `
  SELECT subscription_tier, COUNT(organization_id) AS count FROM organizations GROUP BY subscription_tier ORDER BY count DESC
`;

export type SubscriptionTierData = {
  subscription_tier: string;
  count: number;
};

interface SubscriptionTierChartProps {
  data: SubscriptionTierData[];
}

export function SubscriptionTierChart({ data }: SubscriptionTierChartProps) {
  const chartConfig: ChartConfig = data.reduce((acc, item, index) => {
    const colorIndex = (index % 10) + 1; // Cycle through chart-1 to chart-10
    acc[item.subscription_tier.replace(/\s+/g, '')] = {
      label: item.subscription_tier,
      color: `var(--chart-${colorIndex})`,
    };
    return acc;
  }, {} as ChartConfig);

  const totalCount = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <ChartSharePercentage
      title="Organizations by Subscription Tier"
      description="Distribution of organizations across different subscription tiers."
      data={data}
      dataKey="count"
      nameKey="subscription_tier"
      chartConfig={chartConfig}
      centerValueRenderer={() => ({
        title: totalCount.toString(),
        subtitle: 'Total Orgs',
      })}
      valueFormatter={(value) => `${((value / totalCount) * 100).toFixed(0)}%`}
    />
  );
}
