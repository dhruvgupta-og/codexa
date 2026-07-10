// Streak calculation utilities

/**
 * Returns the local date string (YYYY-MM-DD) for a given date.
 * Uses the user's browser timezone.
 */
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Computes the new streak count based on the last active date.
 *
 * Rules:
 * - Same day → no change (return current streak as-is)
 * - Yesterday → streak + 1 (continuation)
 * - Older than yesterday → streak resets to 1 (new streak)
 * - No lastActiveDate → streak starts at 1
 */
export function computeStreak(
  currentStreak: number,
  lastActiveDate: string | undefined | null
): { newStreak: number; isNewDay: boolean } {
  const todayKey = toDateKey(new Date());

  if (!lastActiveDate) {
    return { newStreak: 1, isNewDay: true };
  }

  if (lastActiveDate === todayKey) {
    // Already active today — no streak change
    return { newStreak: currentStreak, isNewDay: false };
  }

  // Calculate yesterday's date key
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = toDateKey(yesterday);

  if (lastActiveDate === yesterdayKey) {
    // Continuing the streak from yesterday
    return { newStreak: currentStreak + 1, isNewDay: true };
  }

  // Missed more than one day — reset
  return { newStreak: 1, isNewDay: true };
}
