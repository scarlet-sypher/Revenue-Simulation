import fs from "fs";
import csv from "csv-parser";
import type { Deal } from "../types/deal.ts";

export const loadDeals = (): Promise<Deal[]> => {
  return new Promise((resolve, reject) => {
    const results: Deal[] = [];

    fs.createReadStream("deals.csv")
      .pipe(csv())
      .on("data", (row) => {
        try {
          if (!row.deal_id || !row.created_date) return;

          results.push({
            deal_id: String(row.deal_id),
            created_date: row.created_date,
            closed_date: row.closed_date || null,
            stage: row.stage,
            deal_value: Number(row.deal_value) || 0,
            region: row.region,
            source: row.source,
          });
        } catch {
          // skip bad rows silently
        }
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};