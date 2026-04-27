import React from "react";

const POSITION_COLORS = {
  Goalkeeper: "bg-yellow-100 text-yellow-700",
  Defender: "bg-blue-100 text-blue-700",
  Midfielder: "bg-purple-100 text-purple-700",
  Forward: "bg-red-100 text-red-700",
  Striker: "bg-orange-100 text-orange-700",
};

function getPositionColor(position) {
  if (!position) return "bg-slate-100 text-slate-600";
  const key = Object.keys(POSITION_COLORS).find((k) =>
    position.toLowerCase().includes(k.toLowerCase())
  );
  return key ? POSITION_COLORS[key] : "bg-emerald-100 text-emerald-700";
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-700">{value}</span>
    </div>
  );
}

export default function PlayerCard({ name, position, foot, club, age, height }) {
  const positionColor = getPositionColor(position);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card card-hover p-5 flex flex-col gap-3">
      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center flex-shrink-0 shadow-sm">
          <span className="text-white font-bold text-sm">
            {name ? name.charAt(0).toUpperCase() : "?"}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold text-slate-800 truncate">{name}</h2>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${positionColor}`}>
            {position}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-2 pt-1 border-t border-slate-100">
        <InfoRow label="Age" value={age} />
        <InfoRow label="Height" value={height} />
        <InfoRow label="Foot" value={foot} />
      </div>

      {/* Club badge */}
      {club && (
        <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100">
          <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-semibold text-emerald-700 truncate">{club}</span>
        </div>
      )}
    </div>
  );
}
