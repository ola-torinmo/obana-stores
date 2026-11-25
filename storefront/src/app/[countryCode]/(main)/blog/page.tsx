import { Metadata } from "next"
import ComingSoonGate from "@modules/common/components/coming-soon-gate"
import BlogTemplate from "@modules/blog/templates"

export const metadata: Metadata = {
  title: "Blog | Obana",
  description: "Little moments, helpful advice.",
}

export default function BlogPage() {
  return (
    <ComingSoonGate message="We're putting the finishing touches on our blog. Check back soon — good things take time!">
      <BlogTemplate />
    </ComingSoonGate>
  )
}
