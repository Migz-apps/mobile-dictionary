let memoryHistory = [];

export async function saveHistory(history) {
  memoryHistory = Array.isArray(history) ? history : [];
}

export async function loadHistory() {
  return memoryHistory;
}

export async function clearHistory() {
  memoryHistory = [];
}
