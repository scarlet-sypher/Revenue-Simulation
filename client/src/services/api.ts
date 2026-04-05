import axios from "axios";
import type { SimulationInput, SimulationResult } from "../types/simulation";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const runSimulation = async (input: SimulationInput): Promise<SimulationResult> => {


  const res = await api.post("/api/simulate", input);
  return res.data;

  
};
