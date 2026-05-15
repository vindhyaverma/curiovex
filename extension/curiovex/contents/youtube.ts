const title =
  document.querySelector("h1 yt-formatted-string")?.textContent || "";

const channel =
  document.querySelector("#channel-name a")?.textContent || "";

const description =
  document.querySelector("#description-inline-expander")?.textContent || "";

const views =
  document.querySelector("#info span")?.textContent || "";

const comments =
  document.querySelector("#count")?.textContent || "";

// extract video id from URL
const videoId = new URLSearchParams(window.location.search).get("v") || "";

fetch("http://127.0.0.1:8000/analyze", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title,
    description,
    videoId,
    channel,
    views,
    comments
  }),
})
  .then((res) => res.json())
  .then((data) => {
    const existing = document.getElementById("curiovex-panel");
    if (existing) existing.remove();

    const panel = document.createElement("div");
    panel.id = "curiovex-panel";

    const isError = data.success === false;

    // Helper functions for UI
    const renderTags = (tags: string[]) => {
      if (!tags || tags.length === 0) return "";
      return `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
        ${tags.map(t => `<span style="background:#2d3139;color:#b0b5c0;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:500;">${t}</span>`).join('')}
      </div>`;
    };

    const renderList = (items: string[]) => {
      if (!items || items.length === 0) return "";
      return `<ul style="margin:8px 0 0 0;padding-left:18px;color:#c9d1d9;font-size:13px;line-height:1.6;">
        ${items.map(item => `<li style="margin-bottom:6px;">${item}</li>`).join('')}
      </ul>`;
    };

    const renderSection = (title: string, content: string) => {
      return `
      <div style="background:#222630;border:1px solid #303643;border-radius:8px;padding:12px;margin-bottom:12px;">
        <div style="color:#8b949e;font-size:11px;font-weight:bold;letter-spacing:0.5px;text-transform:uppercase;display:flex;align-items:center;gap:6px;">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0L10.3 5.7L16 8L10.3 10.3L8 16L5.7 10.3L0 8L5.7 5.7L8 0Z"/></svg>
          ${title}
        </div>
        ${content}
      </div>`;
    };

    const headerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <h2 style="margin:0;font-size:16px;font-weight:600;display:flex;align-items:center;gap:6px;">
          <span style="color:#f1c40f;">⚡</span> Curiovex AI
        </h2>
        <button id="curiovex-close" style="background:#2d3139;border:none;color:#8b949e;width:24px;height:24px;border-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;line-height:1;">✕</button>
      </div>
    `;

    const summaryHTML = isError 
      ? `<div style="font-size:14px;line-height:1.6;color:#c9d1d9;margin-bottom:12px;">
          AI intelligence layer could not generate analysis due to an API error.
         </div>
         <span style="background:#2d3139;color:#b0b5c0;padding:4px 10px;border-radius:6px;font-size:12px;display:inline-block;margin-bottom:16px;">Error</span>`
      : `<div style="font-size:14px;line-height:1.6;color:#c9d1d9;margin-bottom:16px;">
          ${data.summary || ""}
         </div>
         ${renderTags(data.tags)}`;

    const diffColor = data.difficulty === "N/A" ? "#8b949e" : "#58a6ff";
    const learnColor = data.learning_value === "N/A" ? "#8b949e" : "#3fb950";

    const statsHTML = `
      <div style="display:flex;gap:12px;margin-bottom:12px;">
        <div style="flex:1;background:#222630;border:1px solid #303643;border-radius:8px;padding:10px;">
          <div style="color:#8b949e;font-size:11px;margin-bottom:4px;">Difficulty</div>
          <div style="font-size:13px;font-weight:600;color:${diffColor};">${data.difficulty || "N/A"}</div>
        </div>
        <div style="flex:1;background:#222630;border:1px solid #303643;border-radius:8px;padding:10px;">
          <div style="color:#8b949e;font-size:11px;margin-bottom:4px;">Learning Value</div>
          <div style="font-size:13px;font-weight:600;color:${learnColor};">${data.learning_value || "N/A"}</div>
        </div>
      </div>
    `;

    const suitableForHTML = renderSection("SUITABLE FOR", `
      <div style="color:#c9d1d9;font-size:13px;margin-top:8px;line-height:1.5;">
        ${data.suitable_for || "N/A"}
      </div>
    `);

    const footerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding-top:16px;border-top:1px solid #303643;">
        <span style="background:#583bcc;color:white;padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600;">Elite Analyst Engine</span>
        <span style="color:#6e7681;font-size:11px;">YouTube Intelligence Layer</span>
      </div>
    `;

    panel.innerHTML = `
      ${headerHTML}
      ${summaryHTML}
      ${renderSection("KEY INSIGHTS", renderList(data.key_insights))}
      ${renderSection("ACTION ITEMS", renderList(data.action_items))}
      ${statsHTML}
      ${suitableForHTML}
      ${footerHTML}
    `;

    // panel styling
    panel.style.position = "fixed";
    panel.style.top = "70px";
    panel.style.right = "20px";
    panel.style.width = "400px";
    panel.style.maxHeight = "calc(100vh - 100px)";
    panel.style.overflowY = "auto";
    panel.style.padding = "20px";
    panel.style.background = "#1a1d24";
    panel.style.color = "white";
    panel.style.zIndex = "999999";
    panel.style.borderRadius = "16px";
    panel.style.boxShadow = "0 8px 32px rgba(0,0,0,0.5)";
    panel.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
    panel.style.border = "1px solid #303643";

    // Custom scrollbar via generic styles on body if needed, but simple overflow is fine

    document.body.appendChild(panel);

    const closeBtn = document.getElementById("curiovex-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => panel.remove());
      closeBtn.addEventListener("mouseover", () => closeBtn.style.background = "#3c424d");
      closeBtn.addEventListener("mouseout", () => closeBtn.style.background = "#2d3139");
    }
  })
  .catch((err) => {
    console.error(err);
  });