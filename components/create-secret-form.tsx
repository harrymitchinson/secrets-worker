import { useForm } from "react-hook-form";
import React from 'react';
import TextError from "./text-error";
import Button from "./button";

export interface TTL {
  name: string
  value: number
  default?: boolean
}

export interface Props {
  ttls: TTL[]
  disabled: boolean
  onSubmit: (data: Values) => Promise<void>
}

export interface Values {
  secret: string
  ttl: number
}

export default function CreateSecretForm({ ttls, onSubmit, disabled }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-s"
      >
        <div className="mb-4">
          <label
            className="block font-bold"
            htmlFor="secret"
          >
            Secret content
          </label>
          <div className="block text-sm italic text-gray-500 dark:text-gray-400">
            The data that you wish to share secretly
          </div>
          <textarea
            rows={7}
            title="Secret content"
            className="font-mono block appearance-none w-full rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 mt-2 px-4 py-2 pr-8 shadow focus:outline focus:outline-teal-500 focus:outline-2 focus:outline-offset-2"
            {...register("secret", { required: "This is required", min: 1 })}
          />
          {errors.secret && (<TextError>{errors.secret.message}</TextError>)}
        </div>

        <div className="mb-6">
          <label
            className="block font-bold"
            htmlFor="ttl"
          >
            Time to live
          </label>
          <div className="block text-sm italic text-gray-500 dark:text-gray-400">
            How long the secret should exist for before deletion if not viewed
          </div>
          <div className="inline-block relative w-full">
            <select
              title="Time to live"
              className="block appearance-none rounded w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 mt-2 px-4 py-2 pr-8 shadow focus:outline focus:outline-teal-500 focus:outline-2 focus:outline-offset-2"
              {...register("ttl", { required: true })}>
              {ttls.map(({ name, value, default: selected }) => (
                <option key={value} value={value} selected={selected}>
                  {name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <Button disabled={disabled} title={disabled ? "Loading..." : "Create secret link"}>
          {disabled ? "Loading..." : "Create secret link"}</Button>
      </form>
    </>
  );

}
