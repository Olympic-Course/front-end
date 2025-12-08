import { Suspense } from "react";
import PostsClient from "../PostsClient";

export default function Page() {
  return (
    <Suspense>
      <PostsClient />
    </Suspense>
  );
}