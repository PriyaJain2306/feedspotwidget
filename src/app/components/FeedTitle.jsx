'use client';
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FeedTitle({ settings, setSettings }) {


  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="border p-6 bg-white rounded shadow-sm w-full max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold text-blue-700 border-b pb-2 mb-6">Feed Title</h2>

      {/* Custom Toggle */}
      <div className="flex items-center justify-between mb-6">
        <label className="w-40 font-medium">Custom</label>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={settings.isCustomEnabled}
            onChange={(e) => updateSetting('isCustomEnabled', e.target.checked)}

          />
          <div className={`w-11 h-6 bg-gray-300 rounded-full p-1 duration-300 ${settings.isCustomEnabled ? 'bg-blue-600' : ''}`}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${settings.isCustomEnabled ? 'translate-x-5' : ''}`} />
          </div>
        </label>
      </div>

      {/* Conditionally render the rest if Custom is enabled */}
      {settings.isCustomEnabled && (
        <>
          {/* Main Title */}
          <div className="flex items-center gap-4 mb-4">
            <label className="w-40 font-medium">Main Title</label>
            <input
              type="text"
              className="flex-1 border rounded p-2"
              placeholder="Example..."
              value={settings.mainTitle || ''}
              onChange={(e) => updateSetting('mainTitle', e.target.value)}
            />
          </div>

          {/* Main Title Link */}
          <div className="flex items-center gap-4 mb-4">
            <label className="w-40 font-medium">Main Title Link</label>
            <input
              type="text"
              className="flex-1 border rounded p-2"
              placeholder="Example..."
              value={settings.mainTitleLink || ''}
              onChange={(e) => updateSetting('mainTitleLink', e.target.value)}
            />
          </div>

          {/* Font Size */}
          <div className="flex items-center gap-4 mb-4">
            <label className="w-40 font-medium">Font Size</label>
            <div className="flex items-center gap-3">
              <button onClick={() => updateSetting('fontSize', (settings.fontSize || 16) - 1)} className="p-2 rounded-full bg-gray-300">
                <Minus size={16} />
              </button>
              <span>{settings.fontSize || 16}</span>
              <button onClick={() => updateSetting('fontSize', (settings.fontSize || 16) + 1)} className="p-2 rounded-full bg-blue-500 text-white">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Bold Toggle */}
          <div className="flex items-center gap-4 mb-4">
            <label className="w-40 font-medium">Bold</label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={settings.bold || false}
                onChange={() => updateSetting('bold', !settings.bold)}
              />
              <div className={`w-11 h-6 bg-gray-300 rounded-full p-1 duration-300 ${settings.bold ? 'bg-blue-600' : ''}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${settings.bold ? 'translate-x-5' : ''}`} />
              </div>
            </label>
          </div>

          {/* Background Color */}
          <div className="flex items-center gap-4 mb-4">
            <label className="w-40 font-medium">Background Color</label>
            <div className="flex items-center gap-2 w-full">
              <input
                type="color"
                value={settings.bgColor || '#ffffff'}
                onChange={(e) => updateSetting('bgColor', e.target.value)}
                className="w-10 h-10 p-0 border"
              />
              <input
                type="text"
                className="border rounded p-2 w-full"
                value={settings.bgColor || '#ffffff'}
                onChange={(e) => updateSetting('bgColor', e.target.value)}
              />
            </div>
          </div>

          {/* Font Color */}
          <div className="flex items-center gap-4 mb-4">
            <label className="w-40 font-medium">Font Color</label>
            <div className="flex items-center gap-2 w-full">
              <input
                type="color"
                value={settings.fontColor || '#acadae'}
                onChange={(e) => updateSetting('fontColor', e.target.value)}
                className="w-10 h-10 p-0 border"
              />
              <input
                type="text"
                className="border rounded p-2 w-full"
                value={settings.fontColor || '#acadae'}
                onChange={(e) => updateSetting('fontColor', e.target.value)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
