import React from "react";
import { PropsWithChildren } from "react";

export default function TextError({ children }: PropsWithChildren) {
  return (
    <div className="text-red-700 text-xs pt-2 font-medium">
      {children}
    </div>
  )
}