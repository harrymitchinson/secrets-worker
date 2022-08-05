import React from "react"
import Button from "./button"
import { copyToClipboard } from "./clipboard"

export interface Props {
  secret: string
}

export default function ViewSecretResult({ secret }: Props) {
  return (
    <div className="w-full max-w-s">
      <div className="mb-4">
        <textarea
          className="font-mono block appearance-none rounded w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 mb-2 px-4 py-2 pr-8 shadow focus:outline focus:outline-teal-500 focus:outline-2 focus:outline-offset-2"
          value={secret}
          rows={7}
          readOnly={true}
        />
      </div>
      <Button title="Copy secret to clipboard" onClick={copyToClipboard("secret", secret)}>Copy secret to clipboard</Button>
      <div className="my-4">Once you leave this page, you will not be able to see the secret again.</div>
    </div>
  )
}

