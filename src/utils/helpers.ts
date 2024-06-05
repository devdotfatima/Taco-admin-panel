export function formatString(word: string) {
  if (!word) return word;

  word = word.charAt(0).toUpperCase() + word.slice(1);

  return word;
}
