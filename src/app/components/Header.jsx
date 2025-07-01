'use client';
import React from "react";
import './headerstyle.css'; // adjust the path if needed

export default function Header() {
  return (
    <header className="header">
      <h1 className="header-title">Feedspot Widgets</h1>
      <h2 className="header-subtitle">Embed RSS Widget on your Website</h2>

      <div className="header-content">
        <p>
          Feedspot Widget is a handy widget which lets you embed and display latest updates
          from your favourite sources (Blogs, News Websites, Podcasts, Youtube Channels,
          RSS Feeds, etc) on your website. Watch Video.
        </p>
        <p>
          <strong>Step 1:</strong> Add your favourite websites to your account.<br /><br />
          <strong>Step 2:</strong> Customize the widget to match your website style.<br /><br />
          <strong>Step 3:</strong> Click “Save and Get Code”, then paste it on your site.<br /><br />
          <strong>Step 4:</strong> The widget updates automatically when new content is available.
        </p>
      </div>
    </header>
  );
}
