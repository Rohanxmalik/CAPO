import { format, formatDistanceToNow } from 'date-fns';

export function formatTimestamp(date: string | Date): string {
  return format(new Date(date), 'HH:mm');
}

export function formatFullDate(date: string | Date): string {
  return format(new Date(date), 'MMM d, yyyy HH:mm');
}

export function formatRelative(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}
