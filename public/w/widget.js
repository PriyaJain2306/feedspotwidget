(function () {
  const scriptTag = document.currentScript;
  const widgetId = scriptTag.getAttribute("data-widget-id");
  if (!widgetId) return;

  const container = document.createElement("div");
  container.id = `widget-${widgetId}`;
  scriptTag.parentNode.insertBefore(container, scriptTag.nextSibling);

  const formatDate = (dateStr, format = "Month DD, YYYY") => {
    const date = new Date(dateStr);
    if (format === "Month DD, YYYY") {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
    return date.toLocaleDateString();
  };

  fetch(`http://localhost:8080/backend/api/get_widget_by_id.php?id=${widgetId}`)
    .then(res => res.json())
    .then(data => {
      if (!data.data) throw new Error("Invalid widget data");

      const settings = JSON.parse(data.data.settings || "{}");
      const feedUrl = data.data.feed_url;
      const widgetName = data.data.widget_name || "My Feed";

      if (!feedUrl) {
        container.innerHTML = "Feed URL missing!";
        return;
      }

      fetch(feedUrl)
        .then(res => res.json())
        .then(feedData => {
          const feeds = Array.isArray(feedData.data) ? feedData.data : [];
          const sliced = feeds.slice(0, settings.posts || 10);

          const wrapper = document.createElement("div");
          wrapper.style.width = settings.useResponsive ? "100%" : `${settings.width}px`;
          wrapper.style.height = `${settings.height}px`;
          wrapper.style.padding = `${settings.padding}px`;
          wrapper.style.border = `1px solid ${settings.borderColor}`;
          wrapper.style.borderRadius = settings.corner === "rounded" ? "10px" : "0";
          wrapper.style.background = settings.background;
          wrapper.style.overflowY = "auto";
          wrapper.style.boxSizing = "border-box";
          wrapper.style.margin = "auto";

          if (settings.isCustomEnabled !== false) {
            const header = document.createElement("div");
            header.textContent = settings.mainTitle || widgetName;
            header.style.background = settings.bgColor;
            header.style.color = settings.fontColor;
            header.style.textAlign = settings.textAlign;
            header.style.fontWeight = settings.bold ? "bold" : "normal";
            header.style.fontSize = `${settings.fontSize}px`;
            header.style.padding = "10px";
            wrapper.appendChild(header);
          }

          const list = document.createElement("div");
          list.style.display = "flex";
          list.style.flexDirection = "column";
          list.style.gap = `${settings.spacing}px`;

          sliced.forEach(feed => {
            const item = document.createElement("div");
            item.style.background = "#fff";
            item.style.border = "1px solid #ccc";
            item.style.borderRadius = "6px";
            item.style.padding = "10px";

            // Title
            if (settings.showTitle !== false && feed.title) {
              const title = document.createElement("div");
              title.textContent = feed.title.length > settings.titleMax
                ? feed.title.slice(0, settings.titleMax) + "..."
                : feed.title;
              title.style.fontSize = `${settings.titleSize}px`;
              title.style.fontWeight = settings.boldTitle ? "bold" : "normal";
              title.style.color = settings.titleColor;
              list.appendChild(title);
              item.appendChild(title);
            }

            // Image
            if (settings.thumbnail !== "none" && feed.image_url) {
              const img = document.createElement("img");
              img.src = feed.image_url;
              img.style.width = "100%";
              img.style.borderRadius = "4px";
              img.style.margin = "5px 0";
              item.appendChild(img);
            }

            // Description
            if (settings.showDesc && feed.description) {
              const desc = document.createElement("div");
              desc.textContent = feed.description.length > settings.descMax
                ? feed.description.slice(0, settings.descMax) + "..."
                : feed.description;
              desc.style.fontSize = `${settings.descSize}px`;
              desc.style.fontWeight = settings.boldDesc ? "bold" : "normal";
              desc.style.color = settings.descColor;
              item.appendChild(desc);
            }

            // Meta
            if (settings.showMeta) {
              const meta = document.createElement("div");
              meta.textContent = `${feed.author || ""}${feed.date ? " • " + formatDate(feed.date, settings.dateFormat) : ""}`;
              meta.style.fontSize = "10px";
              meta.style.color = "#666";
              item.appendChild(meta);
            }

            // Read more
            if (settings.showLink && feed.orignal_link) {
              const link = document.createElement("a");
              link.href = feed.orignal_link;
              link.textContent = "Read more";
              link.target = "_blank";
              link.style.display = "block";
              link.style.marginTop = "5px";
              link.style.fontSize = "12px";
              link.style.color = "#007BFF";
              item.appendChild(link);
            }

            list.appendChild(item);
          });

          wrapper.appendChild(list);
          container.appendChild(wrapper);
        })
        .catch((err) => {
          console.error("Feed load failed", err);
          container.innerHTML = "Failed to load feed.";
        });
    })
    .catch((err) => {
      console.error("Widget load failed", err);
      container.innerHTML = "Failed to load widget.";
    });
})();
