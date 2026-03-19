import { twMerge } from 'tailwind-merge'

type ClassValue = string | undefined | null | false | 0

export function cn(...inputs: ClassValue[]): string {
  return twMerge(inputs.filter(Boolean).join(' '))
}
