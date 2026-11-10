// src/subscribers/royal-mail.ts
// Sends every new Medusa order to Royal Mail Click & Drop.
// Needs RM_API_KEY set in Railway (from Click & Drop > Settings > Integrations).

import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

const RM_URL = "https://api.parcel.royalmail.com/api/v1/orders"
const DEFAULT_ITEM_WEIGHT_G = 300 // used if a product has no weight set in admin

export default async function sendOrderToRoyalMail({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  if (!process.env.RM_API_KEY) {
    logger.warn("[royal-mail] RM_API_KEY not set, skipping")
    return
  }

  // 1. Load the order with address + items + weights
  const {
    data: [order],
  } = await query.graph({
    entity: "order",
    fields: [
      "id",
      "display_id",
      "email",
      "created_at",
      "subtotal",
      "shipping_total",
      "total",
      "shipping_address.*",
      "items.title",
      "items.variant_sku",
      "items.quantity",
      "items.unit_price",
      "items.variant.weight",
      "items.variant.product.weight",
    ],
    filters: { id: event.data.id },
  })

  const a = order?.shipping_address
  if (!order || !a) {
    logger.warn(`[royal-mail] order ${event.data.id} has no shipping address, skipping`)
    return
  }

  // 2. Build the parcel contents (shows Obana what to pack, and sets the weight)
  const contents = (order.items ?? []).map((item: any) => {
    const weight =
      Number(item.variant?.weight || item.variant?.product?.weight) || DEFAULT_ITEM_WEIGHT_G
    return {
      name: item.title,
      SKU: item.variant_sku ?? undefined,
      quantity: item.quantity,
      unitValue: Number(item.unit_price),
      unitWeightInGrams: weight,
    }
  })
//   const totalWeight = contents.reduce((sum, c) => sum + c.unitWeightInGrams * c.quantity, 0)
const totalWeight = 1000 // 1kg default until real weights are added

  // 3. Royal Mail payload
  const body = {
    items: [
      {
        orderReference: `OBANA-${order.display_id}`,
        recipient: {
          address: {
            fullName: `${a.first_name ?? ""} ${a.last_name ?? ""}`.trim(),
            companyName: a.company ?? "",
            addressLine1: a.address_1,
            addressLine2: a.address_2 ?? "",
            city: a.city,
            county: a.province ?? "",
            postcode: a.postal_code,
            countryCode: (a.country_code ?? "gb").toUpperCase(),
          },
          phoneNumber: a.phone ?? "",
          emailAddress: order.email ?? "",
        },
        orderDate: new Date(order.created_at as any).toISOString(),
        subtotal: Number(order.subtotal),
        shippingCostCharged: Number(order.shipping_total),
        total: Number(order.total),
        currencyCode: "GBP",
        packages: [
          {
            weightInGrams: totalWeight,
            packageFormatIdentifier: "smallParcel", // check allowed values in the dev docs if you get a 400
            contents,
          },
        ],
        // postageDetails: { serviceCode: "..." }  // only for business (OBA) accounts — leave out otherwise
      },
    ],
  }

  // 4. Send it
  try {
    const res = await fetch(RM_URL, {
      method: "POST",
      headers: {
        Authorization: process.env.RM_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    const json = await res.json().catch(() => ({}))

    if (!res.ok || json?.failedOrders?.length) {
      logger.error(
        `[royal-mail] order ${order.display_id} failed (${res.status}): ${JSON.stringify(json)}`
      )
      return
    }
    logger.info(`[royal-mail] order ${order.display_id} sent to Click & Drop`)
  } catch (e: any) {
    logger.error(`[royal-mail] network error for order ${order.display_id}: ${e.message}`)
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}