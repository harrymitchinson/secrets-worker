import React from "react";
import Button from "./button";

export interface Props {
  onClick: () => void
}

export default function CreateAnotherSecret({ onClick }: Props) {
  return (
    <div className="w-full max-w-s">
      <div className="mb-8 h-px border border-gray-100 dark:border-gray-600"></div>
      <Button
        onClick={onClick}>Create a new secret</Button>
    </div>
  )
}