import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Deal } from "../types/deal";
import DealCard from "../components/DealCard";

function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await api.get("api/deals");
        setDeals(res.data);
      } catch (err) {
        console.error("Error fetching deals:", err);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl mb-4">Deals</h1>

      <div className="grid gap-3">
        {deals.slice(0, 5).map((deal) => (
          <DealCard key={deal.deal_id} deal={deal} />
        ))}
      </div>
    </div>
  );
}

export default DealsPage;