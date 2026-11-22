// Mejba Ad Blocker - YouTube ad handling (best effort; YouTube changes often)
(() => {
  const css = `
    #masthead-ad, ytd-ad-slot-renderer, ytd-banner-promo-renderer,
    ytd-promoted-sparkles-web-renderer, ytd-display-ad-renderer,
    .ytp-ad-overlay-container, .ytp-ad-image-overlay, ytd-in-feed-ad-layout-renderer,
    #player-ads, ytd-companion-slot-renderer { display: none !important; }`;
  const s = document.createElement("style");
  s.textContent = css;
  document.documentElement.appendChild(s);

  let enabled = true;
  chrome.storage.local.get(["enabled", "siteAllow"]).then((c) => {
    enabled = c.enabled !== false && !(c.siteAllow || []).includes(location.hostname);
  });
  chrome.storage.onChanged.addListener(() => {
    chrome.storage.local.get(["enabled", "siteAllow"]).then((c) => {
      enabled = c.enabled !== false && !(c.siteAllow || []).includes(location.hostname);
    });
  });

  function skipAd() {
    if (!enabled) return;
    const player = document.querySelector("#movie_player");
    const video = document.querySelector("video.html5-main-video");
    if (!player || !video) return;

    const skipBtn = document.querySelector(
      ".ytp-skip-ad-button, .ytp-ad-skip-button, .ytp-ad-skip-button-modern"
    );
    if (skipBtn) skipBtn.click();

    if (player.classList.contains("ad-showing")) {
      video.muted = true;
      if (isFinite(video.duration) && video.duration > 0) {
        video.currentTime = video.duration; // jump to the end of the ad
      }
      const closeBtn = document.querySelector(".ytp-ad-overlay-close-button");
      if (closeBtn) closeBtn.click();
    }
  }

  setInterval(skipAd, 300);
})();
