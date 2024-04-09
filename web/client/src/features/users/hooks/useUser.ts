import { createBrowserSideClient } from "@/lib/supabase/client/browserClient";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const fetchUser = async () => {
    const supabase = await createBrowserSideClient();
    const { data, error } = await supabase.auth.getUser();

    setUser(data?.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user };
};
