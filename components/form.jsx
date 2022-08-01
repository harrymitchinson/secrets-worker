import { useRouter } from "flareact/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

const oneMinute = 60;
const ttls = [
  {
    name: "5 minutes",
    value: oneMinute * 5,
  },
  {
    name: "30 minutes",
    value: oneMinute * 30,
  },
  {
    name: "1 hour",
    value: oneMinute * 60,
  },
  {
    name: "4 hours",
    value: oneMinute * 60 * 4,
  },
  {
    name: "12 hours",
    value: oneMinute * 60 * 12,
  },
  {
    name: "1 day",
    value: oneMinute * 60 * 24,
  },
  {
    name: "3 days",
    value: oneMinute * 60 * 24 * 3,
  },
  {
    name: "7 days",
    value: oneMinute * 60 * 24 * 7,
  },
];

const encryptHandler = async ({ secret, ttl }) => {
  const sleep = (delay) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(), delay);
    });

  sleep(10000);
  const res = await fetch("/api/encrypt", {
    body: JSON.stringify({
      secret,
      ttl,
    }),
    method: "POST",
  });
  return res.json();
};

export default function Form() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, data, isSuccess, isLoading } = useMutation(encryptHandler, {
    onSuccess: () => {
      router.push("/secret/[id]", `/secret/${data.id}`);
    },
  });
  console.log(data);

  const onSubmit = async (form) => {
    await mutate(form);
  };
  console.log(errors);

  return (
    <div className="w-full max-w-s">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="secret"
          >
            Secret content
          </label>
          <textarea
            {...{
              ...register("secret", { required: true, min: 1 }),
              rows: 7,
              className:
                "block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline",
            }}
          />
          {errors.secret?.type === "required" && (
            <p className="text-red-700 text-xs pt-2 font-medium">
              Please enter a secret
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="ttl"
          >
            Time to live
          </label>
          <div className="inline-block relative w-64">
            <select
              {...{
                ...register("ttl", { required: true }),
                className:
                  "block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline",
                rows: 7,
              }}
            >
              {ttls.map(({ name, value }) => (
                <option key={value} value={value}>
                  {name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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

        <div className="flex items-center justify-between">
          <button
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            type="submit"
          >
            Create secret link
          </button>
        </div>
      </form>
    </div>
  );
}
