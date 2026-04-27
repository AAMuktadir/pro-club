"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import { Domain } from "@/utils/constants";
import UpdateClubInfoModal from "@/components/updateClubInfoModal";

const CATEGORY_COLORS = {
  "Division 1": "bg-amber-100 text-amber-700 border-amber-200",
  "Division 2": "bg-blue-100 text-blue-700 border-blue-200",
  "Division 3": "bg-slate-100 text-slate-600 border-slate-200",
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-amber-400" : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.028 3.153a1 1 0 00.95.69h3.316c.969 0 1.371 1.24.588 1.81l-2.686 1.952a1 1 0 00-.364 1.118l1.027 3.153c.3.921-.755 1.688-1.54 1.118L10 13.6l-2.686 1.952c-.785.57-1.84-.197-1.54-1.118l1.027-3.153a1 1 0 00-.364-1.118L4.75 8.58c-.783-.57-.38-1.81.588-1.81h3.316a1 1 0 00.95-.69l1.028-3.153z" />
        </svg>
      ))}
      <span className="text-sm text-slate-500 ml-1">({rating}/5)</span>
    </div>
  );
}

export default function ClubProfilePage() {
  const [clubData, setClubData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = async (data) => {
    try {
      const response = await fetch("/api/extractclub", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const rdata = await response.json();
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Update error:", rdata.message);
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const getClubInfo = async () => {
    try {
      const response = await fetch(`${Domain}/api/extractclub`);
      const data = await response.json();
      setClubData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!Domain) return;
    getClubInfo();
  }, []);

  const categoryColor = CATEGORY_COLORS[clubData?.category] || "bg-slate-100 text-slate-600 border-slate-200";

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Page header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Club Profile</h1>
          <p className="text-slate-500 text-sm mt-1">View and manage your club information</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {clubData === null ? (
          <div className="max-w-lg mx-auto bg-white rounded-2xl border border-slate-200 p-8 animate-pulse">
            <div className="w-20 h-20 rounded-2xl bg-slate-200 mx-auto mb-6" />
            <div className="h-6 bg-slate-200 rounded-lg w-2/3 mx-auto mb-4" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-slate-100 rounded-xl" />
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            {/* Club card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
              {/* Banner */}
              <div
                className="h-24 relative"
                style={{
                  background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f2d1f 100%)",
                }}
              >
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
              </div>

              {/* Club logo + name */}
              <div className="px-6 pb-6">
                <div className="flex items-end justify-between -mt-10 mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {clubData.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${categoryColor}`}>
                    {clubData.category}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-800 mb-1">{clubData.name}</h2>

                <div className="mb-4">
                  <StarRating rating={clubData.rating} />
                </div>

                {/* Info rows */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Manager</p>
                      <p className="text-sm font-semibold text-slate-800">{clubData.manager}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Username</p>
                      <p className="text-sm font-semibold text-slate-800">{clubData.userName}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-all duration-200 shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>
                  <a
                    href="/manage-club"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Squad
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && clubData && (
        <UpdateClubInfoModal
          clubData={clubData}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
