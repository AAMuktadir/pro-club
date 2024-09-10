"use client";
import React from "react";
import { useState, useEffect } from "react";
import NewPlayerModal from "@/components/newPlayerAdditionModal";
import Header from "@/components/header";
import { Domain } from "@/utils/constants";
import ConfirmDelete from "@/components/newsfeed/confirmDelete";

export default function Page() {
  // const [clubData, setClubData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playersData, setPlayersData] = useState(null);

  //for delete post
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPlayerId, setCurrentPlayerId] = useState(null);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentPlayerId(null);
  };

  const handleConfirm = (playerId) => {
    deleteAPlayer(playerId);
  };

  //for post
  const openModal = (player) => {
    setSelectedPlayer(player);
  };

  const closeModal = () => {
    setSelectedPlayer(null);
  };

  const getPlayers = async () => {
    try {
      const response = await fetch(`${Domain}/api/club-players`, {
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

  const deleteAPlayer = async (player_id) => {
    const data = {
      playerId: player_id,
    };

    try {
      const response = await fetch(`${Domain}/api/players`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // const getClubInfo = async () => {
  //   try {
  //     const response = await fetch(`${Domain}/api/extractclub`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     setClubData(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (playerData) => {
    const data = {
      ...playerData,
    };

    try {
      const response = await fetch(`${Domain}/api/players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      const rdata = await response.json();

      if (!response.ok) {
        console.error("New player addition error:", rdata.message);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("New post addition error:", error);
    }
  };

  const getDate = (data) => {
    const date = new Date(data);

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = date.toLocaleString("en-GB", options);

    return formattedDate;
  };

  useEffect(() => {
    if (!Domain) {
      return null;
    } else {
      // getClubInfo();
      getPlayers();
    }
  }, []);
  return (
    <div className="pb-20">
      <Header
        name={(playersData && playersData[0]?.clubName) || "Manage Your Club"}
      />
      <div className="px-12">
        <div className="py-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-md pb-4 hover:bg-blue-600"
          >
            Add New Player
          </button>
          {isModalOpen && (
            <NewPlayerModal
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleSubmit}
            />
          )}
        </div>
        <div className="">
          {playersData && playersData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-12">
              {playersData.map((player, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-2 w-full  pb-1"
                >
                  <section className="flex justify-between items-start pb-2">
                    <p className="pb-1 text-xs text-gray-500 w-2/5">
                      {getDate(player.createdAt)}
                    </p>
                    <p className="text-sm font-light text-black text-right border rounded-lg p-1 bg-green-200">
                      {player.clubName}
                    </p>
                  </section>

                  <div className="flex flex-col justify-between h-40">
                    <section className="px-4">
                      <h2 className="text-lg font-medium pb-2">
                        {player.name}
                      </h2>

                      <p className="text-gray-600 text-sm">{player.position}</p>
                    </section>

                    <section className="flex items-center justify-between">
                      <p className="">
                        <div className="">
                          <p
                            className="text-red-500 rounded-xl cursor-pointer"
                            onClick={() => {
                              openDeleteModal();
                              setCurrentPlayerId(player._id);
                            }}
                          >
                            Delete
                          </p>

                          {currentPlayerId === player._id && (
                            <ConfirmDelete
                              isOpen={isDeleteModalOpen}
                              onClose={closeDeleteModal}
                              onConfirm={handleConfirm}
                              playerId={currentPlayerId}
                              playerName={player.name}
                            />
                          )}
                        </div>
                      </p>

                      <p
                        className="text-black cursor-pointer"
                        onClick={() => openModal(player)}
                      >
                        View Player
                      </p>
                    </section>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-2xl">
              Currently, The player list is empty. Please click the {"'"}Add New
              Player{"'"} button to add a new Player.
            </div>
          )}

          {/* Modal */}
          {selectedPlayer && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 px-4 sm:px-40">
              <div className="p-20 bg-gray-100 border border-gray-300 rounded-lg shadow-sm flex flex-col gap-2 justify-center items-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {selectedPlayer.name}
                </h2>
                <p className="text-sm text-gray-600">
                  Position:{" "}
                  <span className="font-bold">{selectedPlayer.position}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Foot: <span className="font-bold">{selectedPlayer.foot}</span>
                </p>

                <p className="text-sm text-gray-600">
                  Age: <span className="font-bold">{selectedPlayer.age}</span>
                </p>

                <p className="text-sm text-gray-600">
                  Height:{" "}
                  <span className="font-bold">{selectedPlayer.height}</span>
                </p>
                <p className="text-sm text-gray-600 pt-4">
                  Club:{" "}
                  <span className="font-bold bg-green-300 p-1 rounded-lg">
                    {selectedPlayer.clubName}
                  </span>
                </p>

                <button
                  className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
