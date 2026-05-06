import { getCategoryByHandle } from "@lib/data/categories"
import { getProductsList } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import ShopByCategoryClient, { CategoryData } from "./client"

const CATEGORY_HANDLES = [
  { handle: "baby", label: "Baby" },
  { handle: "pregnancy", label: "Pregnancy" },
  { handle: "postpartum", label: "Postpartum" },
]

async function fetchCategoryWithProducts(
  handle: string,
  label: string,
  countryCode: string
): Promise<CategoryData> {
  const { product_categories } = await getCategoryByHandle([handle])
  const category = product_categories?.[0]

  if (!category) {
    return { handle, label, products: [] }
  }

  const {
    response: { products },
  } = await getProductsList({
    countryCode,
    queryParams: {
      // @ts-ignore
      category_id: [category.id],
      limit: 4,
      fields: "*variants.calculated_price",
    },
  })

  return {
    handle,
    label,
    products: products.map((product) => {
      const { cheapestPrice } = getProductPrice({ product })

      // Cheapest variant for direct add-to-cart
      const cheapestVariant = (product.variants as any[])
        ?.filter((v) => !!v.calculated_price)
        .sort(
          (a, b) =>
            a.calculated_price.calculated_amount -
            b.calculated_price.calculated_amount
        )[0]

      return {
        id: product.id!,
        handle: product.handle!,
        title: product.title,
        thumbnail: product.thumbnail ?? null,
        price: cheapestPrice?.calculated_price ?? null,
        variantId: cheapestVariant?.id ?? null,
      }
    }),
  }
}

const ShopByCategory = async ({
  countryCode,
  initialCategory,
}: {
  countryCode: string
  initialCategory?: string
}) => {
  const categories = await Promise.all(
    CATEGORY_HANDLES.map(({ handle, label }) =>
      fetchCategoryWithProducts(handle, label, countryCode)
    )
  )

  const populated = categories.filter((c) => c.products.length > 0)

  return (
    <ShopByCategoryClient
      categories={populated.length ? populated : categories}
      countryCode={countryCode}
      initialCategory={initialCategory}
    />
  )
}

export default ShopByCategory
