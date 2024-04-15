import { useCallback } from "react";

import { useToast } from "@/components/ui/use-toast";

export const useStatusToast = () => {
  const { toast } = useToast();

  const successToast = useCallback(
    ({ title, description }: { title: string; description?: string }) => {
      toast({
        title,
        description,
        className: "bg-green-700 text-white font-bold",
      });
    },
    [toast]
  );

  const failToast = useCallback(
    ({ title, description }: { title: string; description?: string }) => {
      toast({
        variant: "destructive",
        title,
        description,
        className: "font-bold",
      });
    },
    [toast]
  );

  return { successToast, failToast };
};
