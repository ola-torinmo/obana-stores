import React from "react"

import { IconProps } from "types/icon"

/** Outline person-in-circle (account) icon. */
const UserCircle: React.FC<IconProps> = ({
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
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="9.5" r="3" stroke={color} strokeWidth="1.5" />
    <path
      d="M6.2 18.6c1.2-2.2 3.3-3.6 5.8-3.6s4.6 1.4 5.8 3.6"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

export default UserCircle
