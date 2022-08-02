import React from "react";
import Button from "./button";

export interface Props {
  onClick: () => void
}

export default function CreateAnotherSecret({ onClick }: Props) {
  return (
    <div className="w-full max-w-s">
      <div className="my-4 h-px bg-gray-300"></div>
      <Button colour="bg-orange-600" hover="hover:bg-orange-700" onClick={onClick}>Create a new secret</Button>
    </div>
  )
}