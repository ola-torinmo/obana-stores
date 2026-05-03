import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import FeaturesStrip from "@modules/home/components/features-strip"
import ShopByCategory from "@modules/home/components/shop-by-category"
import BrowseSubscriptions from "@modules/home/components/browse-subscriptions"
import NurseryBanner from "@modules/home/components/nursery-banner"

export const metadata: Metadata = {
  title: "Obana | Your Motherhood Journey Starts Here",
  description:
    "No judgment, no perfection, just honest support for the incredible journey you're on. Find premium baby, pregnancy, and postpartum products.",
}

export default async function Home({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  return (
    <>
      {/* Hero + FeaturesStrip together fill exactly one screen height on mobile */}
      <div className="flex flex-col h-[100dvh] small:h-auto">
        <Hero />
        <FeaturesStrip />
      </div>
      <ShopByCategory countryCode={countryCode} />
      <BrowseSubscriptions />
      <NurseryBanner />
    </>
  )
}
