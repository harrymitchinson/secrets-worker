import React from "react"
import { copyToClipboard } from "./clipboard";

export interface Props {
  url: string
  password: string
}


export default function CreateSecretResult({ url, password }: Props) {
  const fields = [{
    title: "Sharing link",
    short: "link",
    description: "Share this link with the person you wish to view the sercret",
    value: url,
  }, {
    title: "Password",
    short: "password",
    description: "This password is required to view the secret",
    value: password,
  }]

  return (
    <div className="w-full max-w-s">
      {fields.map(({ title, short, description, value }) => (<div className="mb-4">
        <label className="block font-bold">{title}</label>
        <div className="block text-sm italic text-gray-500 dark:text-gray-400">
          {description}
        </div>

        <div className="inline-block relative w-full mt-2">
          <input
            className="transition block appearance-none w-full rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 px-4 py-2 pr-8 shadow focus:outline focus:outline-teal-500 focus:outline-2 focus:outline-offset-2"
            type="text"
            value={value}
            readOnly={true}
            title={title}
          />
          <button
            type="button"
            className="transition absolute inset-y-0 right-0 rounded-r flex items-center px-2 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 focus:outline focus:outline-teal-500 focus:outline-2 focus:outline-offset-2"
            onClick={copyToClipboard(short, value)}
            title={`Copy ${short} to clipboard`}
          >
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"></path>
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"></path>
            </svg>
          </button>
        </div>
      </div>
      ))}
      <div className="mb-4">Once you leave this page, you will not be able to see the password again.</div>
    </div>
  )
}

