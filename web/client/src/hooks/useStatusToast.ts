import { useCallback } from "react";

import { useToast } from "@/components/ui/use-toast";

export const useStatusToast = () => {
  const { toast } = useToast();

  const successToast = useCallback(
    ({ description }: { description: string }) => {
      toast({
        title: "SUCCESS",
        description,
        className: "bg-green-700 text-white font-bold",
      });
    },
    [toast]
  );

  const warnToast = useCallback(
    ({ description }: { description: string }) => {
      toast({
        title: "WARNING",
        description,
        className: "bg-amber-500 text-black font-bold",
      });
    },
    [toast]
  );

  const failToast = useCallback(
    ({ description }: { description: string }) => {
      toast({
        variant: "destructive",
        title: "FAIL",
        description,
        className: "font-bold",
      });
    },
    [toast]
  );

  return { successToast, warnToast, failToast };
};
