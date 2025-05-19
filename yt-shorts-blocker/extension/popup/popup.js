const toggle = document.getElementById('toggle');
const statusText = document.getElementById('status-text');

// Load setting
chrome.storage.sync.get('enabled', (data) => {
  const enabled = data.enabled !== false;
  toggle.checked = enabled;
  statusText.textContent = enabled ? "Blocking Shorts" : "Allowed";
});

// When toggled
toggle.addEventListener('change', () => {
  const isEnabled = toggle.checked;

  chrome.storage.sync.set({ enabled: isEnabled }, () => {
    statusText.textContent = isEnabled ? "Blocking Shorts" : "Allowed";

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      });
    });
  });
});
