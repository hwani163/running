import NextAuth from "next-auth"
import StravaProvider from "next-auth/providers/strava";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '@database/index';

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
          scope: [
            'profile:read_all',
            'activity:read_all'
          ].join(',')
        }
      }
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
})