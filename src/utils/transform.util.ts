export function createReverseMap<T extends Record<string, string>>(map: T) {
  const reversed: Record<string, keyof T> = {};
  for (const [key, value] of Object.entries(map)) {
    reversed[value] = key as keyof T;
  }
  return reversed;
}
