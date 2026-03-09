// src/components/Progress.jsx
export default function Progress({ value }) {
  return (
    <div className="h-2 rounded-full bg-slate-200">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-sky-500 via-violet-500 to-fuchsia-500"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}
