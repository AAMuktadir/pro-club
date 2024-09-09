"use client";
import React from "react";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import { Domain } from "@/utils/constants";
import UpdateClubInfoModal from "@/components/updateClubInfoModal";

export default function Page() {
  const [clubData, setClubData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = async (data) => {
    console.log("Updated user data:", data);
    try {
      const response = await fetch("/api/extractclub", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const rdata = await response.json();
      window.location.reload();

      if (!response.ok) {
        console.error("Update error:", rdata.message);
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const getClubInfo = async () => {
    try {
      const response = await fetch(`${Domain}/api/extractclub`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setClubData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!Domain) {
      return null;
    } else {
      getClubInfo();
    }
  }, []);

  return (
    <div>
      <Header name={(clubData && clubData?.name) || "Manage Your Club"} />
      <div className="py-16"></div>

      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Club Information
        </h2>

        {clubData && (
          <div className="space-y-4 p-6 bg-gray-100 text-gray-800 rounded-lg shadow-sm">
            <div className="text-xl font-semibold text-gray-900">
              {clubData.name}
            </div>
            <div>
              <span className="font-medium">Category:</span>
              <span className="ml-2">{clubData.category}</span>
            </div>
            <div>
              <span className="font-medium">Manager:</span>
              <span className="ml-2">{clubData.manager}</span>
            </div>
            <button
              className="mt-6 w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-200"
              onClick={() => setIsModalOpen(true)}
            >
              Update Information
            </button>

            {isModalOpen && (
              <UpdateClubInfoModal
                clubData={clubData}
                onClose={() => setIsModalOpen(false)}
                onUpdate={handleUpdate}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
