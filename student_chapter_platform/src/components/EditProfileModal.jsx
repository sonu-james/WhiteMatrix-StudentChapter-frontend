"use client";
import React from "react";

export default function EditProfileModal({ show, editForm, setEditForm, onSave, onCancel, handleAvatarChange }) {
  if (!show) return null;
  
  return (
    // backdrop: allow scrolling of page if modal taller than viewport but center when possible
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/60 p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Modal panel: responsive width, constrained height, internal scrolling */}
      <div
        className="
          bg-white  shadow-xl w-full
          max-w-2xl sm:max-w-3xl
          mx-auto
          p-10
          max-h-[90vh] overflow-y-auto
          scrollbar-thin scrollbar-thumb-gray-300
           relative 
        "
      >
         {/* ❌ Close Button */}
        <button
          onClick={onCancel}
          className="
            absolute top-4 right-4 text-gray-600
            hover:text-black text-2xl font-bold
          "
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              value={editForm.username || ""}
              onChange={(e) => setEditForm((prev) => ({ ...prev, username: e.target.value }))}
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-sm font-medium mb-1">Email (cannot be changed)</label>
            <input
              value={editForm.email || ""}
              readOnly
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">To change your email, contact support or use the dedicated email-change flow.</p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              value={editForm.phone || ""}
              onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
            <input
              value={editForm.linkedin || ""}
              onChange={(e) => setEditForm((prev) => ({ ...prev, linkedin: e.target.value }))}
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50"
              placeholder="https://www.linkedin.com/in/your-name"
            />
          </div>

          {/* College */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">College</label>
            <input
              value={editForm.college || ""}
              onChange={(e) => setEditForm((prev) => ({ ...prev, college: e.target.value }))}
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50"
              placeholder="Your college / institution"
            />
          </div>

          {/* GitHub */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">GitHub URL</label>
            <input
              value={editForm.github || ""}
              onChange={(e) => setEditForm((prev) => ({ ...prev, github: e.target.value }))}
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50"
              placeholder="https://github.com/your-username"
            />
          </div>

          {/* Profile / Bio */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Profile / Bio</label>
            <textarea
              value={editForm.profile || ""}
              onChange={(e) => setEditForm((prev) => ({ ...prev, profile: e.target.value }))}
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 min-h-[80px] resize-none"
              placeholder="A short bio — a sentence or two about yourself"
            />
          </div>

          {/* Avatar */}
          {/* <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Avatar (optional)</label>
            <div className="flex items-center gap-3">
              <img
                src={
                  editForm.avatarDataUrl
                    ? editForm.avatarDataUrl
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(editForm.username || "User")}&background=14b8a6&color=fff`
                }
                alt="preview"
                className="w-16 h-16 rounded-full border object-cover"
              />
              <div className="flex flex-col">
                <input type="file" accept="image/*" onChange={handleAvatarChange} />
                <button
                  type="button"
                  onClick={() => setEditForm((prev) => ({ ...prev, avatarDataUrl: null }))}
                  className="text-red-600 underline text-sm mt-2 self-start"
                >
                  Remove
                </button>
              </div>
            </div>
          </div> */}
        </div>

        {/* Actions */}
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
