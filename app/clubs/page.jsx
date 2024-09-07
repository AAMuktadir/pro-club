"use client";
import React from "react";
import { Domain } from "@/utils/constants";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import ClubCard from "@/components/clubCard";

export default function Page() {
  const [clubsData, setClubsData] = useState(null);

  const getClubs = async () => {
    try {
      const response = await fetch(`${Domain}/api/all-clubs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setClubsData(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!Domain) {
      return null;
    } else {
      getClubs();
    }
  }, []);

  return (
    <div>
      <Header name={"Pro-Club"} />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 pt-16 px-4 sm:px-20">
        {clubsData &&
          clubsData.map((club, id) => (
            <div className="" key={id}>
              <ClubCard
                name={club.name}
                manager={club.manager}
                rating={club.rating}
                category={club?.category}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
