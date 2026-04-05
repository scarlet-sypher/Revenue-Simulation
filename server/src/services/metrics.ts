import type { Deal } from "../types/deal.ts";
import { diffDays } from "../utils/date.ts";

export const calculateMetrics = (deals: Deal[]) => {
  const wonDeals = deals.filter((d) => d.stage === "Closed Won");
  const lostDeals = deals.filter((d) => d.stage === "Closed Lost");

  const wonCount = wonDeals.length;
  const lostCount = lostDeals.length;
  const totalClosed = wonCount + lostCount;

  const conversionRate = totalClosed === 0 ? 0 : wonCount / totalClosed;

  const totalWonValue = wonDeals.reduce((sum, d) => sum + d.deal_value, 0);

  const avgDealSize = wonCount === 0 ? 0 : totalWonValue / wonCount;

  const cycles = deals
    .filter((d) => d.closed_date)
    .map((d) => diffDays(d.created_date, d.closed_date!));

  const cycleCount = cycles.length;

  const totalCycle = cycles.reduce((sum, c) => sum + c, 0);

  const avgSalesCycle = cycleCount === 0 ? 0 : totalCycle / cycleCount;

  return {
    conversionRate,
    avgDealSize,
    avgSalesCycle,
  };
};
