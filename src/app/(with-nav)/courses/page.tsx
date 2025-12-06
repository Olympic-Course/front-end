// src/app/(with-nav)/courses/page.tsx
import { Suspense } from "react";
import CoursesClient from "./CoursesClient";

export default function Page() {
  return (
    <Suspense>
      <CoursesClient />
    </Suspense>
  );
}
