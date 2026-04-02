import type { Deal } from "../types/deal";

type Props = {
  deal: Deal;
};

const DealCard = ({ deal }: Props) => {
  return (
    <div className="border border-gray-700 p-3 rounded">
      <p>ID: {deal.deal_id}</p>
      <p>Stage: {deal.stage}</p>
      <p>Value: ₹{deal.deal_value}</p>
    </div>
  );
};

export default DealCard ;