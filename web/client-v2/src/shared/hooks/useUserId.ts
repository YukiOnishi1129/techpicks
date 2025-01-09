import { useCallback, useEffect, useMemo, useState } from "react";

import { getUser } from "@/features/auth/actions/user";

export const useUserId = () => {
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const userId = useMemo(() => {
    if (!loading && currentUserId) return currentUserId;
    return undefined;
  }, [currentUserId, loading]);

  const fetchUserId = useCallback(async () => {
    setLoading(true);
    // fetch user id
    const user = await getUser();
    setCurrentUserId(user?.id || undefined);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUserId();
  }, [fetchUserId]);

  return { userId, loading };
};
