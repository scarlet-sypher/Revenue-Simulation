import { useState } from "react";
import { runSimulation } from "../services/api";
import type { SimulationResult } from "../types/simulation";
import RevenueChart from "../components/RevenueChart";

function SimulationPage() {

  const [conversion, setConversion] = useState(0);
  const [dealSize, setDealSize] = useState(0);
  const [cycle, setCycle] = useState(0);

  const [data, setData] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {

    try {

      setLoading(true);

      const res = await runSimulation({
        conversionChange: conversion,
        dealSizeChange: dealSize,
        salesCycleChange: cycle,

      });

      setData(res);

    } catch (err) {
      console.error("Simulation failed", err);
    } finally {
      setLoading(false);
    }
  };

  const getInsight = () => {

    if (!data) return "";

    const sign = data.impact.percentage >= 0 ? "increased" : "decreased";

    return `Revenue ${sign} by ${Math.abs(
      data.impact.percentage
    ).toFixed(1)}% due to ${data.drivers.join(" and ")}`;

  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl mb-6">Revenue Simulation</h1>

  
      <div className="mb-6 space-y-4">
        <div>
          <p>Conversion Rate: {conversion}%</p>
          <input
            type="range"
            min="-20"
            max="20"
            value={conversion}
            onChange={(e) => setConversion(Number(e.target.value))}
            className="w-full"
            step="1"
          />
        </div>

        <div>
          <p>Average Deal Size: {dealSize}%</p>
          <input
            type="range"
            min="-20"
            max="20"
            value={dealSize}
            onChange={(e) => setDealSize(Number(e.target.value))}
            className="w-full"
            step="1"
          />
        </div>

        <div>
          <p>Sales Cycle (days): {cycle}</p>
          <input
            type="range"
            min="-5"
            max="5"
            value={cycle}
            onChange={(e) => setCycle(Number(e.target.value))}
            className="w-full"
            step="1"
          />
        </div>
      </div>

      <button
        onClick={handleRun}
        disabled={loading}
        className="bg-blue-500 px-6 py-2 rounded"
      >
        {loading ? "Running..." : "Run Simulation"}
      </button>


      {data && (
        <>
   
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="border p-4 rounded">
              <p className="text-gray-400">Baseline</p>
              <p className="text-lg font-semibold">
                ₹{data.baseline.total_revenue.toFixed(0)}
              </p>
            </div>

            <div className="border p-4 rounded">
              <p className="text-gray-400">Scenario</p>
              <p className="text-lg font-semibold">
                ₹{data.scenario.total_revenue.toFixed(0)}
              </p>
            </div>

            <div className="border p-4 rounded">
              <p className="text-gray-400">Impact</p>
              <p
                className={`text-lg font-semibold ${
                  data.impact.absolute >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                ₹{data.impact.absolute.toFixed(0)} (
                {data.impact.percentage.toFixed(1)}%)
              </p>
            </div>
          </div>

 
        <div className="mt-8 border p-4 rounded">
        <RevenueChart
            baseline={data.baseline.weekly_revenue}
            scenario={data.scenario.weekly_revenue}
        />
        </div>

          <div className="mt-6 border p-4 rounded">
            <p className="text-green-400 font-medium">{getInsight()}</p>

            <div className="mt-2 text-sm text-gray-400">
              {data.drivers.map((d, i) => (
                <p key={i}>• {d}</p>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SimulationPage;