import React from "react";
import { useState } from "react";

export default function NewPlayerModal({ onClose, onSubmit, error }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [foot, setFoot] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, position, email, contact, age, height, foot });
    // onClose();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <span className="text-2xl font-semibold">&times;</span>
        </button>
        <h2 className="text-3xl font-bold mb-8 text-center">Add New Player</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2  block w-full shadow-sm sm:text-lg border-gray-300 rounded-md bg-gray-200"
              required // Added required attribute
            />
          </div>
          <div className="flex items-center justify-between">
            <section>
              <label className="block text-lg font-medium text-gray-700">
                Position
              </label>
              <input
                type="text"
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="mt-2  block w-full shadow-sm sm:text-lg border-gray-300 rounded-md bg-gray-200"
                required // Added required attribute
              />
            </section>

            <section>
              <label className="block text-lg font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-2  block w-full shadow-sm sm:text-lg border-gray-300 rounded-md bg-gray-200"
                required // Added required attribute
              />
            </section>
          </div>

          <div className="flex items-center justify-between">
            <section>
              <label className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-2 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md bg-gray-200 ${
                  error?.status === 409 && "bg-red-400"
                }`}
                required // Added required attribute
              />
            </section>

            <section>
              <label
                className={`block text-lg font-medium text-gray-700 ${
                  error && error.status == 422 && "text-red-400"
                }`}
              >
                Contact
              </label>
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className={`mt-2 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md bg-gray-200 ${
                  error?.status === 422 && "bg-red-400"
                }`}
                required
              />
            </section>
          </div>

          <div className="flex items-center justify-between">
            <section>
              <label className="block text-lg font-medium text-gray-700">
                Height
              </label>
              <input
                type="text"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-2 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md bg-gray-200"
                required
              />
            </section>

            <section>
              <label className="block text-lg font-medium text-gray-700">
                Foot
              </label>
              <input
                type="text"
                id="foot"
                value={foot}
                onChange={(e) => setFoot(e.target.value)}
                className="mt-2 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md bg-gray-200"
                required
              />
            </section>
          </div>
          {error && (
            <p className="text text-red-600 text-sm">{error.message} </p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
