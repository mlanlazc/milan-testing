import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { UniversalChartCard } from '@/components/building-blocks/universal-chart-card/universal-chart-card';
import { ChartConfig } from '@/components/ui/chart';

export const industryDistributionQuery = `
  SELECT industry, COUNT(organization_id) AS count FROM organizations GROUP BY industry ORDER BY count DESC
`;

export type IndustryDistributionData = {
  industry: string;
  count: number;
};

interface IndustryDistributionChartProps {
  data: IndustryDistributionData[];
}

export function IndustryDistributionChart({ data }: IndustryDistributionChartProps) {
  const chartConfig: ChartConfig = {
    count: {
      label: 'Organizations',
      color: 'var(--chart-2)',
    },
  };

  return (
    <UniversalChartCard
      title="Organizations by Industry"
      description="Distribution of organizations across various industries."
      chartConfig={chartConfig}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="industry" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" stroke="var(--chart-2-stroke)" fill="var(--chart-2)" />
        </BarChart>
      </ResponsiveContainer>
    </UniversalChartCard>
  );
}
