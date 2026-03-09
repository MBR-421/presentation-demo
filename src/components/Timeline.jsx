// src/components/Timeline.jsx
export function Timeline({ children }) {
  return <ol className="relative border-l border-slate-200 pl-4 space-y-6">{children}</ol>;
}
export function TimelineItem({ when, title, children }) {
  return (
    <li className="ml-2">
      <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-sky-500 ring-4 ring-white" />
      <div className="text-xs uppercase tracking-widest text-slate-500">{when}</div>
      <div className="font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-slate-600 text-sm">{children}</div>
    </li>
  );
}
