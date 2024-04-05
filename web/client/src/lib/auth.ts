// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// import prisma from "./prisma";

// export const authOptions: NextAuthOptions = {
//   secret: process.env.NEXTAUTH_SECRET,
//   // @ts-ignore
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_SECRET_ID as string,
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       // console.log("signIn");
//       // console.log("user🔥🔥🔥🔥🔥🔥🔥", user);
//       // console.log("account🔥🔥🔥🔥🔥🔥🔥", account);
//       // console.log("profile🔥🔥🔥🔥🔥🔥🔥", profile);
//       // console.log("email", email);
//       // console.log("credentials", credentials);
//       // here is db access
//       return true;
//     },
//   },
//   events: {
//     async signOut(message) {
//       console.log("signOut", message);
//     },
//   },
// };
