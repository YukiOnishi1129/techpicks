"use client";

import { useCallback } from "react";
import { toast } from "sonner";

export const useStatusToast = () => {
  const successToast = useCallback(
    ({ description }: { description: string }) => {
      toast.success("SUCCESS", {
        description,
        className: "bg-green-700 text-white font-bold",
      });
    },
    []
  );

  const warnToast = useCallback(({ description }: { description: string }) => {
    toast.warning("WARNING", {
      description,
      className: "bg-amber-500 text-black font-bold",
    });
  }, []);

  const failToast = useCallback(({ description }: { description: string }) => {
    toast.error("FAIL", {
      description,
    });
  }, []);

  return { successToast, warnToast, failToast };
};
