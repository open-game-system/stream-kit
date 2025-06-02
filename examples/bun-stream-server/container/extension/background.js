/**
 * Chrome Extension Background Script
 * 
 * This background script runs when the extension loads and creates a tab
 * that loads our streaming interface. This tab becomes the target that
 * Puppeteer will interact with to initiate screen streaming.
 * 
 * FLOW:
 * 1. Extension loads → background.js runs
 * 2. Creates hidden tab with streaming.html
 * 3. streaming.html loads PeerJS and streaming.js
 * 4. Puppeteer calls INITIALIZE() function in streaming.js context
 * 5. Screen capture and streaming begins
 */

chrome.tabs.create(
  {
    active: false, // Hidden tab - user doesn't need to see it
    url: `chrome-extension://${chrome.runtime.id}/streaming.html`,
  },
  (tab) => {
    console.log('[Background] Created streaming tab:', tab.id);
  }
);
