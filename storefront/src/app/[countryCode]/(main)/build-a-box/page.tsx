import { Metadata } from "next"
import { HttpTypes } from "@medusajs/types"
import { getProductsList, getProductByHandle } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import BuildABoxTemplate from "@modules/build-a-box/templates"

export const metadata: Metadata = {
  title: "Build a Box | Obana",
  description:
    "Curate your custom packages, sit back, relax, and we deliver to you.",
}

export default async function BuildABoxPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const region = await getRegion(countryCode)

  if (!region) return null

  const [{ response: { products } }, allCategories] = await Promise.all([
    getProductsList({
      pageParam: 1,
      queryParams: {
        limit: 100,
        fields:
          "*variants.calculated_price,+variants.inventory_quantity,+categories",
      },
      countryCode,
    }),
    listCategories(),
  ])

  const categories = (allCategories ?? []).filter(
    (c) => !(c as any).parent_category_id
  )

  // Fetch box wrap products by their handles box1–box4
  const wrapHandles = ["box1", "box2", "box3", "box4"]
  const wrapResults = await Promise.allSettled(
    wrapHandles.map((handle) => getProductByHandle(handle, region.id))
  )
  const wrapProducts = wrapResults
    .filter(
      (r): r is PromiseFulfilledResult<HttpTypes.StoreProduct> =>
        r.status === "fulfilled" && r.value != null
    )
    .map((r) => r.value)

  return (
    <BuildABoxTemplate
      products={products}
      wrapProducts={wrapProducts}
      categories={categories}
      countryCode={countryCode}
      currencyCode={region.currency_code ?? "gbp"}
    />
  )
}
