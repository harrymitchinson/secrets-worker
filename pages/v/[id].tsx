import ViewSecret, { Values } from "../../components/view-secret-form";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "flareact/router";
import ViewSecretResult from "../../components/view-secret-result";
import SecretNotFound from "../../components/secret-not-found";
import CreateAnotherSecret from "../../components/create-another-secret";
import Title from "../../components/title";

type SecretProps = {
  id: string
}

type EdgeProps = {
  params: { id: string }
  event: EventContext<any, any, any>
}

interface DecryptResponse {
  secret: string
}

export async function getEdgeProps({ params: { id } }: EdgeProps) {
  const secret = await SECRETS.get(id, "arrayBuffer");
  return {
    props: { id } as SecretProps,
    notFound: secret == null,
    // Never cache this response
    revalidate: 0
  }
}

const decryptHandler = async ({ id, password }: Values): Promise<DecryptResponse> => {
  const res = await fetch("/api/decrypt", {
    body: JSON.stringify({
      id,
      password,
    }),
    method: "POST",
  });

  if (res.status == 200) {
    return res.json();
  }

  if (res.status == 401) {
    throw new Error("Incorrect password")
  }

  throw new Error("An unexpected error occurred")
};

export default function Secret({ id, notFound }) {
  const router = useRouter()
  const { mutate, data, isLoading, isSuccess, error } = useMutation<DecryptResponse, Error, Values, any>(decryptHandler);

  const onSubmitHandler = async (data: Values) => {
    await mutate(data);
  };

  const resetHandler = () => {
    router.push("/");
  }

  if (notFound) {
    return (
      <>
        <Title title="Bad news!">😔</Title>
        <SecretNotFound />
        <CreateAnotherSecret onClick={resetHandler} />
      </>
    )
  }

  if (isSuccess) {
    return (
      <>
        <Title title="View your secret!">Your secret 🤫</Title>
        <ViewSecretResult secret={data.secret} />
        <CreateAnotherSecret onClick={resetHandler} />
      </>
    )
  }

  return (
    <>
      <Title title="You've been sent a secret!">You've been sent a secret 🤗</Title>
      <ViewSecret id={id} onSubmit={onSubmitHandler} disabled={isLoading} error={error} />
    </>)
}
