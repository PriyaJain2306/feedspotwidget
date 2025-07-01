'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function MyWidgets() {
  const [collapsed, setCollapsed] = useState(false);

  const widgets = [
    {
      id: 1,
      name: 's',
      url: 'http://rss.feedspot.com/folder/78...',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar collapsed={collapsed} />

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-20">
          {/* Search Bar */}
         
          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-6">My Widgets</h1>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
              Create New Widget
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">
              Learn More
            </button>
          </div>

          {/* Widget Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-2 border">Widget Name</th>
                  <th className="px-4 py-2 border">Feed URL</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {widgets.map((widget) => (
                  <tr key={widget.id}>
                    <td className="px-4 py-2 border">
                      {widget.name}{' '}
                      <button className="text-blue-500 hover:underline ml-2">
                        ✎
                      </button>
                    </td>
                    <td className="px-4 py-2 border">
                      <a
                        href={widget.url}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {widget.url}
                      </a>
                    </td>
                    <td className="px-4 py-2 border space-x-2">
                      <button className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50">
                        🗑 Delete
                      </button>
                      <button className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50">
                        Embed Code
                      </button>
                      <button className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50">
                        Edit Widget
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
