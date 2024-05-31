import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { createBrowserSideClient } from "@/lib/supabase/client/browserClient";

export const useUser = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const fetchUser = async () => {
    const supabase = await createBrowserSideClient();
    const { data } = await supabase.auth.getUser();

    setUser(data?.user || undefined);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user };
};
