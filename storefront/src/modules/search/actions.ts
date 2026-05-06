"use server"

import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client"

interface Hits {
  readonly objectID?: string
  id?: string
  [x: string | number | symbol]: unknown
}

/**
 * Uses MeiliSearch or Algolia to search for a query
 * @param {string} query - search query
 */
export async function search(query: string): Promise<Hits[]> {
  if (!searchClient) {
    return []
  }

  const queries = [{ params: { query }, indexName: SEARCH_INDEX_NAME }]
  const response = await searchClient.search(queries)
  const results = response.results as Array<{ hits: Hits[] }>
  const { hits } = results[0]

  return hits
}