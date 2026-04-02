import type { Request, Response } from "express";
import { getDeals } from "../services/deal.ts";

export const fetchDeals = async (_: Request, res: Response) => {
  const deals = await getDeals();
  res.json(deals);
};