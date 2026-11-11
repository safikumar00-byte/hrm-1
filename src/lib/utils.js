// src/lib/utils.js
// Standard shadcn utility function for class merging

export function cn(...inputs) {
  return inputs
    .flat(Infinity)
    .filter(Boolean)
    .join(' ')
    .trim();
}
