import { useCallback, FormEvent } from "react";

export const useHookForm = () => {
  const stopPropagate = useCallback(
    (callback: (event: FormEvent<HTMLFormElement>) => void) => {
      return (e: FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        callback(e);
      };
    },
    []
  );

  return { stopPropagate };
};
