import React from "react"
import CreateAnother from "./create-another"

export interface Props {
  secret: string
}

export default function ViewResult({ secret }: Props) {
  return (
    <div className="w-full max-w-s">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Sharing link</label>
        <textarea
          className="block appearance-none w-full bg-white border border-gray-400 mb-2 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={secret}
          rows={7}
          readOnly={true}
        />
        <div>Once you leave this page, you will not be able to see the secret again.</div>
      </div>
      <div className="mb-4">
        <CreateAnother />
      </div>
    </div>
  )
}

