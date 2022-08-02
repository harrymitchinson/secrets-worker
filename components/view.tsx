import { useForm } from "react-hook-form";
import React from 'react';

export interface Props {
  id: string
  onSubmit: (data: Values) => Promise<void>
  disabled: boolean
}

export interface Values {
  id: string
  password: string
}

export default function Create({ id, onSubmit, disabled }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-s"
      >
        <input {...register("id")} hidden={true} value={id} />
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="text"
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            {...register("password", { required: true, min: 1 })}
          />
          {errors.password?.type === "required" && (
            <p className="text-red-700 text-xs pt-2 font-medium">
              Please enter a password
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            disabled={disabled}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            type="submit"
          >
            View secret
          </button>
        </div>
      </form>
    </div>
  );

}
