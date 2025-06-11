import { Building2 } from 'lucide-react';
import { QuickInfoCard } from '@/components/building-blocks/quick-info-card/quick-info-card';

export const totalOrganizationsQuery = `
  SELECT COUNT(organization_id) AS total_organizations FROM organizations
`;

export type TotalOrganizationsData = {
  total_organizations: number;
};

interface TotalOrganizationsCardProps {
  data: TotalOrganizationsData[];
}

export function TotalOrganizationsCard({ data }: TotalOrganizationsCardProps) {
  const total = data?.[0]?.total_organizations;

  return (
    <QuickInfoCard
      title="Total Organizations"
      description="Overall number of registered organizations"
      icon={<Building2 className="h-5 w-5 text-blue-500" />}
    >
      <div className="text-3xl font-bold">{total !== undefined ? total : 'N/A'}</div>
    </QuickInfoCard>
  );
}
