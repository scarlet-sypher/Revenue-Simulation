import type { Request, Response } from "express";
import { getAllDeals, splitDeals } from "../services/data.ts";
import { calculateMetrics } from "../services/metrics.ts";
import { createWeeklyBuckets } from "../services/bucket.ts";
import { runSimulation } from "../services/simulation.ts";

export const simulate = async (req: Request, res: Response) => {
  try {
    const input = req.body || {};

    const deals = await getAllDeals();
    if (!deals.length)
      return res.status(400).json({ error: "No deals data found" });

    const { q1, q2, q3 } = splitDeals(deals);

    const historicalDeals = [...q1, ...q2];
    if (!historicalDeals.length) {
      return res
        .status(400)
        .json({ error: "No Q1/Q2 data to compute baseline" });
    }

    const metrics = calculateMetrics(historicalDeals);
    const buckets = createWeeklyBuckets(q3);

    const result = runSimulation(buckets, metrics, input);

    res.json(result);
  } catch (err) {
    console.error("error: ", err);
    res.status(500).json({ error: "Server error" });
  }
};
