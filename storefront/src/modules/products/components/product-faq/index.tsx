"use client"

import { ChevronDown } from "@medusajs/icons"
import { useId, useState } from "react"

// Placeholder answers — edit these freely.
const FAQS = [
  {
    question: "What are Grab & Go boxes?",
    answer: "Placeholder answer — replace with the real copy.",
  },
  {
    question: "Are the products safe for newborns?",
    answer: "Placeholder answer — replace with the real copy.",
  },
  {
    question: "How should I care for the items in the box?",
    answer: "Placeholder answer — replace with the real copy.",
  },
  {
    question: "How long does delivery take?",
    answer: "Placeholder answer — replace with the real copy.",
  },
  {
    question: "How can I contact customer support?",
    answer: "Placeholder answer — replace with the real copy.",
  },
]

export default function ProductFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const baseId = useId()

  return (
    <section
      aria-labelledby={`${baseId}-heading`}
      className="max-w-[883px] mx-auto w-full"
      data-testid="product-faq"
    >
      <h2
        id={`${baseId}-heading`}
        className="font-heading font-bold text-[28px] small:text-[36px] text-center text-[#101010] mb-8 small:mb-12"
      >
        Frequently Asked Questions
      </h2>

      <ul>
        {FAQS.map(({ question, answer }, i) => {
          const isOpen = openIndex === i
          const buttonId = `${baseId}-q-${i}`
          const panelId = `${baseId}-a-${i}`

          return (
            <li key={question} className="border-b border-grey-20">
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-x-4 py-6 text-left text-lg small:text-xl text-[#101010] hover:text-obana-pink transition-colors"
                >
                  <span>{question}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`w-5 h-5 flex-shrink-0 text-[#636363] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="pb-6 pr-9 text-base text-[#636363]"
              >
                {answer}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
