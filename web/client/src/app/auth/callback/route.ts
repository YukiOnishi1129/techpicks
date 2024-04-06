import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";
  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    // const res = await supabase.auth.getUser();
    // if (!res) {
    //   return NextResponse.redirect(`${origin}/login`);
    // }

    // prisma.user.upsert({
    //   where: { email: user?.email || "" },
    //   update: {
    //     email: user?.email,
    //     name: user?.user_metadata.full_name,
    //     image: user?.user_metadata.avatar_url,
    //   },
    //   create: {
    //     email: user?.email,
    //     name: user?.user_metadata["full_name"],
    //     image: user?.user_metadata["avatar_url"],
    //   },
    // });
    /**
     * id
     * email
     * email_confirmed_at
     * image: user.app_metadata.avatar_url
     * name: user.app_metadata.full_name
     *
     * email_verified?: email_confirmed_at?
     *
     * account
     * id : UUID
     * user_id
     * provider: app_metadata.provider
     * provider_id: identities[0].provider_id
     *
     */
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
    console.log(error);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
