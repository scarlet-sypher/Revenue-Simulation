import type { Deal } from "../types/deal.ts";
import { getMonth } from "../utils/date.ts";

export const createWeeklyBuckets = (deals: Deal[]) => {
  const buckets: Record<number, Deal[]> = {};

  for (let i = 1; i <= 12; i++) buckets[i] = [];

  for (const d of deals) {
    const date = new Date(d.created_date);

    if (isNaN(date.getTime())) continue;

    const month = getMonth(d.created_date);

    if (!month) continue;

    const rawWeek = Math.floor((date.getDate() - 1) / 7) + 1;
    const week = Math.min(rawWeek, 4);

    let finalWeek = week;
    if (month === 8) finalWeek += 4;
    if (month === 9) finalWeek += 8;

    finalWeek = Math.min(finalWeek, 12);

    buckets[finalWeek]?.push(d);
  }

  return buckets;
};
