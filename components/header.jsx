"use client";
import React, { useEffect, useState } from "react";
import Logout from "./logout";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ name }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const pathname = usePathname();

  // useEffect(() => {
  //   const token = document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith("token="))
  //     ?.split("=")[1];
  //   setIsLoggedIn(!!token); // Set true if token exists, otherwise false
  // }, []);

  return (
    <div className="bg-gray-300 w-full flex items-center justify-between py-6 px-12">
      <h4 className={`${pathname === "/posts" ? "text-3xl" : "text-xl"}`}>
        {name}
      </h4>
      <div className="hidden md:flex gap-8 items-center text-white">
        <Link
          href="/"
          className={`bg-gray-600 p-2 hover:text-white duration-300 ${
            pathname === "/" ? "bg-green-200 text-black" : ""
          }`}
        >
          Home
        </Link>

        <Link
          href="/clubs"
          className={`bg-gray-600 p-2 hover:text-white duration-300 ${
            pathname === "/clubs" ? "bg-green-200 text-black" : ""
          }`}
        >
          Clubs
        </Link>

        <Link
          href="/players"
          className={`bg-gray-600 p-2 hover:text-white duration-300 ${
            pathname === "/players" ? "bg-green-200 text-black" : ""
          }`}
        >
          Players
        </Link>

        {isLoggedIn && (
          <>
            <Link
              href="/manage-club"
              className={`bg-gray-600 p-2 hover:text-white duration-300 ${
                pathname === "/manage-club" ? "bg-green-200 text-black" : ""
              }`}
            >
              Manage Your Club
            </Link>
            <Logout />
          </>
        )}

        {!isLoggedIn && (
          <Link
            href="/login"
            className={`bg-gray-600 p-2 hover:text-white duration-300 ${
              pathname === "/login" ? "bg-green-200 text-black" : ""
            }`}
          >
            Login
          </Link>
        )}
      </div>
      <button
        className="md:hidden flex items-center justify-center p-3"
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:hidden flex-col fixed inset-0 bg-gray-300 p-8 text-center`}
      >
        <Link
          href="/"
          className={`bg-yellow-300 p-2 mb-2 hover:bg-yellow-600 hover:text-white duration-300 ${
            pathname === "/" ? "text-white bg-gray-500" : ""
          }`}
        >
          Home
        </Link>

        <Link
          href="/clubs"
          className={`bg-yellow-300 p-2 mb-2 hover:bg-yellow-600 hover:text-white duration-300`}
        >
          Clubs
        </Link>

        <Link
          href="/players"
          className={`bg-yellow-300 p-2 mb-2 hover:bg-yellow-600 hover:text-white duration-300`}
        >
          Players
        </Link>

        {isLoggedIn && (
          <>
            <Link
              href="/manage-club"
              className={`bg-yellow-300 p-2 mb-2 hover:bg-yellow-600 hover:text-white duration-300`}
            >
              Manage Your Club
            </Link>
            <Logout />
          </>
        )}

        {!isLoggedIn && (
          <Link
            href="/login"
            className={`bg-yellow-300 p-2 mb-2 hover:bg-yellow-600 hover:text-white duration-300`}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
