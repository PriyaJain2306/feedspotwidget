'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

const Navbar = ({ collapsed, onCategorySelect }) => {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const fetchCategories = async () => {
      if (query.length < 1) {
        setCategories([]);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/backend/api/get_categories.php`);
        const data = await response.json();

        const filtered = (data.data || []).filter(
          (cat) =>
            cat?.name &&
            cat.name.toLowerCase().includes(query.toLowerCase())
        );

        setCategories(filtered);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, [query]);

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 z-30 bg-white border-b border-gray-300 h-16 transition-all duration-300 ${
        collapsed ? 'left-16 w-[calc(100%-4rem)]' : 'left-64 w-[calc(100%-16rem)]'
      }`}
    >
      <div className="flex items-center gap-4 px-4 py-2 h-full">
        {/* Search Input */}
        <div className="relative w-full max-w-xl" ref={inputRef}>
          <div className="flex items-center border border-gray-300 rounded px-2 py-1 bg-white">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search Widget Eg: Gardening, Baking, Yoga..."
              className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm"
            />
          </div>

          {/* Dropdown */}
          {showDropdown && categories.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto shadow z-50">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  onClick={() => {
                    setQuery(cat.name);
                    setShowDropdown(false);
                    if (onCategorySelect) {
                      onCategorySelect(cat.name); // 👉 Call parent function
                    }
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-900 font-medium"
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex-1" />

        {/* Avatar */}
        <button
          type="button"
          className="h-9 w-9 rounded-full bg-cyan-600 text-white font-semibold flex items-center justify-center"
        >
          p
        </button>
      </div>
    </header>
  );
};

export default Navbar;
