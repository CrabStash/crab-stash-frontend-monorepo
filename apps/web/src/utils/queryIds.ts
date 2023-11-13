export function formatIdToQuery(id: string) {
  return encodeURIComponent(id);
}

export function formatQueryToId(query: string) {
  return decodeURIComponent(query);
}
