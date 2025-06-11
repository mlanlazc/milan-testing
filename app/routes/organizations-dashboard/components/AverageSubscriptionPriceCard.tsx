import { DollarSign } from 'lucide-react';
import { QuickInfoCard } from '@/components/building-blocks/quick-info-card/quick-info-card';

export const averageSubscriptionPriceQuery = `
  SELECT AVG(monthly_price) AS average_monthly_subscription_price FROM subscriptions WHERE status = 'active'
`;

export type AverageSubscriptionPriceData = {
  average_monthly_subscription_price: number;
};

interface AverageSubscriptionPriceCardProps {
  data: AverageSubscriptionPriceData[];
}

export function AverageSubscriptionPriceCard({ data }: AverageSubscriptionPriceCardProps) {
  const averagePrice = data?.[0]?.average_monthly_subscription_price;

  return (
    <QuickInfoCard
      title="Avg. Subscription Price"
      description="Average monthly price for active subscriptions"
      icon={<DollarSign className="h-5 w-5 text-green-500" />}
    >
      <div className="text-3xl font-bold">
        {averagePrice !== undefined ? `$${averagePrice.toFixed(2)}` : 'N/A'}
      </div>
    </QuickInfoCard>
  );
}
