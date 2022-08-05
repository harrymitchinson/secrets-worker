import React, { PropsWithChildren } from "react";
import toast from "react-hot-toast";

export interface Props {
  id: string
  visible: boolean
}

export default function Toast({id, visible, children}: PropsWithChildren<Props>) {
  return (
    <>
    <span className="animate-enter animate-leave hidden"></span>
    <div
      className={`${visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-lg rounded pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">
              {children}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200 dark:border-gray-600">
        <button
          onClick={() => toast.dismiss(id)}
          className="transition w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-500 font-bold focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
    </>
  )
}