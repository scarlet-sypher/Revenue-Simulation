type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (val: number) => void;
};

function SliderControl({ label, value, min, max, unit, onChange }: Props) {
  const handleNumber = (raw: string) => {
    const parsed = parseInt(raw, 10);
    if (isNaN(parsed)) return;
    onChange(Math.min(max, Math.max(min, parsed)));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-zinc-300">{label}</p>

        <div className="flex items-center gap-1">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={1}
            onChange={(e) => handleNumber(e.target.value)}
            className="w-16 bg-zinc-800 border border-zinc-600 rounded px-2 py-1 text-sm text-right text-white focus:outline-none focus:border-zinc-400"
          />
          <span className="text-zinc-400 text-sm w-8">{unit}</span>
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-500"
      />

      <div className="flex justify-between mt-1">
        <span className="text-xs text-zinc-600">
          {min}
          {unit}
        </span>
        <span className="text-xs text-zinc-600">
          +{max}
          {unit}
        </span>
      </div>
    </div>
  );
}

export default SliderControl;
