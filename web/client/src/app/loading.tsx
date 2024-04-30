import { BeatLoader } from "react-spinners";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <BeatLoader color="#36d7b7" className="inline-block" />
    </div>
  );
}
