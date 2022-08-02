import Create, { Props, Values, TTL } from "../components/create-secret-form";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import CreateResult from "../components/create-secret-result";
import CreateAnother from "../components/create-another-secret";
import Title from "../components/title";

interface EncryptResponse {
  id: string
  password: string
}

const encryptHandler = async ({ secret, ttl }: Values): Promise<EncryptResponse> => {
  const res = await fetch("/api/encrypt", {
    body: JSON.stringify({
      secret,
      ttl,
    }),
    method: "POST",
  });
  return res.json();
};

type IndexProps = {
  url: string
  ttls: TTL[]
}

export async function getEdgeProps({ event: { request: { url } } }: { event: EventContext<any, any, any> }) {
  const oneMinute = 60;
  const ttls: TTL[] = [
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
  return {
    props: {
      url,
      ttls
    } as IndexProps,
    revalidate: 0
  };
}

export default function Index({ url, ttls }: IndexProps) {
  const { mutate, data, isLoading, isSuccess, reset } = useMutation<EncryptResponse, Error, Values, any>(encryptHandler);

  const onSubmitHandler = async (data: Values, event: React.BaseSyntheticEvent) => {
    console.log(data)
    console.log(event)
    event.preventDefault();
    await mutate(data);
  };

  const resetHandler = () => {
    reset()
  }

  if (isSuccess) {
    return (
      <>
        <Title title="Share your secret">Share your secret 🚀</Title>
        <CreateResult url={`${new URL(url).origin}/v/${data.id}`} password={data.password} />
        <CreateAnother onClick={resetHandler} />
      </>
    )
  }

  return (<>
    <Title title="Create a secret">Create a secret 🔐</Title>
    <Create ttls={ttls} onSubmit={onSubmitHandler} disabled={isLoading} />
  </>)
}
