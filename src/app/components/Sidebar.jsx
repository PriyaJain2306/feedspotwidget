'use client';

import React from "react";
import {
  FaHome,
  FaPuzzlePiece,
  FaFolderOpen,
  FaBook,
  FaQuestion,
  FaLightbulb,
  FaUsers,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import  Login from "./Login";

export default function Sidebar({ collapsed, setCollapsed }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear(); // or selectively remove: localStorage.removeItem('token');
    window.location.reload();
  };

  const menuItems = [
    { name: "Feedspot Home", icon: <FaHome />, href: "/" },
    { name: "Widget Home", icon: <FaPuzzlePiece />, href: "/", active: true },
    { name: "My Widgets", icon: <FaFolderOpen />, href: "/MyWidgets" },
    { name: "Widget Catlog", icon: <FaBook />, href: "/WidgetCatlog" },
    { name: "Support", icon: <FaQuestion />, href: "/support" },
    { name: "Widget Examples", icon: <FaLightbulb />, href: "/examples" },
    { name: "Customers", icon: <FaUsers />, href: "/customers" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-black text-white ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="h-full px-2 py-4 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Logo and Toggle */}
          <div className="flex items-center justify-between px-2 mb-6">
            {!collapsed && (
              <span className="text-xl font-bold tracking-wide">Feedspot</span>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-white ml-auto"
            >
              <FaBars size={18} />
            </button>
          </div>

          {/* Menu Items */}
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-md transition-all duration-200 text-white ${
                    item.active ? "bg-gray-700" : "hover:bg-gray-800"
                  }`}
                >
                  <span className="text-lg w-6 flex justify-center">
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="ml-3 text-sm font-medium">{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center p-2 mt-4 rounded-md text-white hover:bg-red-600 w-full"
        >
          <span className="text-lg w-6 flex justify-center">
            <FaSignOutAlt />
          </span>
          {!collapsed && (
            <span className="ml-3 text-sm font-medium">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
}
