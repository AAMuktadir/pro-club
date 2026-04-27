"use client";
import React, { useState, useEffect } from "react";
import NewPlayerModal from "@/components/newPlayerAdditionModal";
import Header from "@/components/header";
import { Domain } from "@/utils/constants";
import ConfirmDelete from "@/components/newsfeed/confirmDelete";

const POSITION_COLORS = {
  goalkeeper: "bg-yellow-100 text-yellow-700",
  defender: "bg-blue-100 text-blue-700",
  midfielder: "bg-purple-100 text-purple-700",
  forward: "bg-red-100 text-red-700",
  striker: "bg-orange-100 text-orange-700",
  winger: "bg-pink-100 text-pink-700",
};

function getPositionColor(position) {
  if (!position) return "bg-slate-100 text-slate-600";
  const key = Object.keys(POSITION_COLORS).find((k) =>
    position.toLowerCase().includes(k)
  );
  return key ? POSITION_COLORS[key] : "bg-emerald-100 text-emerald-700";
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ManageClubPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playersData, setPlayersData] = useState(null);
  const [addPlayerError, setAddPlayerError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPlayerId, setCurrentPlayerId] = useState(null);
  const [currentPlayerName, setCurrentPlayerName] = useState(null);
  const [search, setSearch] = useState("");

  const getPlayers = async () => {
    try {
      const response = await fetch(`${Domain}/api/club-players`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setPlayersData(data.data);
    } catch (error) {
      console.log(error);
      setPlayersData([]);
    }
  };

  const deleteAPlayer = async (player_id) => {
    try {
      await fetch(`${Domain}/api/players`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId: player_id }),
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (playerData) => {
    try {
      const response = await fetch(`${Domain}/api/players`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playerData),
      });

      const rdata = await response.json();
      setAddPlayerError({ message: rdata.message, status: response.status });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("New player addition error:", error);
    }
  };

  useEffect(() => {
    if (!Domain) return;
    getPlayers();
  }, []);

  const clubName = playersData && playersData[0]?.clubName;

  const filtered = playersData
    ? search.trim()
      ? playersData.filter(
          (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.position?.toLowerCase().includes(search.toLowerCase())
        )
      : playersData
    : [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Page header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                {clubName || "Manage Your Club"}
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                {playersData !== null
                  ? `${playersData.length} player${playersData.length !== 1 ? "s" : ""} in your squad`
                  : "Loading…"}
              </p>
            </div>

            <button
              onClick={() => {
                setIsModalOpen(true);
                setAddPlayerError(null);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-all duration-200 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Player
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        {playersData && playersData.length > 0 && (
          <div className="relative max-w-sm mb-6">
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
        )}

        {/* Content */}
        {playersData === null ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-3" />
                <div className="h-3 bg-slate-100 rounded w-1/2 mb-4" />
                <div className="h-8 bg-slate-100 rounded-xl" />
              </div>
            ))}
          </div>
        ) : playersData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-2xl bg-emerald-50 border-2 border-dashed border-emerald-200 flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Your squad is empty</h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm">
              Start building your team by adding your first player.
            </p>
            <button
              onClick={() => { setIsModalOpen(true); setAddPlayerError(null); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add First Player
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">No players match your search.</p>
            <button onClick={() => setSearch("")} className="text-emerald-600 text-sm mt-2 hover:underline">
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((player) => (
              <div
                key={player._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
              >
                {/* Top section */}
                <div className="p-5 flex flex-col gap-3">
                  {/* Avatar + name */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <span className="text-white font-bold text-sm">
                          {player.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 leading-tight">{player.name}</h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPositionColor(player.position)}`}>
                          {player.position}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">{formatDate(player.createdAt)}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-3 text-xs text-slate-500">
                    <span>Age: <strong className="text-slate-700">{player.age}</strong></span>
                    <span>·</span>
                    <span>Height: <strong className="text-slate-700">{player.height}</strong></span>
                    <span>·</span>
                    <span>Foot: <strong className="text-slate-700">{player.foot}</strong></span>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-5 pb-4 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setCurrentPlayerId(player._id);
                      setCurrentPlayerName(player.name);
                      setIsDeleteModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>

                  <button
                    onClick={() => setSelectedPlayer(player)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-emerald-600 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Player Modal */}
      {isModalOpen && (
        <NewPlayerModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          error={addPlayerError}
        />
      )}

      {/* Delete Confirm Modal */}
      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setCurrentPlayerId(null); setCurrentPlayerName(null); }}
        onConfirm={deleteAPlayer}
        playerId={currentPlayerId}
        playerName={currentPlayerName}
      />

      {/* Player Detail Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slide-up overflow-hidden">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 px-6 py-8 text-center">
              <button
                onClick={() => setSelectedPlayer(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {selectedPlayer.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white">{selectedPlayer.name}</h2>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getPositionColor(selectedPlayer.position)}`}>
                {selectedPlayer.position}
              </span>
            </div>

            {/* Details */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Age", value: selectedPlayer.age },
                  { label: "Height", value: selectedPlayer.height },
                  { label: "Preferred Foot", value: selectedPlayer.foot },
                  { label: "Club", value: selectedPlayer.clubName },
                  { label: "Email", value: selectedPlayer.email },
                  { label: "Contact", value: selectedPlayer.contact },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{value}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedPlayer(null)}
                className="w-full mt-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
