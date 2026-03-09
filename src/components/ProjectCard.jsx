// src/components/ProjectCard.jsx
import Tag from "./Tag";
import Progress from "./Progress";

export default function ProjectCard({ name, stack, status, progress = 0, notes }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold text-slate-900">{name}</div>
          <div className="mt-1 text-xs text-slate-500">{stack}</div>
        </div>
        <Tag tone={status.tone}>{status.label}</Tag>
      </div>
      <div className="mt-4"><Progress value={progress} /></div>
      {notes && <div className="mt-3 text-sm text-slate-600">{notes}</div>}
    </div>
  );
}
