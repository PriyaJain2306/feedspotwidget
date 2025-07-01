'use client';
import React, { useState } from "react";
import { ChevronDown, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export default function General({ settings, setSettings }) {
  // const [settings, setSettings] = useState({
  //   width: 350,
  //   height: 400,
  //   padding: 5,
  //   spacing: 10,
  //   useResponsive: true,
  //   textAlign: 'center',
  //   borderColor: '#dbdbdb',
  //   corner: 'rounded',
  //   altImage: '',
  //   thumbnail: 'enclosure',
  //   showAdvanced: false,
  // });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 border border-gray-300 rounded-xl shadow-sm bg-white">
      <div className="px-6 py-4 border-b border-gray-300 bg-gray-100 rounded-t-xl">
        <h2 className="text-blue-800 font-semibold">General</h2>
      </div>
      <div className="p-4 space-y-4">

        {/* Width */}
        <div className="flex items-center justify-between">
          <label className="font-medium w-1/3">Width</label>
          <div className="flex flex-col space-y-2 w-2/3">
            <label className="flex items-center space-x-2">
              <input type="radio" name="widthType" onChange={() => updateSetting('useResponsive', false)} checked={!settings.useResponsive} />
              <span>In Pixels</span>
              <button className="border rounded px-2" onClick={() => updateSetting('width', Math.max(0, settings.width - 10))} disabled={settings.useResponsive}>-</button>
              <input
                value={settings.width}
                onChange={e => updateSetting('width', Number(e.target.value))}
                className="w-16 text-center border rounded"
                disabled={settings.useResponsive}
              />
              <button className="border rounded px-2" onClick={() => updateSetting('width', settings.width + 10)} disabled={settings.useResponsive}>+</button>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="widthType" onChange={() => updateSetting('useResponsive', true)} checked={settings.useResponsive} />
              <span>Responsive (Mobile friendly)</span>
            </label>
          </div>
        </div>

        {/* Height */}
        <div className="flex items-center justify-between">
          <label className="font-medium w-1/3">Height</label>
          <div className="flex items-center space-x-2 w-2/3">
            <span>In Pixels</span>
            <button className="border rounded px-2" onClick={() => updateSetting('height', Math.max(0, settings.height - 10))}>-</button>
            <input
              value={settings.height}
              onChange={e => updateSetting('height', Number(e.target.value))}
              className="w-16 text-center border rounded"
            />
            <button className="border rounded px-2" onClick={() => updateSetting('height', settings.height + 10)}>+</button>
          </div>
        </div>

        {/* Open links */}
        <div className="flex items-center justify-between">
          <label className="font-medium w-1/3">Open links</label>
          <select className="w-2/3 border rounded p-1">
            <option>New window</option>
            <option>Same window</option>
          </select>
        </div>

        {/* Font Style */}
        <div className="flex items-center justify-between">
          <label className="font-medium w-1/3">Font Style</label>
          <select className="w-2/3 border rounded p-1">
            <option>Arial, Helvetica, sans-serif</option>
            <option>Times New Roman</option>
            <option>Courier New</option>
            <option>Georgia</option>
            <option>Verdana</option>
          </select>
        </div>

        {/* Text Alignment */}
        <div className="flex items-center justify-between">
          <label className="font-medium w-1/3">Text alignment</label>
          <div className="flex space-x-2 w-2/3">
            {['left', 'center', 'right'].map(alignment => (
              <button
                key={alignment}
                onClick={() => updateSetting('textAlign', alignment)}
                className={`w-8 h-8 border rounded flex items-center justify-center ${settings.textAlign === alignment ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {alignment === 'left' && <AlignLeft size={16} />}
                {alignment === 'center' && <AlignCenter size={16} />}
                {alignment === 'right' && <AlignRight size={16} />}
              </button>
            ))}
          </div>
        </div>

        {/* Border Color */}
        <div className="flex items-center justify-between">
          <label className="font-medium w-1/3">Border color</label>
          <input
            type="color"
            value={settings.borderColor}
            onChange={e => updateSetting('borderColor', e.target.value)}
            className="w-2/3 h-8 border rounded"
          />
        </div>

        {/* Corner */}
        <div className="flex items-center justify-between">
          <label className="font-medium w-1/3">Corner</label>
          <div className="flex space-x-2 w-2/3">
            <button onClick={() => updateSetting('corner', 'square')} className={`border rounded px-3 py-1 ${settings.corner === 'square' ? 'bg-blue-500 text-white' : ''}`}>Square</button>
            <button onClick={() => updateSetting('corner', 'rounded')} className={`border rounded px-3 py-1 ${settings.corner === 'rounded' ? 'bg-blue-500 text-white' : ''}`}>Rounded</button>
          </div>
        </div>

        {/* Padding */}
        <div className="flex items-center justify-between">
          <label className="font-medium w-1/3">Padding</label>
          <div className="flex items-center space-x-2 w-2/3">
            <button className="border rounded px-2" onClick={() => updateSetting('padding', Math.max(0, settings.padding - 1))}>-</button>
            <input value={settings.padding} onChange={e => updateSetting('padding', Number(e.target.value))} className="w-12 text-center border rounded" />
            <button className="border rounded px-2" onClick={() => updateSetting('padding', settings.padding + 1)}>+</button>
          </div>
        </div>

        {/* Spacing */}
        <div className="flex items-center justify-between">
          <label className="font-medium w-1/3">Space Between Items</label>
          <div className="flex items-center space-x-2 w-2/3">
            <button className="border rounded px-2" onClick={() => updateSetting('spacing', Math.max(0, settings.spacing - 1))}>-</button>
            <input value={settings.spacing} onChange={e => updateSetting('spacing', Number(e.target.value))} className="w-12 text-center border rounded" />
            <button className="border rounded px-2" onClick={() => updateSetting('spacing', settings.spacing + 1)}>+</button>
          </div>
        </div>

        {/* Advanced Toggle */}
        <div className="pt-4">
          <button onClick={() => updateSetting('showAdvanced', !settings.showAdvanced)} className="w-full bg-blue-600 text-white rounded py-2 flex items-center justify-between px-4">
            Advanced Settings <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {settings.showAdvanced && (
          <div className="border-t pt-4">
            <label className="font-medium">Alternate Image</label>
            <div className="flex items-center space-x-2 mt-1">
              <input
                type="text"
                placeholder="http:// or https://"
                value={settings.altImage}
                onChange={e => updateSetting('altImage', e.target.value)}
                className="w-full border rounded p-1"
              />
              <button className="bg-blue-600 text-white px-3 py-1 rounded">→</button>
            </div>

            <div className="mt-4">
              <label className="font-medium">Choose Thumbnail</label>
              <select
                className="w-full border rounded p-1 mt-1"
                value={settings.thumbnail}
                onChange={e => updateSetting('thumbnail', e.target.value)}
              >
                <option value="auto">Auto</option>
                <option value="enclosure">Enclosure</option>
                <option value="first-image">First Image</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
