// Mejba Ad Blocker - hides ads, cookie pop-ups, sign-up overlays
(async () => {
  let cfg = {};
  try { cfg = await chrome.storage.local.get(["enabled", "siteAllow"]); } catch (e) { return; }
  if (cfg.enabled === false) return;
  if ((cfg.siteAllow || []).includes(location.hostname)) return;

  const selectors = [
    // Generic ads
    'ins.adsbygoogle', '[id^="google_ads_"]', '[id^="div-gpt-ad"]', '[class*="adsbygoogle"]',
    'iframe[src*="doubleclick.net"]', 'iframe[src*="googlesyndication.com"]',
    '.ad-banner', '.ad-container', '.ad-slot', '.advert', '.advertisement',
    '[aria-label="Advertisement"]', '[data-ad-slot]', '[id*="sponsored"]',
    '.taboola', '#taboola-below-article', '.OUTBRAIN', '[id^="outbrain"]',
    // Cookie pop-ups
    '#onetrust-banner-sdk', '#onetrust-consent-sdk', '#CybotCookiebotDialog',
    '.cc-window', '.cc-banner', '#cookie-law-info-bar', '.cookie-banner', '.cookie-notice',
    '#cookie-notice', '[id*="cookie-consent"]', '[class*="cookie-consent"]',
    '.fc-consent-root', '#gdpr-cookie-message', '.truste_overlay', '#qc-cmp2-container',
    // Sign-up forms, newsletter pop-ups, floating videos
    '.newsletter-popup', '[class*="newsletter-modal"]', '[class*="signup-modal"]',
    '[class*="subscribe-popup"]', '.mc-modal', '.pum-overlay',
    '[class*="floating-video"]', '[class*="sticky-video"]', '[class*="video-float"]'
  ];

  const style = document.createElement("style");
  style.id = "mejba-ad-blocker-style";
  style.textContent = selectors.join(",\n") + " { display: none !important; }";
  (document.head || document.documentElement).appendChild(style);

  // Some cookie pop-ups lock page scrolling. Unlock it once they are hidden.
  const unlock = () => {
    const b = document.body;
    if (b && getComputedStyle(b).overflow === "hidden" &&
        document.querySelector("#onetrust-consent-sdk, #CybotCookiebotDialog, .fc-consent-root")) {
      b.style.setProperty("overflow", "auto", "important");
    }
  };
  new MutationObserver(unlock).observe(document.documentElement, { childList: true, subtree: true });
})();
