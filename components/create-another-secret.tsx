import React from "react";
import Button from "./button";

export interface Props {
  onClick: () => void
}

export default function CreateAnotherSecret({ onClick }: Props) {
  return (
    <div className="w-full max-w-s">
      <div className="mb-8 h-px border border-gray-200 dark:border-gray-600"></div>
      <Button
        title="Create a new secret"
        text="text-gray-100 dark:text-gray-100"
        colour="bg-gray-600 dark:bg-gray-600"
        hover="hover:bg-gray-500 dark:hover:bg-gray-500"
        onClick={onClick}>Create a new secret</Button>
    </div>
  )
}