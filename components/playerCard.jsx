import React from "react";

export default function PlayerCard({
  name,
  position,
  foot,
  club,
  age,
  height,
}) {
  return (
    <div className="w-60 h-60 bg-gray-100 border border-gray-300 rounded-lg shadow-sm flex flex-col gap-2 justify-center items-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">{name}</h2>
      <p className="text-sm text-gray-600">
        Position: <span className="font-bold">{position}</span>
      </p>
      <p className="text-sm text-gray-600">
        Foot: <span className="font-bold">{foot}</span>
      </p>

      <p className="text-sm text-gray-600">
        Age: <span className="font-bold">{age}</span>
      </p>

      <p className="text-sm text-gray-600">
        Height: <span className="font-bold">{height}</span>
      </p>
      <p className="text-sm text-gray-600 pt-4">
        Club:{" "}
        <span className="font-bold bg-green-300 p-1 rounded-lg">{club}</span>
      </p>
    </div>
  );
}
