'use client';
import React, { useState, useEffect } from 'react';
import './globals.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Navbar from './components/Navbar';
import RssfeedUrl from './components/rssfeedurl';
import WidgetPreview from './components/PreviewWidfet';
import FollowingView from './components/FollowigView';
import General from './components/General';
import FeedTitle from './components/FeedTitle';
import FeedContent from './components/FeedContent';

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const [view, setView] = useState('matrix');
  const [feeds, setFeeds] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const[rssfeedUrl, setRssfeedUrl] = useState('');

  const [settings, setSettings] = useState({
    rssfeedUrl: 'priya',
    width: 350,
    height: 400,
    padding: 5,
    spacing: 10,
    useResponsive: true,
    textAlign: 'center',
    borderColor: '#dbdbdb',
    corner: 'rounded',
    altImage: '',
    thumbnail: 'enclosure',
    showAdvanced: false,
    mainTitle: '',
    mainTitleLink: '',
    fontSize: 16,
    bold: false,
    bgColor: '#ffffff',
    fontColor: '#acadae',
    isCustomEnabled:true,
    posts: 10,
    showLink: false,
    showReadMore: false,
    background: '#ffffff',
    showMeta: true,
    dateFormat: 'Month DD, YYYY',
    showTitle: true,
    boldTitle: false,
    titleMax: 55,
    titleSize: 14,
    titleColor: '#0077b5',
    showDesc: false,
    boldDesc: false,
    descMax: 100,
    descSize: 12,
    descColor: '#377cc1',
    includeKeywords: '',
    excludeKeywords: '',
  });

useEffect(() => {
  if (!selectedCategory) return;

  fetch(`http://localhost:8000/api/get_feeds.php?category=${encodeURIComponent(selectedCategory)}`)
    .then((res) => res.json())
    .then((data) => {
      console.log('Fetched feeds:', data); // Debugging log

      // ✅ Adjusted check
      if (data.status === "success" && Array.isArray(data.data)) {
        setFeeds(data.data);
        setSettings((prev) => ({
  ...prev,
  mainTitle: selectedCategory || 'My Feedspot Widget',
  rssfeedUrl: `http://localhost:8000/api/get_feeds.php?category=${encodeURIComponent(selectedCategory)}`, // Assuming the API returns this
}));
      } else {
        setFeeds([]);
        console.warn('Unexpected API response format:', data);
      }
    })
    .catch((error) => {
      console.error('Failed to fetch feeds:', error);
      setFeeds([]);
    });
}, [selectedCategory]);


  return (
    <div className="flex min-h-screen overflow-auto bg-gray-50">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main content area */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          collapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <Navbar collapsed={collapsed} onCategorySelect={setSelectedCategory} />

        {/* Header */}
        <main className="p-4 mt-16">
          <Header />
        </main>

        {/* Editing + Preview */}
        <section className="p-4">
          <div className="flex flex-col lg:flex-row flex-wrap gap-6 w-full">
            {/* Left: Editing Sections */}
            <div className="flex-1 min-w-[280px] flex flex-col gap-4">
              <RssfeedUrl  rssfeedUrl={rssfeedUrl} setRssfeedUrl={setRssfeedUrl}/>
              <FollowingView view={view} setView={setView} />
              <General settings={settings} setSettings={setSettings} />
              <FeedTitle settings={settings} setSettings={setSettings} />
              <FeedContent settings={settings} setSettings={setSettings}  />
            </div>

            {/* Right: Preview */}
            <div className="flex-1 min-w-[280px]">
              <div
                className="w-full overflow-y-auto"
                style={{ maxHeight: `${settings.height || 400}px` }}
              >
                <WidgetPreview feeds={feeds} view={view} settings={settings} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
