type ClassValue = string | false | null | undefined;

/** Tiny classnames helper — keeps conditional class strings readable. */
export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}
