export function normalizeAudioUrl(audio) {
  if (!audio || typeof audio !== 'string') return null;

  const trimmed = audio.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith('//')) {
    return `https:${trimmed}`;
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  return null;
}

/**
 * Extract all valid pronunciation entries from the API phonetics array.
 * Prefers entries that include both text and audio; deduplicates by URL.
 */
export function extractAudioPronunciations(phonetics = []) {
  if (!Array.isArray(phonetics)) return [];

  const seen = new Set();
  const withTextAndAudio = [];
  const audioOnly = [];

  for (const entry of phonetics) {
    const url = normalizeAudioUrl(entry?.audio);
    if (!url || seen.has(url)) continue;

    seen.add(url);
    const item = {
      url,
      text: entry.text?.trim() || null,
      sourceUrl: entry.sourceUrl || null,
    };

    if (item.text) {
      withTextAndAudio.push(item);
    } else {
      audioOnly.push(item);
    }
  }

  return [...withTextAndAudio, ...audioOnly];
}

export function getPrimaryPhoneticText(pronunciations, phonetics = []) {
  if (pronunciations.length > 0 && pronunciations[0].text) {
    return pronunciations[0].text;
  }

  const textOnly = phonetics.find((p) => p.text?.trim());
  return textOnly?.text?.trim() || null;
}

export function hasAudioPronunciation(phonetics = []) {
  return extractAudioPronunciations(phonetics).length > 0;
}
