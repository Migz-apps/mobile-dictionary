import * as Haptics from 'expo-haptics';

export async function safeHaptic(style = Haptics.ImpactFeedbackStyle.Light) {
  try {
    await Haptics.impactAsync(style);
  } catch {
    // Haptics unavailable on some devices — ignore
  }
}
