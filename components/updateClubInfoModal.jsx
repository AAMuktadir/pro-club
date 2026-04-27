import { useState } from "react";

const CATEGORIES = ["Division 1", "Division 2", "Division 3"];

export default function UpdateClubInfoModal({ clubData, onClose, onUpdate }) {
  const [name, setName] = useState(clubData.name);
  const [manager, setManager] = useState(clubData.manager);
  const [category, setCategory] = useState(clubData.category);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ name, manager, category });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Update Club</h2>
            <p className="text-xs text-slate-500 mt-0.5">Edit your club information</p>
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
          <div>
            <label htmlFor="club-name" className="block text-sm font-medium text-slate-700 mb-1.5">
              Club Name
            </label>
            <input
              id="club-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400"
              required
            />
          </div>

          <div>
            <label htmlFor="club-manager" className="block text-sm font-medium text-slate-700 mb-1.5">
              Manager
            </label>
            <input
              id="club-manager"
              type="text"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400"
              required
            />
          </div>

          <div>
            <label htmlFor="club-category" className="block text-sm font-medium text-slate-700 mb-1.5">
              Category
            </label>
            <select
              id="club-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
