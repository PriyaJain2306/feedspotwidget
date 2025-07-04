'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Support() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ProtectedRoute>
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Navbar collapsed={collapsed} />

<div
  className={`mx-auto py-20 transition-all duration-300 ${
    collapsed ? 'px-50' : 'px-100'
  }`}
>          {/* Heading */}
          <h1 className="text-3xl font-bold text-center mb-12">Support and FAQ</h1>

          {/* Content layout */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Column - FAQ */}
            <div className="bg-white shadow p-6 rounded w-full lg:w-2/5 transition-all duration-300">
              <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>

              <div className="space-y-6 text-sm text-gray-700">
                {[
                  {
                    q: "What is a Feedspot widget?",
                    a: "Feedspot widget is a handy widget to help you embed and display your favourite RSS on your website. Putting the Feedspot widget on your site provides your readers with dynamic, fresh news that changes automatically.",
                  },
                  {
                    q: "How is RSS Widget different from the Feedspot Reader?",
                    a: "Feedspot Reader lets you follow multiple blogs, podcasts or news websites from one place. RSS Widget is a product that lets you embed and display the latest updates from your favourite sources.",
                  },
                  {
                    q: "How to get the widget?",
                    a: (
                      <ol className="list-decimal ml-6">
                        <li>Go to https://www.feedspot.com/widgets/create</li>
                        <li>Specify the RSS Feed URL or select a folder from your Feedspot account</li>
                        <li>Customize the look and feel to match your site</li>
                        <li>Copy and paste the code into your website</li>
                      </ol>
                    ),
                  },
                  {
                    q: "Which browsers does Feedspot support?",
                    a: (
                      <ul className="list-disc ml-6">
                        <li>Chrome</li>
                        <li>Firefox</li>
                        <li>Internet Explorer</li>
                        <li>Safari</li>
                      </ul>
                    ),
                  },
                  {
                    q: "How do I make content links open in a new window?",
                    a: (
                      <p>
                        You can configure it in settings. Options include:
                        <br />1. Open in a new tab/window
                        <br />2. Open in the same tab/window
                      </p>
                    ),
                  },
                  {
                    q: "Is RSS Widget free?",
                    a: "No. You require a Feedspot subscription. Choose a plan from the pricing page to upgrade.",
                  },
                  {
                    q: "Can I use my widget on unlimited websites?",
                    a: "Yes, you can use a widget on unlimited websites and platforms.",
                  },
                  {
                    q: "How many widgets can I create in one account?",
                    a: "Limits vary based on your subscription plan.",
                  },
                  {
                    q: "How often does my widget update?",
                    a: "Widget content is cached for five minutes. New updates appear within five minutes.",
                  },
                ].map(({ q, a }, index) => (
                  <div key={index}>
                    <p className="font-semibold">{q}</p>
                    <div>{a}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Sidebar Sections */}
            <div className="w-full lg:w-2/5 space-y-6 transition-all duration-300">
              <div className="bg-white shadow p-4 rounded">
                <h3 className="font-semibold text-md mb-3">Platforms</h3>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  <li>Blogspot/Blogger</li>
                  <li>Shopify</li>
                  <li>WordPress</li>
                  <li>Joomla</li>
                  <li>Wix</li>
                </ul>
              </div>

              <div className="bg-white shadow p-4 rounded">
                <h3 className="font-semibold text-md mb-3">Features</h3>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  <li>Easy Setup</li>
                  <li>Autoscroll</li>
                  <li>Multiple feeds</li>
                  <li>Podcast</li>
                  <li>Youtube</li>
                  <li>Multi-platform support</li>
                  <li>Customize Everything</li>
                  <li>Multiple Layouts</li>
                  <li>Fully responsive</li>
                </ul>
              </div>

              <div className="bg-white shadow p-4 rounded">
                <h3 className="font-semibold text-md mb-3">Resources and Specifications</h3>
                <ul className="list-disc ml-5 text-sm text-blue-600 space-y-1">
                  <li><a href="#">RSS feeds: An in-depth guide</a></li>
                  <li><a href="#">Widget examples portfolio</a></li>
                  <li><a href="#">Setup Specifications</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     </ProtectedRoute>
  );
 
}
