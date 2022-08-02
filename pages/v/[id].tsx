import View, { Props, Values } from "../../components/view";
import React from "react";
import { useMutation } from "react-query";
import ViewResult from "../../components/view-result";

type SecretProps = {
  id: string
}

export async function getEdgeProps({ params }: any) {
  const id = params.id

  const secret = await SECRETS.get(id, "arrayBuffer");

  if (secret == null) {
    return {
      notFound: true
    }
  }

  return {
    props: { id } as SecretProps,
    // Never cache this response
    revalidate: 0
  };
}

const decryptHandler = async ({ id, password }: Values) => {
  const res = await fetch("/api/decrypt", {
    body: JSON.stringify({
      id,
      password,
    }),
    method: "POST",
  });
  return res.json();
};

export default function Secret({ id }) {
  const { mutate, data, isLoading, isSuccess } = useMutation(decryptHandler);

  console.log(data)
  const onSubmitHandler = async (data: Values) => {
    await mutate(data);
  };

  if (isSuccess) {
    return (
      <ViewResult secret={data.secret} />
    )
  }

  return (
    <View id={id} onSubmit={onSubmitHandler} disabled={isLoading} />
  )
}
