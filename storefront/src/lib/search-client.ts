import { instantMeiliSearch } from "@meilisearch/instant-meilisearch"

const endpoint = process.env.NEXT_PUBLIC_SEARCH_ENDPOINT
const apiKey = process.env.NEXT_PUBLIC_SEARCH_API_KEY

const SEARCH_ENABLED = !!(endpoint && apiKey)

export const searchClient = SEARCH_ENABLED
  ? instantMeiliSearch(endpoint!, apiKey!)
  : null

export const SEARCH_INDEX_NAME =
  process.env.NEXT_PUBLIC_INDEX_NAME || "products"