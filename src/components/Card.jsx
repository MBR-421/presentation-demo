// src/components/Card.jsx
export function Card({ children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-5 shadow-sm">
      {children}
    </div>
  );
}
