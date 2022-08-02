import { useForm } from "react-hook-form";
import React, { useEffect } from 'react';
import TextError from "./text-error";
import Button from "./button";

export interface Props {
  id: string
  onSubmit: (data: Values, event: React.BaseSyntheticEvent) => Promise<void>
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
          className="block text-zinc-600 font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="text"
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          {...register("password", {
            required: "This is required",
            min: 1,
          })}
        />
        {errors.password && (<TextError>{errors.password.message}</TextError>)}
      </div>
      <Button colour="bg-teal-600" hover="hover:bg-teal-700" disabled={disabled}>{disabled ? "Loading..." : "View secret"}</Button>
    </form>
  </>);

}
