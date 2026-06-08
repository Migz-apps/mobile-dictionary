export function validateWord(input) {
  if (!input || typeof input !== 'string') {
    return { valid: false, error: 'Please enter a word to search.' };
  }

  const trimmed = input.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: 'Please enter a word to search.' };
  }

  if (trimmed.length > 50) {
    return { valid: false, error: 'Word must be 50 characters or fewer.' };
  }

  if (!/^[a-zA-Z\-']+$/.test(trimmed)) {
    return {
      valid: false,
      error: 'Only letters, hyphens, and apostrophes are allowed.',
    };
  }

  return { valid: true, error: null };
}
