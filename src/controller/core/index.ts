// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { ZodError, ZodObject } from "zod";
import { HttpError } from "./error";
import { omit } from "lodash";
import { unstable_getServerSession } from "next-auth/next";
import { nextAuthOptions } from "../../pages/api/auth/[...nextauth]"
import { Session } from "next-auth/core/types";
import { prisma } from "@database";
import { Account, User } from "@prisma/client";
export interface GetReq<T> extends Omit<NextApiRequest, "query"> {
  query: Partial<T>;
}
export interface PostReq<T> extends Omit<NextApiRequest, "body"> {
  body: Partial<T>;
}
type DefaultResponseData<T> = {
  success: boolean;
  message: string;
  data: T;
};
export type Res<T> = NextApiResponse<DefaultResponseData<T>>;

type ObjectType = { [key: string]: any };

export type UserInfo = Account & User

export abstract class ApiRoute {
  _get?: (req: GetReq<ObjectType>, res: Res<ObjectType>, session: UserInfo) => void;
  _post?: (req: PostReq<ObjectType>, res: Res<ObjectType>, session: UserInfo) => void;
  _delete?: (req: PostReq<ObjectType>, res: Res<ObjectType>, session: UserInfo) => void;
  _patch?: (req: PostReq<ObjectType>, res: Res<ObjectType>, session: UserInfo) => void;

  success = (res: Res<ObjectType>, data: any) => {
    res
      .status(200)
      .json({
        success: true, data: data,
        message: "good"
      });
  }

  createHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, nextAuthOptions)
    if (!req.url?.startsWith('/api/public') && session === null) {
      // 세션이 존재하지 않고 pubcli이 아닐때 401 에러
      throw new HttpError(401);
    }
    const account = await prisma.account.findFirst({
      // @ts-ignore
      where: { userId: Number(session?.id) },
    });

    const userInfo = { ...account, ...session?.user } as UserInfo

    if (req.method === "GET") {
      if (typeof this._get === "function") {
        return this._get(req, res, userInfo);
      }
      throw new HttpError(405);
    }

    if (req.method === "POST") {
      if (typeof this._post === "function") {
        return this._post(req, res, userInfo);
      }
      throw new HttpError(405);
    }

    if (req.method === "DELETE") {
      if (typeof this._delete === "function") {
        return this._delete(req, res, userInfo);
      }
      throw new HttpError(405);
    }

    if (req.method === "PATCH") {
      if (typeof this._patch === "function") {
        return this._patch(req, res, userInfo);
      }
      throw new HttpError(405);
    }
    throw new HttpError(405);
  };
}

function platErrorMessage(error: ZodError) {
  const formatedError = omit(error.format(), ["_errors"]);
  // console.log(formatedError);
  // for (const [key, value] of Object.entries(formatedError)) {
  //   console.log(`${key}: ${value}`);
  // }
  Object.entries(formatedError).map(([key, value]) => {
    //@ts-ignore
    console.log(key, value["_errors"]);
  });

  if (Array.isArray(Object.keys(formatedError))) {
    // const firstKey = Object.keys(formatedError)[0];
    // if (Array.isArray(formatedError[firstKey]._errors)) {
    //   formatedError[firstKey]._errors.some((message) => {
    //     alert(message);
    //     return true;
    //   });
    // }
  }
}

export const validator = (zodObject: ZodObject<{}>, params: {}) => {
  const result = zodObject.safeParse(params);
  if (result.success) {
    return { success: true, message: "success" };
  } else {
    return { success: false, message: platErrorMessage(result.error) };
  }
};
