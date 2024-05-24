import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  console.log("🌪️ middleware request", request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const user = await supabase.auth.getUser();

  console.log("🌪️ middleware user", user);

  const res = await supabase.from("profiles").select();
  console.log("🌪️ data all: ", res);

  const { data } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.data.user?.id)
    .eq("is_super_admin", "true")
    .single();
  console.log("🌪️ data", data);
  if (!data) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}
