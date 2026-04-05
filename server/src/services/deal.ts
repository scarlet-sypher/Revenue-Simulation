import { loadDeals } from "../utils/csv.ts";

export const getDeals = async () => {
  const deals = await loadDeals();
  return deals;
};
