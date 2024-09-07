"use client";
import React from "react";
import { useState, useEffect } from "react";
import NewPlayerModal from "@/components/newPlayerAdditionModal";
import Header from "@/components/header";
import { Domain } from "@/utils/constants";
import ConfirmDelete from "@/components/newsfeed/confirmDelete";

export default function Page() {
  const [clubData, setClubData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playersData, setPlayersData] = useState(null);

  //for delete post
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPlayerId, setCurrentPlayerId] = useState(null);

  const openDeleteModal = (playerId) => {
    setCurrentPlayerId(playerId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentPlayerId(null);
  };

  const handleConfirm = (playerId) => {
    deleteAPlayer(playerId); // Pass postId to your function
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

  const handleSubmit = async (playerData) => {
    const data = {
      clubName: clubData.name,
      clubID: clubData._id,
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
      getClubInfo();
      getPlayers();
    }
  }, []);
  return (
    <div className="pb-20">
      <Header name={(clubData && clubData.name) || "Manage Your Club"} />
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
          {playersData &&
            clubData &&
            (playersData && playersData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {playersData
                  .filter((player) => player.clubID === clubData._id)
                  .map((player, index) => (
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

                          <p className="text-gray-600 text-sm">
                            {player.position}
                          </p>
                        </section>

                        <section className="flex items-center justify-between">
                          <p className="">
                            {player.clubID == clubData?._id && (
                              <div className="">
                                <p
                                  className="text-red-500 rounded-xl cursor-pointer"
                                  onClick={() => openDeleteModal(player._id)}
                                >
                                  Delete
                                </p>

                                <ConfirmDelete
                                  isOpen={isDeleteModalOpen}
                                  onClose={closeDeleteModal}
                                  onConfirm={handleConfirm}
                                  playerId={currentPlayerId}
                                />
                              </div>
                            )}
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
              <div className="text-2xl text-[#f2jk87]">
                Currently, The player list is empty. Please click the {"'"}Add
                New Player{"'"} button to add a new Player.
              </div>
            ))}

          {/* Modal */}
          {selectedPlayer && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 px-4 sm:px-40">
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-center text-3xl font-bold mb-4">
                  {selectedPlayer.name}
                </h2>
                <p className="text-gray-700">{selectedPlayer.age}</p>
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
