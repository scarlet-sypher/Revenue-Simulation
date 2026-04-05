export type SimulationInput = {
  conversionChange?: number;

  dealSizeChange?: number;

  salesCycleChange?: number;
};

export type SimulationResult = {
  baseline: {
    weekly_revenue: number[];
    total_revenue: number;
  };

  scenario: {
    weekly_revenue: number[];
    total_revenue: number;
  };

  impact: {
    absolute: number;
    percentage: number;
  };

  drivers: string[];
};
