/**
 * Parse and validate a year string from the prompt.
 *
 * @param input - Raw text the user typed.
 * @returns The numeric year if `input` is exactly 4 digits and falls in
 *   1000–9999 (after trimming); otherwise `null`.
 */
export function parseYear(input: string): number | null {
  const trimmed = input.trim()
  if (!/^\d{4}$/.test(trimmed)) return null
  const year = Number(trimmed)
  if (year < 1000 || year > 9999) return null
  return year
}
