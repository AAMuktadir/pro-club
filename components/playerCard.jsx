import React from "react";

export default function PlayerCard({ name, position, foot, club }) {
  return (
    <div className="w-60 h-36 bg-gray-100 border border-gray-300 rounded-lg shadow-sm flex flex-col justify-center items-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">{name}</h2>
      <p className="text-sm text-gray-600">
        Position: <span className="font-medium">{position}</span>
      </p>
      <p className="text-sm text-gray-600">
        Foot: <span className="font-medium">{foot}</span>
      </p>
      <p className="text-sm text-gray-600 pt-4">
        Club:{" "}
        <span className="font-medium bg-green-300 p-1 rounded-lg">{club}</span>
      </p>
    </div>
  );
}
