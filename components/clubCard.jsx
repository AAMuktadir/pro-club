import React from "react";
import Link from "next/link";

const CATEGORY_COLORS = {
  "Division 1": "bg-amber-100 text-amber-700",
  "Division 2": "bg-blue-100 text-blue-700",
  "Division 3": "bg-slate-100 text-slate-600",
};

//This page displays club cards with key details such as club name, manager, rating, and division category. It highlights the user’s own club with a special badge and provides quick actions to either manage their club or view players from other clubs.


function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400" : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.028 3.153a1 1 0 00.95.69h3.316c.969 0 1.371 1.24.588 1.81l-2.686 1.952a1 1 0 00-.364 1.118l1.027 3.153c.3.921-.755 1.688-1.54 1.118L10 13.6l-2.686 1.952c-.785.57-1.84-.197-1.54-1.118l1.027-3.153a1 1 0 00-.364-1.118L4.75 8.58c-.783-.57-.38-1.81.588-1.81h3.316a1 1 0 00.95-.69l1.028-3.153z" />
        </svg>
      ))}
    </div>
  );
}

export default function ClubCard({ name, id, manager, rating, category, clubid }) {
  const isOwnClub = clubid === id;
  const categoryColor = CATEGORY_COLORS[category] || "bg-slate-100 text-slate-600";

  return (
    <div
      className={`relative bg-white rounded-2xl border shadow-card card-hover p-5 flex flex-col gap-3 ${
        isOwnClub
          ? "border-emerald-300 ring-2 ring-emerald-500/20"
          : "border-slate-200"
      }`}
    >
      {isOwnClub && (
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Your Club
        </span>
      )}

      {/* Club icon */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm flex-shrink-0">
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

      <div className="flex flex-col gap-1 flex-1">
        <h2 className="text-base font-bold text-slate-800 leading-tight">{name}</h2>
        <p className="text-xs text-slate-500 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {manager}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <StarRating rating={rating} />
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${categoryColor}`}>
          {category}
        </span>
      </div>

      <div className="pt-1 border-t border-slate-100">
        {isOwnClub ? (
          <Link
            href="/manage-club"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Manage Club
          </Link>
        ) : (
          <Link
            href={`/players/${id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            View Players
          </Link>
        )}
      </div>
    </div>
  );
}
