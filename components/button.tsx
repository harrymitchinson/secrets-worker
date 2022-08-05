import React, { PropsWithChildren } from "react";

export interface Props {
  type?: "submit" | "button"
  onClick?: () => void
  colour?: string
  hover?: string
  text?: string
  disabled?: boolean
  title: string
  outline?: string
}
export default function Button({
  children,
  onClick,
  type = "submit",
  text="text-teal-100 dark:text-teal-900",
  colour="bg-teal-500 dark:bg-teal-400",
  hover="hover:bg-teal-600 dark:hover:bg-teal-500",
  outline="focus:outline focus:outline-teal-500 focus:outline-2 focus:outline-offset-2",
  disabled = false,
  title
}: PropsWithChildren<Props>) {
  if (disabled) {
    hover = ""
  }
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      title={title}
      className={`transition w-full ${colour} ${hover} ${text} rounded font-bold py-2 px-4 ${outline} disabled:opacity-50`}>
      {children}</button>
  )
}