import React, { PropsWithChildren } from "react";

export interface Props {
  type?: "submit" | "button"
  onClick?: () => void
  colour?: string
  hover?: string
  text?: string
  disabled?: boolean
}
export default function Button({
  children,
  onClick,
  type = "submit",
  text="text-teal-100 dark:text-teal-900",
  colour="bg-teal-500 dark:bg-teal-400",
  hover="hover:bg-teal-600 dark:hover:bg-teal-500",
  disabled = false
}: PropsWithChildren<Props>) {
  if (disabled) {
    hover = ""
  }
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full ${colour} ${hover} ${text} rounded font-bold py-2 px-4 focus:outline-none focus:shadow-outline disabled:opacity-50`}>
      {children}</button>
  )
}