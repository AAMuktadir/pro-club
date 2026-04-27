"use client";
import React from "react";
import { Domain } from "@/utils/constants";

export default function Logout({ mobile = false }) {
  const handleLogout = async () => {
    try {
      await fetch(`${Domain}/api/logout`, { method: "GET" });
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (mobile) {
    return (
      <button
        className="w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 text-left transition-all duration-200"
        onClick={handleLogout}
      >
        Sign Out
      </button>
    );
  }

  return (
    <button
      className="px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
      onClick={handleLogout}
    >
      Sign Out
    </button>
  );
}
