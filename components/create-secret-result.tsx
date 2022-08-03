import React from "react"

export interface Props {
  url: string
  password: string
}

const localhost = 'localhost:8080'

export default function CreateSecretResult({ url, password }: Props) {
  return (
    <div className="w-full max-w-s">
      <div className="mb-4">
        <label className="block font-bold mb-2">Sharing link</label>
        <input
          className="block appearance-none w-full rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 px-4 py-2 pr-8 shadow leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={url}
          readOnly={true}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">Password</label>
        <input
          className="block appearance-none w-full rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 mb-2 px-4 py-2 pr-8 shadow leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={password}
          readOnly={true}
        />
        <div>Once you leave this page, you will not be able to see the password again.</div>
      </div>
    </div>
  )
}

