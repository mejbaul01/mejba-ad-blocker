// Mejba Ad Blocker - background service worker
const ALL_TYPES = ["script","image","sub_frame","xmlhttprequest","ping","media","other","stylesheet"];

async function sync() {
  const { enabled = true, siteAllow = [], customDomains = [] } =
    await chrome.storage.local.get(["enabled", "siteAllow", "customDomains"]);

  await chrome.declarativeNetRequest.updateEnabledRulesets(
    enabled ? { enableRulesetIds: ["ads"] } : { disableRulesetIds: ["ads"] }
  );

  const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
  const addRules = [];
  let id = 1;

  if (enabled) {
    customDomains.forEach((d) => {
      addRules.push({
        id: id++, priority: 1, action: { type: "block" },
        condition: { requestDomains: [d], resourceTypes: ALL_TYPES }
      });
    });
  }
  // Sites the user turned off: allow everything on that site
  siteAllow.forEach((h) => {
    addRules.push({
      id: id++, priority: 2, action: { type: "allowAllRequests" },
      condition: { requestDomains: [h], resourceTypes: ["main_frame", "sub_frame"] }
    });
  });

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: oldRules.map((r) => r.id),
    addRules
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.setExtensionActionOptions({ displayActionCountAsBadgeText: true });
  sync();
});
chrome.runtime.onStartup.addListener(sync);
chrome.storage.onChanged.addListener(sync);
