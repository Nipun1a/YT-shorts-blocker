// We will add logic later to remove Shorts
// Function to remove Shorts section from homepage
function removeShorts() {
  // 1. Remove "Shorts" rows on homepage
  const sections = document.querySelectorAll('ytd-rich-section-renderer');
  sections.forEach(section => {
    const title = section.querySelector('span');
    if (title && title.textContent.includes('Shorts')) {
      section.remove();
    }
  });

  // 2. Redirect from Shorts page
  if (window.location.pathname.startsWith('/shorts')) {
    window.location.href = 'https://www.youtube.com/';
  }
}

// Function to watch for YouTube page changes
function startObserver() {
  removeShorts(); // Run once immediately

  const observer = new MutationObserver(removeShorts);
  observer.observe(document.body, { childList: true, subtree: true });
}

// Get enable/disable setting from storage
chrome.storage.sync.get("enabled", (data) => {
  const isEnabled = data.enabled === undefined ? true : data.enabled; // default to true
  if (isEnabled) {
    startObserver();
  }
});

