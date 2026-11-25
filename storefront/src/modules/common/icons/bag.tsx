import React from "react"

import { IconProps } from "types/icon"

/** Outline shopping bag icon (handle + band), used for the cart. */
const Bag: React.FC<IconProps> = ({
  size = "24",
  color = "currentColor",
  ...attributes
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...attributes}
  >
    <path
      d="M8.5 7.5V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6.5 7.5h11a2 2 0 0 1 2 2V19a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M4.5 16.5h15" stroke={color} strokeWidth="1.5" />
  </svg>
)

export default Bag
