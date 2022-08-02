import React, { PropsWithChildren } from "react";


export interface Props {
  type?: "submit" | "button"
  onClick?: () => void
  colour?: string
  hover?: string
  disabled?: boolean
}
export default function Button({
  children,
  onClick,
  type = "submit",
  colour = "bg-teal-600",
  hover = "hover:bg-teal-700",
  disabled = false
}: PropsWithChildren<Props>) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full ${colour} ${hover} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50`}>
      {children}</button>
  )
}