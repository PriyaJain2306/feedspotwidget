'use client';
import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
export default function WidgetCatlog() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar collapsed={collapsed} />
        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h1 className="text-3xl font-bold text-center mb-6">Widget Catalog</h1>
          {/* Add your widget catalog content here */}
        </div>
      </div>
    </div>
  );
}