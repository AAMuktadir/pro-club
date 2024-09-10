"use client";
import React from "react";
import { Domain } from "@/utils/constants";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import ClubCard from "@/components/clubCard";

export default function Page() {
  const [clubsData, setClubsData] = useState(null);
  const [clubData, setClubData] = useState(null);

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
    } catch (error) {
      console.log(error);
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
      getClubs();
      getClubInfo();
    }
  }, []);

  return (
    <div>
      <Header name={"Clubs"} />

      {clubsData ? (
        <div className="">
          {clubsData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 pt-16 px-4 sm:px-20">
              {clubsData.map((club, id) => (
                <div className="" key={id}>
                  <ClubCard
                    name={club.name}
                    id={club._id}
                    manager={club.manager}
                    rating={club.rating}
                    category={club?.category}
                    clubid={clubData?._id}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-2xl px-4 sm:px-20 pt-8 sm:pt-20">
              No clubs registered yet.
            </div>
          )}
        </div>
      ) : (
        <div className="py-12 sm:py-20 w-full flex items-center justify-center">
          <h4 className="text-xl sm:text-3xl text-center">Loading...</h4>
        </div>
      )}
    </div>
  );
}
