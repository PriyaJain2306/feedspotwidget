'use client';
import React, { useState } from 'react';
import {
  FaThList,
  FaRegNewspaper,
  FaThLarge,
  FaTh,
  FaRegClone,
} from 'react-icons/fa';
import WidgetPreview from './PreviewWidfet';

export default function FollowingView({ view, setView }) {
  return (
    <div className="p-4 space-y-6">
      <div className="p-4 bg-white rounded shadow-md border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">Following View</h2>
          <div className="flex items-center space-x-4">
            <button onClick={() => setView("list")} className={`text-xl ${view === "list" ? "text-blue-600" : "text-gray-600"}`} title="List View"><FaThList /></button>
            <button onClick={() => setView("magazine")} className={`text-xl ${view === "magazine" ? "text-blue-600" : "text-gray-600"}`} title="Magazine View"><FaRegNewspaper /></button>
            <button onClick={() => setView("matrix-card")} className={`text-xl ${view === "matrix-card" ? "text-blue-600" : "text-gray-600"}`} title="Matrix Card View"><FaThLarge /></button>
            <button onClick={() => setView("matrix")} className={`text-xl ${view === "matrix" ? "text-blue-600" : "text-gray-600"}`} title="Matrix View"><FaTh /></button>
            <button onClick={() => setView("card")} className={`text-xl ${view === "card" ? "text-blue-600" : "text-gray-600"}`} title="Card View"><FaRegClone /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
