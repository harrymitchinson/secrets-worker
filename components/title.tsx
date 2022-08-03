import React, { PropsWithChildren } from "react";
import Head from "flareact/head";

export interface Props {
  title: string
}

export default function Title({ title, children }: PropsWithChildren<Props>) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1 className="mb-6 text-2xl text-teal-500 dark:text-teal-400 font-bold text-center">{children}</h1>
    </>
  )
}