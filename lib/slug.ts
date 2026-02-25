import { customAlphabet } from "nanoid";

// Custom alphabet: alphanumeric, no ambiguous chars (0/O, 1/l/I)
const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz";
const generateSlug = customAlphabet(alphabet, 8);

export function createSlug(): string {
  return generateSlug();
}
