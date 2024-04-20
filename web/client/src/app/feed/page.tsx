import { Suspense } from "react";

import { FeedTemplate } from "@/features/feeds/components/FeedTemplate";

import { Loader } from "@/components/ui/loader";

export default function FeedPage() {
  return (
    <>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <FeedTemplate />
      </Suspense>
    </>
  );
}
