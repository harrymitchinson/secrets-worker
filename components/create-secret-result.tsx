import React from "react"
import CreateAnother from "./create-another-secret"

export interface Props {
  url: string
  password: string
}

const localhost = 'localhost:8080'

export default function CreateSecretResult({ url, password }: Props) {
  return (
    <div className="w-full max-w-s">
      <div className="mb-4">
        <label className="block text-zinc-600 font-bold mb-2">Sharing link</label>
        <input
          className="block appearance-none w-full bg-white border border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={url}
          readOnly={true}
        />
      </div>
      <div className="mb-4">
        <label className="block text-zinc-600 font-bold mb-2">Password</label>
        <input
          className="block appearance-none w-full bg-white border border-gray-400 mb-2 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={password}
          readOnly={true}
        />
        <div>Once you leave this page, you will not be able to see the password again.</div>
      </div>
    </div>
  )
}

