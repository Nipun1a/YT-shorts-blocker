const userId = "abc123"; // This would normally come from login
const toggle = document.getElementById("toggle");

const API_BASE = "http://localhost:5000/api/settings";

async function fetchSetting() {
  try {
    const res = await fetch(`${API_BASE}/${userId}`);
    const data = await res.json();
    toggle.checked = data.enabled;
  } catch (err) {
    console.error("Failed to fetch setting:", err);
  }
}

async function updateSetting(enabled) {
  try {
    await fetch(`${API_BASE}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ enabled }),
    });
  } catch (err) {
    console.error("Failed to update setting:", err);
  }
}

toggle.addEventListener("change", () => {
  updateSetting(toggle.checked);
});

// Load current setting on popup open
fetchSetting();
