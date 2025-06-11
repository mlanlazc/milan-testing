import { useLoaderData } from '@remix-run/react';
import { executeQuery, QueryData } from '@/db/execute-query';
import { LoaderError } from '@/types/loader-error';
import { WithErrorHandling } from '@/components/hoc/error-handling-wrapper/error-handling-wrapper';

import { TotalOrganizationsCard, totalOrganizationsQuery, TotalOrganizationsData } from './organizations-dashboard/components/TotalOrganizationsCard';
import { AverageSubscriptionPriceCard, averageSubscriptionPriceQuery, AverageSubscriptionPriceData } from './organizations-dashboard/components/AverageSubscriptionPriceCard';
import { SubscriptionTierChart, subscriptionTierQuery, SubscriptionTierData } from './organizations-dashboard/components/SubscriptionTierChart';
import { IndustryDistributionChart, industryDistributionQuery, IndustryDistributionData } from './organizations-dashboard/components/IndustryDistributionChart';
import { OrganizationRevenueTable, organizationRevenueQuery, OrganizationRevenueData } from './organizations-dashboard/components/OrganizationRevenueTable';
import { UpcomingPaymentsTable, upcomingPaymentsQuery, UpcomingPaymentData } from './organizations-dashboard/components/UpcomingPaymentsTable';
import { ActiveUsersByOrgChart, activeUsersByOrgQuery, ActiveUsersByOrgData } from './organizations-dashboard/components/ActiveUsersByOrgChart';

export async function loader(): Promise<OrganizationsDashboardProps | LoaderError> {
  try {
    const [
      totalOrganizations,
      averageSubscriptionPrice,
      subscriptionTiers,
      industryDistribution,
      organizationRevenue,
      upcomingPayments,
      activeUsersByOrg,
    ] = await Promise.all([
      executeQuery<TotalOrganizationsData>(totalOrganizationsQuery),
      executeQuery<AverageSubscriptionPriceData>(averageSubscriptionPriceQuery),
      executeQuery<SubscriptionTierData>(subscriptionTierQuery),
      executeQuery<IndustryDistributionData>(industryDistributionQuery),
      executeQuery<OrganizationRevenueData>(organizationRevenueQuery),
      executeQuery<UpcomingPaymentData>(upcomingPaymentsQuery),
      executeQuery<ActiveUsersByOrgData>(activeUsersByOrgQuery),
    ]);

    return {
      totalOrganizations,
      averageSubscriptionPrice,
      subscriptionTiers,
      industryDistribution,
      organizationRevenue,
      upcomingPayments,
      activeUsersByOrg,
    };
  } catch (error) {
    console.error('Error in organizations dashboard loader:', error);
    return { error: error instanceof Error ? error.message : 'Failed to load organizations dashboard data' };
  }
}

interface OrganizationsDashboardProps {
  totalOrganizations: QueryData<TotalOrganizationsData[]>;
  averageSubscriptionPrice: QueryData<AverageSubscriptionPriceData[]>;
  subscriptionTiers: QueryData<SubscriptionTierData[]>;
  industryDistribution: QueryData<IndustryDistributionData[]>;
  organizationRevenue: QueryData<OrganizationRevenueData[]>;
  upcomingPayments: QueryData<UpcomingPaymentData[]>;
  activeUsersByOrg: QueryData<ActiveUsersByOrgData[]>;
}

export default function OrganizationsDashboard({
  totalOrganizations,
  averageSubscriptionPrice,
  subscriptionTiers,
  industryDistribution,
  organizationRevenue,
  upcomingPayments,
  activeUsersByOrg,
}: OrganizationsDashboardProps) {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Amazing Organizations Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WithErrorHandling
          queryData={totalOrganizations}
          render={(data) => <TotalOrganizationsCard data={data} />}
        />
        <WithErrorHandling
          queryData={averageSubscriptionPrice}
          render={(data) => <AverageSubscriptionPriceCard data={data} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WithErrorHandling
          queryData={subscriptionTiers}
          render={(data) => <SubscriptionTierChart data={data} />}
        />
        <WithErrorHandling
          queryData={industryDistribution}
          render={(data) => <IndustryDistributionChart data={data} />}
        />
      </div>

      <WithErrorHandling
        queryData={organizationRevenue}
        render={(data) => <OrganizationRevenueTable data={data} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WithErrorHandling
          queryData={upcomingPayments}
          render={(data) => <UpcomingPaymentsTable data={data} />}
        />
        <WithErrorHandling
          queryData={activeUsersByOrg}
          render={(data) => <ActiveUsersByOrgChart data={data} />}
        />
      </div>
    </div>
  );
}
