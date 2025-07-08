(function () {
  const currentScript = document.currentScript;
  const widgetId = currentScript.getAttribute("data-widget-id");
  if (!widgetId) return console.error("Widget ID is missing");

  const apiUrl = `http://localhost:8080/backend/api/get_widget_by_id.php?id=${widgetId}`;
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      let { view, settings, feed_url } = data.data;
      
      try {
        if (typeof settings === "string") {
          settings = JSON.parse(settings);
        }
      } catch (e) {
        console.error("Failed to parse settings:", e);
      }
      console.log("Widget settings:", settings);

      if (!feed_url) return console.error("Feed URL missing");

      return fetch(feed_url)
        .then(res => res.json())
        .then(feed => {
          const feeds = feed.data;
          if (!feeds.length) return console.warn("No feeds found");

          const container = document.createElement("div");
          container.style.width = settings.useResponsive ? "20%" : `${settings.width || 350}px`;
          container.style.height = `${settings.height}px`;
          container.style.padding = `${settings.padding || 5}px`;
          container.style.textAlign = settings.textAlign || "center";
          container.style.border = `1px solid ${settings.borderColor || "#ccc"}`;
          container.style.borderRadius = settings.corner === "rounded" ? "10px" : "0px";
          container.style.overflowY = "auto";
          container.style.margin = "auto";
          container.style.backgroundColor = settings.background || "#f1f1f1";
          container.style.fontFamily = "sans-serif";
          container.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";

          // ✅ Header
          if (settings.isCustomEnabled !== false) {
            const header = document.createElement("div");
            header.style.backgroundColor = settings.bgColor || "#f1f1f1";
            header.style.padding = "10px";
            header.style.fontSize = `${settings.fontSize || 16}px`;
            header.style.fontWeight = settings.bold ? "bold" : "normal";
            header.style.color = settings.fontColor || "#000";
            header.style.textAlign = settings.textAlign || "center";
            header.style.borderBottom = "1px solid #ddd";
            header.style.marginBottom = "10px";

            const title = settings.mainTitle?.trim() || "My Feed Title";
            if (settings.mainTitleLink) {
              const link = document.createElement("a");
              link.href = settings.mainTitleLink;
              link.textContent = title;
              link.target = "_blank";
              link.rel = "noopener noreferrer";
              link.style.textDecoration = "none";
              link.style.color = "inherit";
              link.style.cursor = "pointer";
              header.appendChild(link);
            } else {
              header.textContent = title;
            }

            container.appendChild(header);
          }

          // ✅ Feed Container
          const feedContainer = document.createElement("div");
          feedContainer.style.display = ["card", "matrix", "matrix-card"].includes(view) ? "flex" : "block";
          feedContainer.style.flexDirection = view === "card" ? "row" : "column";
          feedContainer.style.flexWrap = view === "matrix" || view === "matrix-card" ? "wrap" : "nowrap";
          feedContainer.style.gap = "16px";
          feedContainer.style.rowGap = "16px";
          feedContainer.style.columnGap = "16px";

          if (view === "matrix") {
            feedContainer.style.display = "grid";
            feedContainer.style.gridTemplateColumns = "repeat(2, 1fr)";
          }

          if (view === "matrix-card") {
            feedContainer.style.display = "grid";
            feedContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(250px, 1fr))";
          }

          if (view === "card") {
            feedContainer.style.overflowX = "auto";
            feedContainer.style.padding = "0 5px";
          }

          feeds.slice(0, settings.posts || 5).forEach(feed => {
            const item = document.createElement("div");
            item.style.background = "#fff";
            item.style.border = "1px solid #e5e7eb";
            item.style.borderRadius = "12px";
            item.style.padding = "12px";
            item.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";
            item.style.display = "flex";
            item.style.flexDirection = "column";
            item.style.height = "100%";
            item.style.boxSizing = "border-box";
            if (view === "card") {
              item.style.minWidth = "280px";
              item.style.flex = "0 0 auto";
            }

            // Image
            if (feed.image_url) {
              const img = document.createElement("img");
              img.src = feed.image_url;
              img.alt = feed.title;
              img.style.width = view === "list" ? "100px" : "100%";
              img.style.maxHeight = "140px";
              img.style.objectFit = "cover";
              img.style.borderRadius = "6px";
              img.style.marginBottom = "8px";
              item.appendChild(img);
            }

            // Title
            if (settings.showTitle !== false && feed.title) {
              const h3 = document.createElement("h3");
              h3.textContent =
                feed.title.length > settings.titleMax
                  ? feed.title.slice(0, settings.titleMax) + "..."
                  : feed.title;
              h3.style.fontSize = `${settings.titleSize || 14}px`;
              h3.style.fontWeight = settings.boldTitle ? "bold" : "normal";
              h3.style.color = settings.titleColor || "#000";
              h3.style.margin = "8px 0 4px 0";
              h3.style.lineHeight = "1.2";
              item.appendChild(h3);
            }

            // Description
            if (settings.showDesc !== false && feed.description) {
              const p = document.createElement("p");
              p.textContent =
                feed.description.length > settings.descMax
                  ? feed.description.slice(0, settings.descMax) + "..."
                  : feed.description;
              p.style.fontSize = `${settings.descSize || 12}px`;
              p.style.fontWeight = settings.boldDesc ? "bold" : "normal";
              p.style.color = settings.descColor || "#000";
              p.style.margin = "4px 0";
              p.style.lineHeight = "1.4";
              item.appendChild(p);
            }

            // Meta
            if (settings.showMeta !== false) {
              const meta = document.createElement("div");
              meta.style.fontSize = "11px";
              meta.style.color = "#666";
              meta.style.marginTop = "8px";

              const date = feed.date
                ? new Date(feed.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "";

              meta.textContent = `${feed.author ? "By " + feed.author + " • " : ""}${date}`;
              item.appendChild(meta);
            }

            // Read More
            if (settings.showLink !== false && feed.orignal_link) {
              const link = document.createElement("a");
              link.href = feed.orignal_link;
              link.target = "_blank";
              link.rel = "noopener noreferrer";
              link.textContent = "Read more";
              link.style.display = "inline-block";
              link.style.marginTop = "6px";
              link.style.fontSize = "12px";
              link.style.color = "#3b82f6";
              link.style.textDecoration = "none";
              link.style.fontWeight = "500";
              item.appendChild(link);
            }

            feedContainer.appendChild(item);
          });

          container.appendChild(feedContainer);
          currentScript.parentNode.insertBefore(container, currentScript);
        });
    })
    .catch(err => console.error("Widget load failed:", err));
})();
