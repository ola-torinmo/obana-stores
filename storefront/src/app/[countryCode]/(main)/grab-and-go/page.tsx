import { Metadata } from "next"
import ComingSoonGate from "@modules/common/components/coming-soon-gate"
import GrabAndGoTemplate from "@modules/grab-and-go/templates"

export const metadata: Metadata = {
  title: "Grab & Go | Obana",
  description:
    "Shop ready-made packages designed to make choosing easier and getting more for your money simpler.",
}

export default function GrabAndGoPage() {
  return (
    <ComingSoonGate message="We're putting the finishing touches on our Grab & Go boxes. Check back soon — good things take time!">
      <GrabAndGoTemplate />
    </ComingSoonGate>
  )
}
