'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../components/ProtectedRoute';

export default function MyWidgets() {
  const [collapsed, setCollapsed] = useState(false);
  const [widgets, setWidgets] = useState([]);
  const [editingWidget, setEditingWidget] = useState(null);
  const [embedCode, setEmbedCode] = useState('');
  const [showEmbed, setShowEmbed] = useState(false);
  const router = useRouter();

  // Fetch widgets
  useEffect(() => {
    fetch('http://localhost:8080/backend/api/get_widgets.php')
      .then((res) => res.json())
      .then((data) => setWidgets(data))
      .catch((err) => console.error('Error fetching widgets:', err));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    const res = await fetch('http://localhost:8080/backend/api/delete_widget.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ id }),
    });

    const data = await res.json();
    if (data.success) {
      setWidgets(widgets.filter((w) => w.id !== id));
    } else {
      alert('Failed to delete');
    }
  };

  const handleEmbed = (widget) => {
    const script = `<script src="https://yourdomain.com/widget.js" data-widget-id="${widget.id}"></script>`;
    const iframe = `<iframe src="https://yourdomain.com/embed/${widget.id}" width="100%" height="300"></iframe>`;
    setEmbedCode(`${script}\n${iframe}`);
    setShowEmbed(true);
  };

  const handleSaveUpdate = async () => {
    const res = await fetch('http://localhost:8080/backend/api/update.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingWidget),
    });

    const result = await res.json();
    if (result.success) {
      setWidgets((prev) =>
        prev.map((w) => (w.id === editingWidget.id ? editingWidget : w))
      );
      setEditingWidget(null);
    } else {
      alert('Update failed');
    }
  };

  return (
    <ProtectedRoute>
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar collapsed={collapsed} />
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h1 className="text-3xl font-bold text-center mb-6">My Widgets</h1>
          <div className="flex justify-center gap-4 mb-6">
            <a href="http://localhost:3000"className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
              Create New Widget
            </a>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">
              Learn More
            </button>
          </div>

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
                      {editingWidget?.id === widget.id ? (
                        <input
                          className="border p-1 w-full"
                          value={editingWidget.widget_name}
                          onChange={(e) =>
                            setEditingWidget({ ...editingWidget, widget_name: e.target.value })
                          }
                        />
                      ) : (
                        <>
                          {widget.widget_name}{' '}
                          <button
                            onClick={() => setEditingWidget({ ...widget })}
                            className="text-blue-500 hover:underline ml-2"
                          >
                            ✎
                          </button>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      {editingWidget?.id === widget.id ? (
                        <input
                          className="border p-1 w-full"
                          value={editingWidget.feed_url}
                          onChange={(e) =>
                            setEditingWidget({ ...editingWidget, feed_url: e.target.value })
                          }
                        />
                      ) : (
                        <a
                          href={widget.feed_url}
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {widget.feed_url}
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-2 border space-x-2">
                      {editingWidget?.id === widget.id ? (
                        <>
                          <button
                            onClick={handleSaveUpdate}
                            className="text-green-600 border border-green-600 px-3 py-1 rounded hover:bg-green-50"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingWidget(null)}
                            className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleDelete(widget.id)}
                            className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50"
                          >
                            🗑 Delete
                          </button>
                          <button
                            onClick={() => handleEmbed(widget)}
                            className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50"
                          >
                            Embed Code
                          </button>
                          <button
                            onClick={() => router.push(`/?id=${widget.id}`)}
                            className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50"
                          >
                            Edit Widget
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Embed Modal */}
          {showEmbed && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow max-w-xl w-full">
                <h2 className="text-lg font-bold mb-2">Embed Code</h2>
                <textarea value={embedCode} className="w-full h-32 p-2 border" readOnly />
                <button
                  onClick={() => setShowEmbed(false)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
