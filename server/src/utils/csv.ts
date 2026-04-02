import fs from "fs";
import csv from "csv-parser";
import type { Deal } from "../types/deal.ts";

export const loadDeals = () =>
  new Promise<Deal[]>((resolve) => {
    const data: Deal[] = [];

    fs.createReadStream("deals.csv")
      .pipe(csv())
      .on("data", (row) =>
        data.push({
          ...row,
          deal_value: Number(row.deal_value),
        })
      )
      .on("end", () => resolve(data));
  });