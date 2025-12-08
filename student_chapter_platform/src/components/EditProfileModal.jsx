"use client";
import React from "react";

/**
 * Props:
 *  - show: boolean
 *  - editForm: object
 *  - setEditForm: fn
 *  - onSave: fn
 *  - onCancel: fn
 *  - handleAvatarChange: fn
 */
export default function EditProfileModal({ show, editForm, setEditForm, onSave, onCancel, handleAvatarChange }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">
        <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              value={editForm.username || ""}
              onChange={(e) => setEditForm((prev) => ({ ...prev, username: e.target.value }))}
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              value={editForm.email || ""}
              onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              value={editForm.phone || ""}
              onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
            <input
              value={editForm.linkedinUrl || ""}
              onChange={(e) => setEditForm((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Skill Level</label>
            <select
              value={editForm.skillLevel || ""}
              onChange={(e) => setEditForm((prev) => ({ ...prev, skillLevel: e.target.value }))}
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50"
            >
              <option value="">Select</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Track</label>
            <select
              value={editForm.track || ""}
              onChange={(e) => setEditForm((prev) => ({ ...prev, track: e.target.value }))}
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50"
            >
              <option value="">Select</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Fullstack">Fullstack</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Avatar (optional)</label>
            <div className="flex items-center gap-3">
              <img
                src={
                  editForm.avatarDataUrl
                    ? editForm.avatarDataUrl
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(editForm.username || "User")}&background=14b8a6&color=fff`
                }
                alt="preview"
                className="w-16 h-16 rounded-full border"
              />
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
              <button
                type="button"
                onClick={() => setEditForm((prev) => ({ ...prev, avatarDataUrl: null }))}
                className="text-red-600 underline text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-full border hover:shadow-sm">
            Cancel
          </button>
          <button onClick={onSave} className="bg-gradient-to-r from-black to-cyan-400 text-white px-5 py-2 rounded-full">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
