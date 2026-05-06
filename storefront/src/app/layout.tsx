import { getBaseURL } from "@lib/util/env"
import { Metadata, Viewport } from "next"
import { Abhaya_Libre } from "next/font/google"
import "styles/globals.css"

const abhayaEB = Abhaya_Libre({
  weight: "800",
  subsets: ["latin"],
  variable: "--font-abhaya-eb",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={`overflow-x-hidden ${abhayaEB.variable}`}>
      <body className="font-sans overflow-x-hidden">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}