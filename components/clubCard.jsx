import React from "react";
import Link from "next/link";

export default function ClubCard({
  name,
  id,
  manager,
  rating,
  category,
  clubid,
}) {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <svg
      key={index}
      className={`w-4 h-4 ${
        index < rating ? "text-yellow-500" : "text-gray-300"
      }`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.028 3.153a1 1 0 00.95.69h3.316c.969 0 1.371 1.24.588 1.81l-2.686 1.952a1 1 0 00-.364 1.118l1.027 3.153c.3.921-.755 1.688-1.54 1.118L10 13.6l-2.686 1.952c-.785.57-1.84-.197-1.54-1.118l1.027-3.153a1 1 0 00-.364-1.118L4.75 8.58c-.783-.57-.38-1.81.588-1.81h3.316a1 1 0 00.95-.69l1.028-3.153z" />
    </svg>
  ));

  return (
    <div
      className={`w-60 h-40 bg-gray-100 border border-gray-300 rounded-lg shadow-sm p-4 flex flex-col justify-center ${
        clubid == id && "bg-green-200"
      }`}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-1">{name}</h2>
      <p className="text-sm text-gray-600 mb-2">
        Manager: <span className="font-medium">{manager}</span>
      </p>
      <div className="flex items-center mb-2">
        <span className="text-sm text-gray-600">Rating: </span>
        <div className="flex ml-2">{stars}</div>
      </div>
      <p className="text-sm text-gray-600">
        Category: <span className="font-medium">{category}</span>
      </p>
      {clubid == id ? (
        <Link
          href={"/manage-club"}
          className="pt-4 text-sm font-light text-blue-700"
        >
          Manage Your Club
        </Link>
      ) : (
        <Link
          href={`/players/${id}`}
          className="pt-4 text-sm font-light text-blue-700"
        >
          View Players
        </Link>
      )}
    </div>
  );
}
