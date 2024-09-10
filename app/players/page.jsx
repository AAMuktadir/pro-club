"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import PlayerCard from "@/components/playerCard";
import { Domain } from "@/utils/constants";
import Header from "@/components/header";

export default function Page() {
  const [playersData, setPlayersData] = useState(null);

  const getPlayers = async () => {
    try {
      const response = await fetch(`${Domain}/api/players`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPlayersData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!Domain) {
      return null;
    } else {
      getPlayers();
    }
  }, []);

  return (
    <div>
      <Header name={"Players"} />

      {playersData ? (
        <div className="">
          {playersData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 py-16 px-4 sm:px-20">
              {playersData.map((player, id) => (
                <div className="" key={id}>
                  <PlayerCard
                    name={player.name}
                    position={player.position}
                    foot={player.foot}
                    club={player.clubName}
                    age={player.age}
                    height={player.height}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-2xl px-4 sm:px-20 pt-8 sm:pt-20">
              No players are currently in any club.
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
