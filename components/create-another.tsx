import Link from "flareact/link";
import React from "react";
import { useRouter } from "flareact/router";

export default function CreateAnother() {
  const className = "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
  const router = useRouter()
  console.log(router)
  if (router.pathname == "/index") {
    return (
      <>
        <button className={className} onClick={() => router.reload()}>Create a new secret</button>
      </>
    )
  }
  return (
    <>
      <Link href="/">
        <a className={className}>Create a new secret</a>
      </Link>
    </>
  )
}