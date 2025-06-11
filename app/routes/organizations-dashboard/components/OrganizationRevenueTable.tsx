import { UniversalTableCard } from '@/components/building-blocks/universal-table-card/universal-table-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const organizationRevenueQuery = `
  SELECT o.organization_name, SUM(r.total_revenue) AS total_revenue, SUM(r.total_cost) AS total_cost, SUM(r.gross_profit) AS total_gross_profit
  FROM organizations o
  JOIN revenue r ON o.organization_id = r.organization_id
  GROUP BY o.organization_name
  ORDER BY total_revenue DESC
  LIMIT 10
`;

export type OrganizationRevenueData = {
  organization_name: string;
  total_revenue: number;
  total_cost: number;
  total_gross_profit: number;
};

interface OrganizationRevenueTableProps {
  data: OrganizationRevenueData[];
}

export function OrganizationRevenueTable({ data }: OrganizationRevenueTableProps) {
  return (
    <UniversalTableCard
      title="Organization Revenue Overview"
      description="Top organizations by total revenue, cost, and gross profit."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization Name</TableHead>
            <TableHead>Total Revenue</TableHead>
            <TableHead>Total Cost</TableHead>
            <TableHead>Gross Profit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No revenue data found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((org) => (
              <TableRow key={org.organization_name}>
                <TableCell className="font-medium">{org.organization_name}</TableCell>
                <TableCell>${org.total_revenue.toFixed(2)}</TableCell>
                <TableCell>${org.total_cost.toFixed(2)}</TableCell>
                <TableCell>${org.total_gross_profit.toFixed(2)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </UniversalTableCard>
  );
}
