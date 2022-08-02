import React from "react";
import { PropsWithChildren } from "react";
import Head from "flareact/head";

export interface Props {
  title: string
}

export default function Title({ title, children }: PropsWithChildren<Props>) {
  return (
    <>
      <Head>{title}</Head>
      <h1 className="mb-6 text-2xl text-zinc-600 font-bold text-center">{children}</h1>
    </>
  )
}