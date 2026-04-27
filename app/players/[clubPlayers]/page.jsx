"use client";
import React, { useState, useEffect, useMemo } from "react";
import Header from "@/components/header";
import { Domain } from "@/utils/constants";
import PlayerCard from "@/components/playerCard";
import Link from "next/link";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-200" />
        <div className="flex-1">
          <div className="h-4 bg-slate-200 rounded-lg w-3/4 mb-2" />
          <div className="h-5 w-16 rounded-full bg-slate-100" />
        </div>
      </div>
      <div className="pt-1 border-t border-slate-100 space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-3 w-8 bg-slate-100 rounded" />
            <div className="h-3 w-12 bg-slate-200 rounded" />
          </div>
        ))}
      </div>
      <div className="pt-1 border-t border-slate-100">
        <div className="h-3 w-24 bg-slate-100 rounded" />
      </div>
    </div>
  );
}

export default function ClubPlayersPage({ params }) {
  const [playersData, setPlayersData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!Domain) return;
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`${Domain}/api/club-players`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clubID: params.clubPlayers }),
        });
        const data = await response.json();
        setPlayersData(data.data);
      } catch (error) {
        console.log(error);
        setPlayersData([]);
      }
    };
    fetchPlayers();
  }, [params.clubPlayers]);

  const clubName = playersData && playersData[0]?.clubName;

  const filtered = useMemo(() => {
    if (!playersData) return [];
    if (!search.trim()) return playersData;
    const q = search.toLowerCase();
    return playersData.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.position?.toLowerCase().includes(q)
    );
  }, [playersData, search]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Page header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/clubs"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              All Clubs
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                {clubName || "Club Players"}
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                {playersData !== null
                  ? `${playersData.length} player${playersData.length !== 1 ? "s" : ""}`
                  : "Loading…"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="relative max-w-md mb-8">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search players…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 transition-all duration-200"
          />
        </div>

        {/* Grid */}
        {playersData === null ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((player, i) => (
              <PlayerCard
                key={i}
                name={player.name}
                position={player.position}
                foot={player.foot}
                club={player.clubName}
                age={player.age}
                height={player.height}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              {search ? "No players match your search" : "No players in this club"}
            </h3>
            <p className="text-sm text-slate-500">
              {search
                ? "Try adjusting your search."
                : "This club hasn't added any players yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
