"use client";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import { Domain } from "@/utils/constants";

export default function Home() {
  useEffect(() => {
    if (!Domain) {
      return null;
    } else {
    }
  }, []);

  return (
    <main className="bg-orange-100">
      <Header name={"Pro-Club"} />
      <div className="px-2 sm:px-40 py-20 ">
        <div className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8 rounded-lg shadow-lg text-white">
          <h2 className="text-3xl font-bold mb-4">Soccer Tournament</h2>
          <p className="text-lg mb-6">
            Join us from November 2nd to 6th for an exciting soccer tournament
            organized by Planetx Inc.! Do not miss out on the action—register
            now and be part of the competition!
          </p>
          <div className="text-center">
            <a
              href="/register"
              className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-full transition duration-300"
            >
              Register Now
            </a>
          </div>
        </div>

        <section className="py-8"></section>
        <div className="w-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 p-8 rounded-lg shadow-xl text-white">
          <h2 className="text-4xl font-extrabold mb-4 text-center">
            Soccer Tournament
          </h2>
          <p className="text-lg mb-4 text-center">
            Get ready for an exhilarating soccer tournament starting on October
            10, 2024, at Purbachal! Experience the thrill of
            competition—register now and secure your spot in the game!
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="/register"
              className="inline-block bg-pink-700 text-white hover:bg-pink-800 font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
