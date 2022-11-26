import NextAuth from "next-auth"
import StravaProvider from "next-auth/providers/strava";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from '@database';

export default NextAuth({
  secret: process.env.COOKIE_SECRET,

  adapter: PrismaAdapter(prisma),

  debug: process.env.NODE_ENV === 'production' ? false : true,

  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_CLIENT_ID,
      clientSecret: process.env.STRAVA_SECRET,
      authorization: {
        params: {
          scope: 'read,activity:read',
        }
      },
      token: {
        async request({ client, params, checks, provider }) {
          const { token_type, expires_at, refresh_token, access_token } = await client.oauthCallback(provider.callbackUrl, params, checks)
          return {
            tokens: { token_type, expires_at, refresh_token, access_token },
          }
        },
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/fitness.activity.read',
            'https://www.googleapis.com/auth/fitness.body.read',
          ].join(' '),
        }
      }
    }),
  ],
  // pages: {
    // signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // }
})