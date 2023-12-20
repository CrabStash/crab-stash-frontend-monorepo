import type { Currency } from "types/currency";

export function formatPrice(price: number | undefined, currency: Currency = "USD") {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price || 0);
}
