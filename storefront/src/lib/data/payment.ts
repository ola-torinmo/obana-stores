import { sdk } from "@lib/config"
import { cache } from "react"
import { isManual } from "@lib/constants"

// Shipping actions
export const listCartPaymentMethods = cache(async function (regionId: string) {
  return sdk.store.payment
    .listPaymentProviders(
      { region_id: regionId },
      { next: { tags: ["payment_providers"] } }
    )
    // Never offer Medusa's built-in "Manual Payment" (pp_system_default) to
    // customers: it places the order without taking any money.
    .then(({ payment_providers }) =>
      payment_providers.filter((p) => !isManual(p.id))
    )
    .catch(() => {
      return null
    })
})
