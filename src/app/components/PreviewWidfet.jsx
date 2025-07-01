'use client';
import React from "react";

export default function WidgetPreview({ feeds = [], view, settings = {} }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDomain = (url) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return "";
    }
  };

  const widgetStyle = {
    width: settings.useResponsive ? "100%" : `${settings.width || 350}px`,
    height: `${settings.height || 400}px`,
    padding: `${settings.padding || 5}px`,
    textAlign: settings.textAlign || "center",
    borderColor: settings.borderColor || "#ccc",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: settings.corner === "rounded" ? "10px" : "0px",
    margin: "auto",
    overflowY: "auto",
  };

  const titleStyle = {
    fontWeight: settings.boldTitle ? 'bold' : 'normal',
    fontSize: `${settings.titleSize || 14}px`,
    color: settings.titleColor || '#000',
    lineHeight: '1.2',
  };

  const descriptionStyle = {
    fontWeight: settings.boldDesc ? 'bold' : 'normal',
    fontSize: `${settings.descSize || 12}px`,
    color: settings.descColor || '#000',
    lineHeight: '1.2',
  };

  const renderFeedItem = (feed, i, viewType) => {
    const title = feed.title.length > settings.titleMax
      ? feed.title.slice(0, settings.titleMax) + "..."
      : feed.title;

    const description = feed.description?.length > settings.descMax
      ? feed.description.slice(0, settings.descMax) + "..."
      : feed.description;

    return (
      <div
        key={i}
        className={`border rounded shadow bg-white ${
          viewType === "list" ? "flex gap-3 p-3" : "p-2"
        }`}
      >
        {feed.image_url && (
          <img
            src={feed.image_url}
            alt={feed.title}
            className={`${
              viewType === "list"
                ? "w-24 h-20 object-cover rounded"
                : "w-full h-32 object-cover rounded mb-2"
            }`}
          />
        )}

        <div className={viewType === "list" ? "text-left" : ""}>
          {settings.showTitle !== false && (
            <h3 style={titleStyle} className="line-clamp-2 mb-1">
              {title}
            </h3>
          )}

          {feed.description && settings.showDesc !== false && (
            <p style={descriptionStyle} className="mt-1 line-clamp-3">
              {description}
            </p>
          )}

          {settings.showMeta !== false && (
            <div
              className={`mt-2 ${
                viewType === "list" ? "text-xs" : "text-[10px]"
              } text-gray-500`}
            >
              {feed.author && <span>By {feed.author} • </span>}
              {feed.date && <span>{formatDate(feed.date)}</span>}
            </div>
          )}

          {settings.showLink !== false && feed.orignal_link && (
            <a
              href={feed.orignal_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-xs mt-1 inline-block"
            >
              Read more
            </a>
          )}
        </div>
      </div>
    );
  };

  const renderFeeds = () => {
    if (!feeds.length) {
      return <p className="text-gray-500">No feeds available.</p>;
    }

    const slicedFeeds = feeds.slice(0, settings.posts);

    switch (view) {
      case "magazine":
        return (
          <div className="flex flex-col gap-6">
            {slicedFeeds.map((feed, i) => renderFeedItem(feed, i, "magazine"))}
          </div>
        );

      case "matrix-card":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slicedFeeds.map((feed, i) => renderFeedItem(feed, i, "matrix-card"))}
          </div>
        );

      case "matrix":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {slicedFeeds.map((feed, i) => renderFeedItem(feed, i, "matrix"))}
          </div>
        );

     case "card":
  return (
    <div className="w-full h-full overflow-x-auto px-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
      <div className="flex gap-4 h-full items-stretch">
        {slicedFeeds.map((feed, i) => (
          <div
            key={i}
            className="w-full max-w-full sm:max-w-[100%] shrink-0 rounded-2xl shadow-md bg-white p-4"
          >
            {renderFeedItem(feed, i, "card")}
          </div>
        ))}
      </div>
    </div>
  );



      case "list":
      default:
        return (
          <div className="flex flex-col gap-3">
            {slicedFeeds.map((feed, i) => renderFeedItem(feed, i, "list"))}
          </div>
        );
    }
  };

  return (
    <div
      style={{
        ...widgetStyle,
        backgroundColor: settings.background || '#f1f1f1',
      }}
      className="rounded-xl shadow-sm border"
    >
      {/* ✅ Title Header */}
      {settings.isCustomEnabled !== false && (
        <div
          style={{
            backgroundColor: settings.bgColor || '#f1f1f1',
            padding: '10px',
            fontSize: `${settings.fontSize || 16}px`,
            fontWeight: settings.bold ? 'bold' : 'normal',
            color: settings.fontColor || '#000000',
            textAlign: settings.textAlign || 'center',
            marginBottom: '10px',
            borderBottom: '1px solid #ddd',
          }}
        >
          {settings.mainTitleLink ? (
            <a
              href={settings.mainTitleLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {settings.mainTitle?.trim() || 'My Feed Title'}
            </a>
          ) : (
            settings.mainTitle?.trim() || 'My Feed Title'
          )}
        </div>
      )}

      {/* ✅ Feed List */}
      {renderFeeds()}
    </div>
  );
}
