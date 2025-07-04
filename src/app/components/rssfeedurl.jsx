import React from "react";
import { ChevronRight, HelpCircle } from "lucide-react";

export default function RssfeedUrl({settings, setSettings}) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-12 border border-gray-300  shadow-sm bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-300 bg-gray-200 ">
        <h1 className="text-xl font-semibold text-blue-800">RSS Feed URL</h1>
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-6 pb-8">
        {/* Enter Feed URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            Enter Feed URL
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </label>
          <div className="flex items-center gap-2">
           <input
  type="text"
  className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  placeholder="http://rss.feedspot.com/folder/736245/rss"
  onChange={(e) =>
    setSettings((prev) => ({
      ...prev,
      rssfeedUrl: e.target.value,
    }))
  }
  value={settings.rssfeedUrl || ''} // 👈 fallback for undefined
/>

         
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* OR Select from Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            OR Select your Feedspot account or Folder Feed URL
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </label>
          <select className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>Select</option>
            <option>Folder 1</option>
            <option>Folder 2</option>
          </select>
        </div>
      </div>
    </div>
  );
}
