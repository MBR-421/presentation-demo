// src/components/Tag.jsx
export default function Tag({ children, tone = "slate" }) {
  const color = {
    slate: "bg-slate-100 text-slate-700 text-center",
    sky: "bg-sky-100 text-sky-700 text-center",
    violet: "bg-violet-100 text-violet-700 text-center",
    emerald: "bg-emerald-100 text-emerald-700 text-center",
    amber: "bg-amber-100 text-amber-800 text-center",
    rose: "bg-rose-100 text-rose-700 text-center",
  }[tone];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${color}`}>
      {children}
    </span>
  );
}
