import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EntryPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") navigate("/simulation");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold text-white tracking-tight">
        Revenue Simulator
      </h1>
      <p className="text-zinc-500 text-sm">
        Model Q3 projections by adjusting conversion, deal size, and cycle time.
      </p>
      <button
        onClick={() => navigate("/simulation")}
        className="mt-2 px-6 py-2.5 text-sm font-semibold rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors"
      >
        Enter
      </button>
      <p className="text-zinc-600 text-xs">or press Enter</p>
    </div>
  );
}

export default EntryPage;
