"use client"

import { CheckCircle } from "@medusajs/icons"
import { useId, useState } from "react"

export const GIFT_MESSAGE_MAX = 250

/**
 * Gift message card. Local state only for now — not persisted to the
 * cart/backend yet (to be wired up separately).
 */
export default function GiftMessage() {
  const [message, setMessage] = useState("")
  const [savedMessage, setSavedMessage] = useState<string | null>(null)
  const id = useId()
  const textareaId = `${id}-textarea`
  const headingId = `${id}-heading`
  const counterId = `${id}-counter`

  const isSaved = savedMessage !== null && savedMessage === message
  const canSave = message.trim().length > 0 && !isSaved

  return (
    <section
      aria-labelledby={headingId}
      className="bg-white/60 rounded-[20px] p-5 flex flex-col"
    >
      <div className="flex items-center justify-between gap-x-4">
        <div className="flex flex-col gap-y-1">
          <h2
            id={headingId}
            className="font-heading font-bold text-lg text-[#101010]"
          >
            Add a message
          </h2>
          <p className="text-sm text-[#636363]">
            Make your gift special by adding a personal message.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSavedMessage(message)}
          disabled={!canSave}
          className={`flex items-center gap-x-1.5 text-base text-obana-pink whitespace-nowrap transition-opacity disabled:cursor-default ${
            isSaved ? "" : canSave ? "hover:opacity-80" : "opacity-60"
          }`}
          aria-live="polite"
          data-testid="save-gift-message"
        >
          <CheckCircle className="w-[18px] h-[18px]" aria-hidden="true" />
          {isSaved ? "Message saved" : "Save message"}
        </button>
      </div>

      <label htmlFor={textareaId} className="sr-only">
        Personal message
      </label>
      <textarea
        id={textareaId}
        value={message}
        onChange={(e) => setMessage(e.target.value.slice(0, GIFT_MESSAGE_MAX))}
        maxLength={GIFT_MESSAGE_MAX}
        placeholder="Enter a personal message"
        aria-describedby={counterId}
        className="mt-8 w-full h-[150px] resize-none rounded-[10px] border border-grey-20 bg-grey-5 p-4 text-base text-[#101010] placeholder:text-grey-40 focus:outline-none focus:ring-1 focus:ring-obana-pink"
        data-testid="gift-message-input"
      />
      <span
        id={counterId}
        className="mt-4 self-end text-sm text-grey-40 tabular-nums"
      >
        {message.length}/{GIFT_MESSAGE_MAX}
      </span>
    </section>
  )
}
