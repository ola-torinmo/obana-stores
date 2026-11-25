"use client"

import { useEffect, useRef, useState } from "react"
import ComingSoonModal from "@modules/common/components/coming-soon-modal"

type ComingSoonGateProps = {
  children: React.ReactNode
  message?: string
}

/**
 * Renders a page preview blurred and non-interactive, and opens the
 * "Coming Soon" dialog on arrival. Clicking the blurred page re-opens it.
 * To launch the page, just remove this wrapper.
 */
export default function ComingSoonGate({ children, message }: ComingSoonGateProps) {
  const [open, setOpen] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  // `inert` keeps links/buttons in the preview out of tab order and
  // away from screen readers (attribute set directly for typing compat).
  useEffect(() => {
    contentRef.current?.setAttribute("inert", "")
  }, [])

  return (
    <>
      <div
        className="relative cursor-pointer"
        onClick={() => setOpen(true)}
        data-testid="coming-soon-gate"
      >
        <div
          ref={contentRef}
          aria-hidden="true"
          className="blur-[6px] pointer-events-none select-none"
        >
          {children}
        </div>
      </div>

      {open && <ComingSoonModal message={message} onClose={() => setOpen(false)} />}
    </>
  )
}
