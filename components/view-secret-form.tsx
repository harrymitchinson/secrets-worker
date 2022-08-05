import { useForm } from "react-hook-form";
import React, { useEffect } from 'react';
import TextError from "./text-error";
import Button from "./button";

export interface Props {
  id: string
  onSubmit: (data: Values) => Promise<void>
  disabled: boolean
  error: Error
}

export interface Values {
  id: string
  password: string
}

export default function ViewSecretForm({ id, onSubmit, disabled, error }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (error != null) {
      setError("password", { type: "custom", "message": error.message })
    }
  }, [error])

  return (<>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-s"
    >
      <input {...register("id")} hidden={true} value={id} />
      <div className="mb-4">
        <label
          className="block font-bold"
          htmlFor="password"
        >
          Password
        </label>
        <div className="block text-sm italic text-gray-500 dark:text-gray-400">
          A password is required to view this secret
        </div>
        <input
          type="text"
          className="block appearance-none rounded w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 mt-2 px-4 py-2 pr-8 shadow focus:outline focus:outline-teal-500 focus:outline-2 focus:outline-offset-2"
          {...register("password", {
            required: "This is required",
            min: 1,
          })}
        />
        {errors.password && (<TextError>{errors.password.message}</TextError>)}
      </div>
      <Button disabled={disabled} title={disabled ? "Loading..." : "View secret"}>
        {disabled ? "Loading..." : "View secret"}</Button>
    </form>
  </>);

}
