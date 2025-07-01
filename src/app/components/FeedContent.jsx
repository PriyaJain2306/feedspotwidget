'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';

export default function FeedContent({settings, setSettings}) {
  const [showAdvanced, setShowAdvanced] = useState(false);
//   const [settings, setSettings] = useState({
//     posts: 10,
//     showLink: false,
//     showReadMore: false,
//     background: '#ffffff',
//     showMeta: false,
//     dateFormat: 'Month DD, YYYY',
//     showTitle: false,
//     boldTitle: false,
//     titleMax: 55,
//     titleSize: 14,
//     titleColor: '#0077b5',
//     showDesc: false,
//     boldDesc: false,
//     descMax: 100,
//     descSize: 12,
//     descColor: '#377cc1',
//     includeKeywords: '',
//     excludeKeywords: '',
//   });

  const update = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 border rounded-xl bg-white shadow-sm">
      <div className="px-6 py-4 border-b bg-gray-100 rounded-t-xl">
        <h1 className="text-xl font-semibold text-blue-800">Feed Content</h1>
      </div>

      <div className="space-y-6 p-6">
        <Control label="Display (no. of post)" type="stepper" value={settings.posts} onChange={(v) => update('posts', v)} />
        <Control label="Display link to original content" type="toggle" value={settings.showLink} onChange={(v) => update('showLink', v)} />
        <Control label='Display "Read more"' type="toggle" value={settings.showReadMore} onChange={(v) => update('showReadMore', v)} />
        <Control label="Background" type="color" value={settings.background} onChange={(v) => update('background', v)} />
        <Control label="Show Author & Date" type="toggle" value={settings.showMeta} onChange={(v) => update('showMeta', v)} />

        {/* Date Format */}
        <div>
          <label className="block font-medium mb-1">Date Format</label>
          <div className="flex gap-2">
            {['Month DD, YYYY', 'DD-MM-YYYY'].map((format) => (
              <button
                key={format}
                className={`px-3 py-1 text-xs border rounded ${
                  settings.dateFormat === format
                    ? 'bg-blue-600 text-white'
                    : 'bg-white hover:bg-gray-100'
                }`}
                onClick={() => update('dateFormat', format)}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        <hr className="border-dashed" />

        <Control label="Show Title" type="toggle" value={settings.showTitle} onChange={(v) => update('showTitle', v)} />
        <Control label="Bold Title" type="toggle" value={settings.boldTitle} onChange={(v) => update('boldTitle', v)} />
        <Control label="Max characters title" type="stepper" value={settings.titleMax} onChange={(v) => update('titleMax', v)} />
        <Control label="Size of Title" type="stepper" value={settings.titleSize} onChange={(v) => update('titleSize', v)} />
        <Control label="Color: title font" type="color" value={settings.titleColor} onChange={(v) => update('titleColor', v)} />

        <hr className="border-dashed" />

        <Control label="Show Description" type="toggle" value={settings.showDesc} onChange={(v) => update('showDesc', v)} />
        <Control label="Bold Description" type="toggle" value={settings.boldDesc} onChange={(v) => update('boldDesc', v)} />
        <Control label="Max characters Description" type="stepper" value={settings.descMax} onChange={(v) => update('descMax', v)} />
        <Control label="Font size description" type="stepper" value={settings.descSize} onChange={(v) => update('descSize', v)} />
        <Control label="Description font color" type="color" value={settings.descColor} onChange={(v) => update('descColor', v)} />

        {/* Advanced Settings */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded text-sm flex items-center justify-center gap-2"
        >
          Advanced Settings {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showAdvanced && (
          <>
            <hr className="my-4" />
            <label className="font-medium">Keyword filters</label>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={settings.includeKeywords}
                onChange={(e) => update('includeKeywords', e.target.value)}
                className="border px-3 py-2 rounded w-full text-sm"
                placeholder="include keywords"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">➤</button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={settings.excludeKeywords}
                onChange={(e) => update('excludeKeywords', e.target.value)}
                className="border px-3 py-2 rounded w-full text-sm"
                placeholder="exclude keywords"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">➤</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Generic Reusable Control Component
function Control({ label, type, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="font-medium">{label}</label>

      {type === 'toggle' && (
        <Toggle checked={value} onChange={() => onChange(!value)} />
      )}

      {type === 'stepper' && (
        <div className="flex items-center gap-2">
          <button
            className="w-6 h-6 border rounded text-gray-600 flex items-center justify-center"
            onClick={() => onChange(Math.max(0, value - 1))}
          >
            <Minus size={14} />
          </button>
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-16 px-2 py-1 text-sm border rounded text-center"
          />
          <button
            className="w-6 h-6 border rounded text-gray-600 flex items-center justify-center"
            onClick={() => onChange(value + 1)}
          >
            <Plus size={14} />
          </button>
        </div>
      )}

      {type === 'color' && (
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded border"
        />
      )}
    </div>
  );
}

// Toggle Switch Component
function Toggle({ checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition duration-200" />
      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform duration-200 shadow" />
    </label>
  );
}
