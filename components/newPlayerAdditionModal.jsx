import React, { useState } from "react";

const POSITIONS = ["Goalkeeper", "Defender", "Midfielder", "Forward", "Striker", "Winger", "Other"];
const FOOT_OPTIONS = ["Right", "Left", "Both"];

export default function NewPlayerModal({ onClose, onSubmit, error }) {
  const [form, setForm] = useState({
    name: "",
    position: "",
    email: "",
    contact: "",
    age: "",
    height: "",
    foot: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Add New Player</h2>
            <p className="text-xs text-slate-500 mt-0.5">Fill in the player details below</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. John Smith"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400"
              required
            />
          </div>

          {/* Position + Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-slate-700 mb-1.5">
                Position <span className="text-red-400">*</span>
              </label>
              <select
                id="position"
                name="position"
                value={form.position}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400"
                required
              >
                <option value="">Select…</option>
                {POSITIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-1.5">
                Age <span className="text-red-400">*</span>
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="10"
                max="60"
                value={form.age}
                onChange={handleChange}
                placeholder="e.g. 24"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="player@email.com"
              className={`w-full px-4 py-2.5 rounded-xl border text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all duration-200 ${
                error?.status === 409
                  ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-500/40"
                  : "border-slate-200 bg-white focus:border-emerald-400"
              }`}
              required
            />
          </div>

          {/* Contact + Height */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-slate-700 mb-1.5">
                Contact <span className="text-red-400">*</span>
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                value={form.contact}
                onChange={handleChange}
                placeholder="+880…"
                className={`w-full px-4 py-2.5 rounded-xl border text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  error?.status === 422
                    ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-500/40"
                    : "border-slate-200 bg-white focus:border-emerald-400 focus:ring-emerald-500/40"
                }`}
                required
              />
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-slate-700 mb-1.5">
                Height <span className="text-red-400">*</span>
              </label>
              <input
                id="height"
                name="height"
                type="text"
                value={form.height}
                onChange={handleChange}
                placeholder="e.g. 5&apos;10&quot;"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400"
                required
              />
            </div>
          </div>

          {/* Foot */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Preferred Foot <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-3">
              {FOOT_OPTIONS.map((f) => (
                <label
                  key={f}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border cursor-pointer text-sm font-medium transition-all duration-200 ${
                    form.foot === f
                      ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="foot"
                    value={f}
                    checked={form.foot === f}
                    onChange={handleChange}
                    className="sr-only"
                    required
                  />
                  {f}
                </label>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
              <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-600">{error.message}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors shadow-sm"
            >
              Add Player
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
