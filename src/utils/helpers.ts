export function formatString(word: string) {
  if (!word) return word; // Handle empty or undefined input

  // Remove trailing 's' if it exists
  if (word.endsWith("s")) {
    word = word.slice(0, -1);
  }

  // Capitalize the first letter
  word = word.charAt(0).toUpperCase() + word.slice(1);

  return word;
}
