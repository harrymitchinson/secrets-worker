import React from "react";
import Title from "../components/title";
import { useRouter } from "flareact/router";
import CreateAnotherSecret from "../components/create-another-secret";

export async function getEdgeProps() {

  return {
    props: {},
    notFound: true,
    revalidate: 60
  }
}

export default function NotFound() {
  const router = useRouter()

  const resetHandler = () => {
    router.push("/");
  }
  return (<>
    <Title title="404">404 😔</Title>
    <div className="w-full max-w-s">
      <div className="mb-4">
        The requested page was not found or no longer exists.
      </div>
    </div>
    <CreateAnotherSecret onClick={resetHandler} />
  </>
  )
}