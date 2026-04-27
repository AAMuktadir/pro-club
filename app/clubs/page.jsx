"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Domain } from "@/utils/constants";
import Header from "@/components/header";
import ClubCard from "@/components/clubCard";

const CATEGORIES = ["All", "Division 1", "Division 2", "Division 3"];

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-3 animate-pulse">
      <div className="w-10 h-10 rounded-xl bg-slate-200" />
      <div className="h-4 bg-slate-200 rounded-lg w-3/4" />
      <div className="h-3 bg-slate-100 rounded-lg w-1/2" />
      <div className="flex justify-between items-center">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => <div key={i} className="w-3.5 h-3.5 rounded bg-slate-200" />)}
        </div>
        <div className="h-5 w-16 rounded-full bg-slate-100" />
      </div>
      <div className="pt-1 border-t border-slate-100">
        <div className="h-3 w-20 bg-slate-100 rounded" />
      </div>
    </div>
  );
}

export default function ClubsPage() {
  const [clubsData, setClubsData] = useState(null);
  const [clubData, setClubData] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const getClubs = async () => {
    try {
      const response = await fetch(`${Domain}/api/all-clubs`);
      const data = await response.json();
      setClubsData(data.data);
    } catch (error) {
      console.log(error);
      setClubsData([]);
    }
  };

  const getClubInfo = async () => {
    try {
      const response = await fetch(`${Domain}/api/extractclub`);
      const data = await response.json();
      setClubData(data.data);
    } catch {
      /* not logged in */
    }
  };

  useEffect(() => {
    if (!Domain) return;
    getClubs();
    getClubInfo();
  }, []);

  const filtered = useMemo(() => {
    if (!clubsData) return [];
    let result = clubsData;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.manager.toLowerCase().includes(q)
      );
    }

    if (category !== "All") {
      result = result.filter((c) => c.category === category);
    }

    result = [...result].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

    return result;
  }, [clubsData, search, category, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Page header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Clubs</h1>
              <p className="text-slate-500 text-sm mt-1">
                {clubsData !== null
                  ? `${clubsData.length} club${clubsData.length !== 1 ? "s" : ""} registered`
                  : "Loading clubs…"}
              </p>
            </div>

            {/* Stats mini */}
            {clubsData && (
              <div className="flex gap-4">
                {CATEGORIES.slice(1).map((cat) => (
                  <div key={cat} className="text-center">
                    <p className="text-lg font-bold text-slate-800">
                      {clubsData.filter((c) => c.category === cat).length}
                    </p>
                    <p className="text-xs text-slate-500">{cat}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1">
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
              placeholder="Search clubs or managers…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 transition-all duration-200"
            />
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  category === cat
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400"
          >
            <option value="name">Sort: Name</option>
            <option value="rating">Sort: Rating</option>
          </select>
        </div>

        {/* Grid */}
        {clubsData === null ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((club) => (
              <ClubCard
                key={club._id}
                name={club.name}
                id={club._id}
                manager={club.manager}
                rating={club.rating}
                category={club.category}
                clubid={clubData?._id}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              {search || category !== "All" ? "No clubs match your filters" : "No clubs registered yet"}
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              {search || category !== "All"
                ? "Try adjusting your search or filters."
                : "Be the first to register a club!"}
            </p>
            {(search || category !== "All") && (
              <button
                onClick={() => { setSearch(""); setCategory("All"); }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
