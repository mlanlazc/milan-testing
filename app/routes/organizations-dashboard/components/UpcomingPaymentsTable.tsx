import { UniversalTableCard } from '@/components/building-blocks/universal-table-card/universal-table-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const upcomingPaymentsQuery = `
  SELECT organization_name, next_payment_date FROM organizations WHERE next_payment_date BETWEEN NOW() AND NOW() + INTERVAL '30 days' ORDER BY next_payment_date ASC
`;

export type UpcomingPaymentData = {
  organization_name: string;
  next_payment_date: string; // timestamp without time zone
};

interface UpcomingPaymentsTableProps {
  data: UpcomingPaymentData[];
}

export function UpcomingPaymentsTable({ data }: UpcomingPaymentsTableProps) {
  return (
    <UniversalTableCard
      title="Upcoming Payments (Next 30 Days)"
      description="Organizations with payments due in the next 30 days."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization Name</TableHead>
            <TableHead>Next Payment Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                No upcoming payments found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((org) => (
              <TableRow key={org.organization_name}>
                <TableCell className="font-medium">{org.organization_name}</TableCell>
                <TableCell>{new Date(org.next_payment_date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </UniversalTableCard>
  );
}
