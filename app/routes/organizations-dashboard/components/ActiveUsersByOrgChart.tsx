import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { UniversalChartCard } from '@/components/building-blocks/universal-chart-card/universal-chart-card';
import { ChartConfig } from '@/components/ui/chart';

export const activeUsersByOrgQuery = `
  SELECT o.organization_name, COUNT(u.user_id) AS active_users_count
  FROM organizations o
  JOIN users u ON o.organization_id = u.organization_id
  WHERE u.is_active = TRUE
  GROUP BY o.organization_name
  ORDER BY active_users_count DESC
  LIMIT 10
`;

export type ActiveUsersByOrgData = {
  organization_name: string;
  active_users_count: number;
};

interface ActiveUsersByOrgChartProps {
  data: ActiveUsersByOrgData[];
}

export function ActiveUsersByOrgChart({ data }: ActiveUsersByOrgChartProps) {
  const chartConfig: ChartConfig = {
    active_users_count: {
      label: 'Active Users',
      color: 'var(--chart-3)',
    },
  };

  return (
    <UniversalChartCard
      title="Active Users by Organization"
      description="Number of active users per organization (top 10)."
      chartConfig={chartConfig}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="organization_name" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="active_users_count" stroke="var(--chart-3-stroke)" fill="var(--chart-3)" />
        </BarChart>
      </ResponsiveContainer>
    </UniversalChartCard>
  );
}
