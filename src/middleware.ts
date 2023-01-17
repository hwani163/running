import { IncomingMessage } from "http";
import { withAuth } from "next-auth/middleware";
import { getSession } from "next-auth/react";
import { NextRequest } from "next/server";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth(
  function middleware(req) {
    // console.log('middleWare');
    // console.log(req.cookies.getAll());
  },
  {
    callbacks: {
      async authorized({ req }) {
        const session = await getSession({
          //@ts-ignore
          req: {
            headers: {
              cookie: req.headers.get("cookie") || "",
            },
          } as IncomingMessage,
        });
        if (session) return true;
        return false;
      },
    },
  }
);

// export const config = { matcher: ["/", "/me"] };
