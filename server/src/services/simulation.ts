import type { SimulationInput } from "../types/simulation.ts";
import type { Deal } from "../types/deal.ts";

const round = (num: number) => {
  return Math.round(num * 100) / 100;
};

export const runSimulation = (
  buckets: Record<number, Deal[]>,

  metrics: {
    conversionRate: number;
    avgDealSize: number;
    avgSalesCycle: number;
  },
  input: SimulationInput,
) => {
  const conversionChange = Math.max(
    -20,
    Math.min(20, input.conversionChange ?? 0),
  );
  const dealSizeChange = Math.max(-20, Math.min(20, input.dealSizeChange ?? 0));
  const salesCycleChange = Math.max(
    -5,
    Math.min(5, input.salesCycleChange ?? 0),
  );

  const baseline: number[] = [];
  const scenario: number[] = [];

  const rawConversion = metrics.conversionRate * (1 + conversionChange / 100);
  const newConversion = Math.min(1, Math.max(0, rawConversion));

  const newDealSize = Math.max(
    0,
    metrics.avgDealSize * (1 + dealSizeChange / 100),
  );

  const effectiveCycle = Math.max(1, metrics.avgSalesCycle + salesCycleChange);
  const cycleMultiplier =
    metrics.avgSalesCycle === 0 ? 1 : metrics.avgSalesCycle / effectiveCycle;

  let baseTotal = 0;
  let scenTotal = 0;

  for (let i = 1; i <= 12; i++) {
    const dealCount = buckets[i]?.length || 0;

    const baseRevenue =
      dealCount * metrics.conversionRate * metrics.avgDealSize;
    const scenarioRevenue =
      dealCount * cycleMultiplier * newConversion * newDealSize;

    const roundedBase = round(baseRevenue);
    const roundedScenario = round(scenarioRevenue);

    baseline.push(roundedBase);
    scenario.push(roundedScenario);

    baseTotal += roundedBase;
    scenTotal += roundedScenario;
  }

  const absoluteImpact = round(scenTotal - baseTotal);

  const percentageImpact =
    baseTotal === 0 ? 0 : round((absoluteImpact / baseTotal) * 100);

  const drivers: string[] = [];

  if (conversionChange !== 0)
    drivers.push(
      `${conversionChange > 0 ? "higher" : "lower"} conversion rate (${conversionChange > 0 ? "+" : ""}${conversionChange}%)`,
    );

  if (dealSizeChange !== 0)
    drivers.push(
      `${dealSizeChange > 0 ? "larger" : "smaller"} average deal size (${dealSizeChange > 0 ? "+" : ""}${dealSizeChange}%)`,
    );

  if (salesCycleChange !== 0)
    drivers.push(
      `${salesCycleChange < 0 ? "shorter" : "longer"} sales cycle (${salesCycleChange > 0 ? "+" : ""}${salesCycleChange} days)`,
    );

  if (drivers.length === 0)
    drivers.push("no changes applied showing baseline projection");

  return {
    baseline: { weekly_revenue: baseline, total_revenue: round(baseTotal) },

    scenario: { weekly_revenue: scenario, total_revenue: round(scenTotal) },

    impact: {
      absolute: absoluteImpact,
      percentage: percentageImpact,
    },

    drivers,
  };
};
