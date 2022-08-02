import Create, { Props, Values, TTL } from "../components/create";
import React from "react";
import { useMutation } from "react-query";
import CreateResult from "../components/create-result";

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

const encryptHandler = async ({ secret, ttl }: Values) => {
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
}

export async function getEdgeProps({ event }: { event: EventContext<any, any, any> }) {

  return {
    props: {
      url: event.request.url,
    } as IndexProps
  };
}

export default function Index({ url }: IndexProps) {

  const { mutate, data, isLoading, isSuccess } = useMutation(encryptHandler);

  const onSubmitHandler = async (data: Values) => {
    await mutate(data);
  };

  if (isSuccess) {
    return (
      <CreateResult url={`${new URL(url).origin}/v/${data.id}`} password={data.password} />
    )
  }

  return (
    <Create ttls={ttls} onSubmit={onSubmitHandler} disabled={isLoading} />
  )
}
