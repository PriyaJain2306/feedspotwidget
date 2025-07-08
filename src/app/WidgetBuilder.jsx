'use client';
import React, { useState, useEffect, use } from 'react';
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
import { useSearchParams, useRouter } from 'next/navigation';
import { getAuthToken } from  './utils/auth'; // Assuming you have a utility to get auth token
const WidgetBuilder = ({ onLogout }) => {
  
const defaultSettings = {
  widgetName: '',
  rssfeedUrl: '',
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
  isCustomEnabled: true,
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
};

  const [collapsed, setCollapsed] = useState(false);
  const [view, setView] = useState('matrix');
  const [feeds, setFeeds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Technology');
  const [settings, setSettings] = useState(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [generatedCode, setGeneratedCode] = useState({
    widgetId: '',
    scriptCode: '',
    iframeCode: '',
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const widgetId = searchParams.get('id');
  const { token, username, isLoggedIn } = getAuthToken();

  // Load widget settings if editing
 useEffect(() => {
 

  if (!token) {
    console.error('No token found');
    return;
  }
  if (widgetId) {
    fetch(`http://localhost:8080/backend/api/get_widget_by_id.php?id=${widgetId}`, {
   headers: {
      'Authorization': token,
    },
  })
      .then((res) => res.json())
      .then((data) => {
        try {
          if (data.success && data.data) {
            const widget = data.data;
            const parsedSettings = widget.settings ? JSON.parse(widget.settings) : {};

            setSettings({
              ...parsedSettings,
              widgetName: widget.widget_name ?? '',
              rssfeedUrl: widget.feed_url ?? '',
            });

            console.log('Loaded settings:', parsedSettings);

            setSelectedCategory(widget.category_name ?? 'Technology');
          } else {
            console.warn('API returned unsuccessful response:', data);
          }
        } catch (error) {
          console.error('Failed to parse settings:', error);
        }
      })
      .catch((err) => {
        console.error('Error fetching widget data:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  } else {
    setIsLoading(false);
  }
}, [widgetId]);

 

  if (!token) {
    console.error('No token found');
    return;
  }
  // Load feeds by category
  useEffect(() => {
   
    if (!selectedCategory) return;
    fetch(`http://localhost:8080/backend/api/get_feeds.php?category=${encodeURIComponent(selectedCategory)}`, {
   headers: {
      'Authorization': token,
    },
  })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success' && Array.isArray(data.data)) {
          setFeeds(data.data);
          setSettings((prev) => ({
            ...prev,
            mainTitle: selectedCategory,
            rssfeedUrl: `http://localhost:8080/backend/api/get_feeds.php?category=${encodeURIComponent(selectedCategory)}`,
          }));
        } else {
          setFeeds([]);
        }
      })
      .catch(() => setFeeds([]));
  }, [selectedCategory]);

  const handleSaveWidget = async () => {
    const payload = {
      widget_name: settings.widgetName,
      feed_url: settings.rssfeedUrl,
      category_name: selectedCategory,
      view: view,
      settings,
      userid: 1,
      username: username || 'anonymous',
    };

    const url = widgetId
      ? 'http://localhost:8080/backend/api/update.php'
      : 'http://localhost:8080/backend/api/save_widget.php';

    const finalPayload = widgetId ? { ...payload, id: widgetId } : payload;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,'Authorization': token },
        body: JSON.stringify(finalPayload),
      });

      const result = await res.json();
      if (result.status === 'success' || result.success) {
        const id = widgetId || result.widget_id || crypto.randomUUID().slice(0, 8);
        const scriptCode = `<!-- start widget code --><script type="text/javascript" id="iframecontent" src="https://yourdomain.com/widgets/js/wd-iframecontent.js" data-wid="${id}" data-script="" data-host=""></script><!-- end widget code -->`;
        const iframeCode = `<iframe class="widget_preview_iframe" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen scrolling="no" style="width: 100%; height: 400px;" src="https://yourdomain.com/widgets/lookup/${id}"></iframe>`;

        setGeneratedCode({ widgetId: id, scriptCode, iframeCode });
        setShowPopup(true);
      } else {
        alert('Failed to save widget');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving widget');
    }
  };

  return (
    <div className="flex min-h-screen overflow-auto bg-white">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`flex flex-col flex-1 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
        <Navbar collapsed={collapsed} onCategorySelect={setSelectedCategory} />
        <main className="p-4 mt-16">
          <Header />
        </main>

        {!isLoading && (
          <section className="p-4">
            <div className="flex flex-col lg:flex-row flex-wrap gap-6 w-full">
              <div className="flex-1 min-w-[280px] flex flex-col gap-4">
                <RssfeedUrl settings={settings} setSettings={setSettings} />
                <FollowingView view={view} setView={setView} />
                <General settings={settings} setSettings={setSettings} />
                <FeedTitle settings={settings} setSettings={setSettings} />
                <FeedContent settings={settings} setSettings={setSettings} />
              </div>

              <div className="flex-1 min-w-[280px] flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <input
                    type="text"
                    placeholder="Enter Widget Name"
                    className="border border-gray-300 rounded px-4 py-2 text-sm w-full sm:w-64"
                    value={settings.widgetName ?? ''}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, widgetName: e.target.value }))
                    }
                  />
                  <button
                    className={`px-4 py-2 rounded font-semibold ${
                      !settings.widgetName ? 'bg-gray-300 cursor-not-allowed' : 'bg-yellow-300 hover:bg-yellow-400'
                    }`}
                    disabled={!settings.widgetName}
                    onClick={handleSaveWidget}
                  >
                    {widgetId ? 'Update Widget' : 'Save & Get Code'}
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded"
                    onClick={() => setSettings(defaultSettings)}
                  >
                    Reset
                  </button>
                </div>

                <div className="w-full overflow-y-auto" style={{ maxHeight: `${settings.height ?? 400}px` }}>
                  <WidgetPreview feeds={feeds} view={view} settings={settings} />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Popup for Generated Code */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-xl w-full max-w-2xl relative">
            <button className="absolute top-2 right-2 text-black" onClick={() => setShowPopup(false)}>✕</button>
            <div className="bg-green-500 text-white font-bold text-center py-2 rounded">Widget saved successfully</div>
            <div className="mt-4 text-lg font-semibold text-center">Your widget code</div>
            <textarea readOnly className="w-full border p-2 mt-3 text-sm" value={generatedCode.scriptCode} rows={4} />
            <div className="flex gap-2 mt-2">
              <button className="bg-black text-white px-4 py-1 rounded" onClick={() => navigator.clipboard.writeText(generatedCode.scriptCode)}>Copy Code</button>
              <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={() => setShowPopup(false)}>Done</button>
            </div>

            <details className="mt-4">
              <summary className="text-blue-600 cursor-pointer">Get Iframe Version</summary>
              <textarea readOnly className="w-full border p-2 mt-2 text-sm" value={generatedCode.iframeCode} rows={3} />
              <div className="flex gap-2 mt-2">
                <button className="bg-black text-white px-4 py-1 rounded" onClick={() => navigator.clipboard.writeText(generatedCode.iframeCode)}>Copy Iframe Code</button>
                <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={() => setShowPopup(false)}>Done</button>
              </div>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}
export default WidgetBuilder;