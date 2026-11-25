import ProductFaq, { FaqItem } from "@modules/products/components/product-faq"

// Static preview content — the page is shown blurred behind "Coming Soon".
// Replace with real Medusa products when Grab & Go launches.
const TABS = ["Expecting moms", "New moms", "New dads", "Post-partum", "We care"]

const BOXES = [
  "The Little Starter",
  "Newborn necessities",
  "The daily snuggle",
  "Tiny essentials",
  "Bath time bliss",
  "The welcome bundle",
  "Little milestones",
  "Out & about",
  "Pack a little love",
  "The everyday adventure",
  "Tiny treasures",
  "Sweet dreams",
]

const PLACEHOLDER_COLORS = ["bg-pink-100", "bg-blue-50", "bg-grey-5", "bg-pink-50"]

const GRAB_AND_GO_FAQS: FaqItem[] = [
  {
    question: "What are Grab & Go boxes?",
    answer:
      "Grab & Go boxes are thoughtfully curated bundles of baby essentials, put together to make shopping easier for parents and caregivers. Each box contains a selection of products chosen for a specific need, so you can get the essentials in one convenient purchase.",
  },
  {
    question: "What comes in each box?",
    answer:
      "Each box contains a different selection of baby products. You can view the product list and box details on each product page before making your purchase.",
  },
  {
    question: "Can I customise a Grab & Go box?",
    answer:
      "Our Grab & Go boxes come pre-curated for convenience. If you need specific items or have particular preferences, please contact our team to find out what options are available.",
  },
  {
    question: "How do I choose the right box for my baby?",
    answer:
      "Each box is designed around a particular need, occasion, or stage of babyhood. Check the description and included products to find the box that best suits your baby's needs and your shopping list.",
  },
  {
    question: "Can I buy a Grab & Go box as a gift?",
    answer:
      "Absolutely! Grab & Go boxes make thoughtful gifts for new parents, baby showers, and newborn celebrations. Simply choose a box that suits the occasion and place your order.",
  },
]

export default function GrabAndGoTemplate() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 small:px-14 pb-16 small:pb-24">
      <header className="text-center">
        <h1 className="font-heading font-bold text-[28px] small:text-[40px] leading-tight text-[#101010]">
          Everything you need, already bundled
        </h1>
        <p className="mt-3 text-sm small:text-base text-[#636363] max-w-2xl mx-auto">
          Shop ready-made packages designed to make choosing easier and getting
          more for your money simpler.
        </p>
      </header>

      {/* Category tabs */}
      <div className="mt-10 small:mt-16 flex justify-center">
        <div className="flex max-w-full overflow-x-auto no-scrollbar bg-white/60 rounded-full p-1">
          {TABS.map((tab, i) => (
            <span
              key={tab}
              className={`whitespace-nowrap rounded-full px-4 small:px-5 py-2 text-sm ${
                i === 0 ? "bg-obana-mauve text-white" : "text-[#636363]"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      {/* Box grid */}
      <ul className="mt-12 small:mt-[100px] grid grid-cols-2 small:grid-cols-4 gap-x-4 small:gap-x-10 gap-y-10 small:gap-y-14">
        {BOXES.map((name, i) => (
          <li key={name} className="flex flex-col">
            <div
              className={`aspect-square w-full rounded-[20px] ${
                PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length]
              }`}
            />
            <h2 className="mt-5 px-2 font-heading font-bold text-base small:text-lg text-[#101010]">
              {name}
            </h2>
            <p className="mt-1 px-2 text-base text-[#636363]">£20.00</p>
          </li>
        ))}
      </ul>

      <div className="pt-20 small:pt-[140px]">
        <ProductFaq items={GRAB_AND_GO_FAQS} />
      </div>
    </div>
  )
}
