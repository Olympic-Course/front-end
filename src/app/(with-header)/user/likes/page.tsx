import { Suspense } from "react";
import LikesClients from "./LikesClients";


export default function Page() {
  return (
    <Suspense>
      <LikesClients />
    </Suspense>
  );
}