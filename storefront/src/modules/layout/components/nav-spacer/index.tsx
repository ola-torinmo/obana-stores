"use client"

import { useParams, usePathname } from "next/navigation"

/**
 * The nav is position:fixed, so it takes up no space in the page flow.
 * This spacer reserves its height plus a consistent gap so page content
 * always starts below it:
 *   mobile:  top-4 (16px)  + h-16 (64px) + 40px gap = 120px
 *   desktop: top-10 (40px) + h-20 (80px) + 72px gap = 192px
 * Keep these numbers in sync with modules/layout/templates/nav.
 *
 * The home page is excluded: its hero is intentionally full-bleed behind
 * the floating nav.
 */
export default function NavSpacer() {
  const pathname = usePathname()
  const { countryCode } = useParams()

  const isHome =
    pathname === `/${countryCode}` || pathname === `/${countryCode}/`

  if (isHome) return null

  return <div aria-hidden="true" className="h-[120px] small:h-[192px] flex-shrink-0" />
}
