import React from "react";

export interface Props {
  onClick: () => void
}

export default function CreateAnotherSecret({ onClick }: Props) {
  return (
    <div className="w-full max-w-s">
      <div className="my-4 h-px bg-gray-300"></div>
      <button
        type="button"
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={onClick}>Create a new secret</button>
    </div>
  )
}