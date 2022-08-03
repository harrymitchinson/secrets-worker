import React from "react"

export interface Props {
  secret: string
}

export default function ViewSecretResult({ secret }: Props) {
  return (
    <div className="w-full max-w-s">
      <div className="mb-4">
        <textarea
          className="block appearance-none w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 mb-2 px-4 py-2 pr-8 shadow leading-tight focus:outline-none focus:shadow-outline"
          value={secret}
          rows={7}
          readOnly={true}
        />
        <div>Once you leave this page, you will not be able to see the secret again.</div>
      </div>
    </div>
  )
}

