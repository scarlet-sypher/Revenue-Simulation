export const getMonth = (dateStr: string): number | null => {
  const d = new Date(dateStr);

  if (isNaN(d.getTime())) return null;

  return d.getMonth() + 1;
};

export const diffDays = (start: string, end: string): number => {
  const s = new Date(start);

  const e = new Date(end);

  return Math.max(0, (e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
};
