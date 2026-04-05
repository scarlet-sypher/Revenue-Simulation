import { useState } from "react";
import { runSimulation } from "../services/api";
import type { SimulationResult } from "../types/simulation";
import RevenueChart from "../components/RevenueChart";
import SliderControl from "../components/SliderControl";
import StatCard from "../components/StatCard";
import InsightPanel from "../components/InsightPanel";

function SimulationPage() {

  const [conversion, setConversion] = useState(0);
  const [dealSize, setDealSize] = useState(0);
  const [cycle, setCycle] = useState(0);

  const [data, setData] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRun = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await runSimulation({
        conversionChange: conversion,
        dealSizeChange: dealSize,
        salesCycleChange: cycle,
      });

      setData(res);

    } catch (err) {
      console.error("Simulation failed", err);
      setError("Could not reach the server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setConversion(0);
    setDealSize(0);
    setCycle(0);
    setData(null);
    setError(null);
  };

  const getInsight = () => {
    if (!data) return "";
    const sign = data.impact.percentage >= 0 ? "increased" : "decreased";
    return `Revenue ${sign} by ${Math.abs(data.impact.percentage).toFixed(1)}% due to ${data.drivers.join(" and ")}`;
  };

  const isPositive = data ? data.impact.absolute >= 0 : true;

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className=" px-6 py-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold">Revenue Simulation</h1>
        
      </div>

      <div className="max-w-screen mx-auto px-6 py-1">
        <div className="grid grid-cols-[300px_1fr] gap-6 items-start">

          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5">

            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-5">
              Controls
            </p>

            <div className="space-y-6">

              <SliderControl
                label="Conversion Rate"
                value={conversion}
                min={-20}
                max={20}
                unit="%"
                onChange={setConversion}
              />

              <SliderControl
                label="Average Deal Size"
                value={dealSize}
                min={-20}
                max={20}
                unit="%"
                onChange={setDealSize}
              />

              <SliderControl
                label="Sales Cycle"
                value={cycle}
                min={-5}
                max={5}
                unit=" days"
                onChange={setCycle}
              />

            </div>

            <div className="flex gap-2 mt-6">

              <button
                onClick={handleReset}
                disabled={loading}
                className="px-4 py-2 text-sm rounded border border-zinc-600 text-zinc-400 hover:text-white hover:border-zinc-400 transition-colors disabled:opacity-40"
              >
                Reset
              </button>

              <button
                onClick={handleRun}
                disabled={loading}
                className="flex-1 py-2 text-sm font-semibold rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Running..." : "Run Simulation"}
              </button>

            </div>

            {error && (
              <div className="mt-4 bg-red-950 border border-red-700 rounded p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

          </div>

          <div className="space-y-5">

            {!data && !loading && (
              <div className="border border-dashed border-zinc-700 rounded-lg p-12 text-center">
                <p className="text-zinc-500 text-sm">
                  Adjust the controls and run a simulation to see Q3 projections
                </p>
              </div>
            )}

            {loading && (
              <div className="border border-zinc-700 rounded-lg p-12 text-center">
                <p className="text-zinc-500 text-sm">Computing simulation...</p>
              </div>
            )}

            {data && !loading && (
              <>

                <div className="grid grid-cols-3 gap-3">

                  <StatCard
                    label="Baseline"
                    value={`₹${data.baseline.total_revenue.toFixed(0)}`}
                  />

                  <StatCard
                    label="Projected"
                    value={`₹${data.scenario.total_revenue.toFixed(0)}`}
                  />

                  <StatCard
                    label="Impact"
                    value={`${data.impact.absolute >= 0 ? "+" : ""}₹${data.impact.absolute.toFixed(0)}`}
                    sub={`${data.impact.percentage >= 0 ? "+" : ""}${data.impact.percentage.toFixed(1)}%`}
                    highlight={isPositive ? "green" : "red"}
                  />

                </div>

                <div className="border border-zinc-700 rounded-lg p-4">
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
                    Q3 Weekly Revenue
                  </p>
                  <RevenueChart
                    baseline={data.baseline.weekly_revenue}
                    scenario={data.scenario.weekly_revenue}
                  />
                </div>

                <InsightPanel
                  insight={getInsight()}
                  drivers={data.drivers}
                  positive={isPositive}
                />

              </>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}

export default SimulationPage;