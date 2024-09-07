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
      <Header name={"Pro-Club"} />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 pt-16 px-4 sm:px-20">
        {playersData &&
          playersData.map((player, id) => (
            <div className="" key={id}>
              <PlayerCard
                name={player.name}
                position={player.position}
                foot={player.foot}
                club={player.clubName}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
