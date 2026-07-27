// src/lib/utils/format.ts

/**
 * Format currency (USD)
 */
export function formatCurrency(
  amount: number | string | bigint | { toString(): string },
) {
  const value = Number(amount.toString());

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Convert enum values like FULL_TIME -> Full Time
 */
export function formatEnum(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Format bytes into KB / MB / GB
 */
export function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const kb = bytes / 1024;

  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  const mb = kb / 1024;

  if (mb < 1024) {
    return `${mb.toFixed(1)} MB`;
  }

  const gb = mb / 1024;

  return `${gb.toFixed(1)} GB`;
}

/**
 * Format date nicely
 * Example: Jul 24, 2026
 */
export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date));
}
