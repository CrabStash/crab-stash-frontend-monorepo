import type { Currency } from "types/currency";

export function formatPrice(price: number, currency: Currency = "USD") {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}
