export function formatNumber(number?: number) {
  return (number || 0).toLocaleString("en-US");
}
