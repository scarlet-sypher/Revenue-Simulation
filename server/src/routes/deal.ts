import express from "express";
import { fetchDeals } from "../controllers/deal.ts";

const router = express.Router();

router.get("/deals", fetchDeals);

export default router;