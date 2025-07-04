'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

export default function WidgetsExamples() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ProtectedRoute>
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar collapsed={collapsed} />
        <div
          className={`py-20 transition-all duration-300 ${
            collapsed ? 'max-w-7xl px-4' : 'max-w-6xl px-20'
          } mx-auto`}
        >
          <div className="w-full h-10"></div>

          <h1 className="text-3xl text-center font-bold mb-4">Regular Sidebar Widgets</h1>
          <p className="text-center text-gray-600 mb-16">
            Below are some examples of widgets that can easily be created with Feedspot.
          </p>

          {/* List and Magazine Views */}
          <h2 className="text-2xl text-center font-semibold mb-12">List and Magazine Views</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 mb-24">
            <div>
              <img
                src="//cdn.feedspot.com/widgets/Assets/images/examples/techcrunch-list.png"
                className="w-full rounded shadow"
                alt="Techcrunch List"
              />
              <img
                src="//cdn.feedspot.com/widgets/Assets/images/examples/dark.png"
                className="w-full mt-6 rounded shadow"
                alt="Dark View"
              />
            </div>
            <div>
              <img
                src="//cdn.feedspot.com/widgets/Assets/images/examples/Capture9.PNG"
                className="w-full rounded shadow"
                alt="Capture 9"
              />
              <img
                src="//cdn.feedspot.com/widgets/Assets/images/examples/list_view.png"
                className="w-full mt-6 rounded shadow"
                alt="List View"
              />
            </div>
          </div>

          {/* Matrix Views */}
          <h2 className="text-2xl text-center font-semibold mb-12">Matrix Views</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 mb-24">
            <div>
              <img
                src="//cdn.feedspot.com/widgets/Assets/images/examples/Capture8.PNG"
                className="w-full rounded shadow"
                alt="Capture 8"
              />
            </div>
            <div>
              <img
                src="//cdn.feedspot.com/widgets/Assets/images/examples/youtube.png"
                className="w-full rounded shadow"
                alt="YouTube Widget"
              />
            </div>
          </div>

          {/* Matrix Card Views */}
          <h2 className="text-2xl text-center font-semibold mb-12">Matrix Card Views</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-24">
            {['mcard1', 'mcard2', 'mcard3'].map((img, idx) => (
              <img
                key={idx}
                src={`//cdn.feedspot.com/widgets/Assets/images/examples/${img}.png`}
                className="w-full rounded shadow"
                alt={`Matrix Card ${idx + 1}`}
              />
            ))}
          </div>

          {/* Card Views */}
          <h2 className="text-2xl text-center font-semibold mb-12">Card Views</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {['card1', 'card2', 'card3'].map((img, idx) => (
              <img
                key={idx}
                src={`//cdn.feedspot.com/widgets/Assets/images/examples/${img}.png`}
                className="w-full rounded shadow"
                alt={`Card View ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
