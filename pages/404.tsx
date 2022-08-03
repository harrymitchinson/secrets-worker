import React from "react";
import Title from "../components/title";
import {useRouter} from "flareact/router";
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
    router.push("/create");
  }
  return (<>
    <Title title="404">404 😔</Title>
    <div className="w-full max-w-s mb-8">
      The requested page was not found or no longer exists.
    </div>
    <CreateAnotherSecret onClick={resetHandler} />
  </>
  )
}