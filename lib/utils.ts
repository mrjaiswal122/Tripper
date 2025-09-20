import { twMerge } from 'tailwind-merge';

// Utility function to concatenate and merge Tailwind class names conditionally
// Usage: cn('foo', condition && 'bar', ...)
export function cn(...classes: (string | false | null | undefined)[]): string {
  return twMerge(classes.filter(Boolean).join(' '));
}
