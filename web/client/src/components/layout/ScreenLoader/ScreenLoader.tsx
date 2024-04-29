import { Loader } from "@/components/ui/loader";

export const ScreenLoader = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  );
};
