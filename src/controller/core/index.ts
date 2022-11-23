// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { HttpError } from "./error";
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

type ObjectType = {};

export type GetHandler<T> = {
  _get?(): void
}

export type PostHandler<T> = {
  _post?(): void
}

export type RequestHandler<T> = never
| GetHandler<T>
| PostHandler<T>
| GetHandler<T> & PostHandler<T>

export abstract class ApiRoute {
  _get?: (req: GetReq<ObjectType>, res: Res<ObjectType>) => void;
  _post?: (req: PostReq<ObjectType>, res: Res<ObjectType>) => void;
  _delete?: (req: PostReq<ObjectType>, res: Res<ObjectType>) => void;
  _patch?: (req: PostReq<ObjectType>, res: Res<ObjectType>) => void;


  createHandler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
      if (typeof this._get === "function") {
        return this._get(req, res);
      }
      throw new HttpError(405);
    }

    if (req.method === "POST") {
      if (typeof this._post === "function") {
        return this._post(req, res);
      }
      throw new HttpError(405);
    }

    if (req.method === "DELETE") {
      if (typeof this._delete === "function") {
        return this._delete(req, res);
      }
      throw new HttpError(405);
    }

    if (req.method === "PATCH") {
      if (typeof this._patch === "function") {
        return this._patch(req, res);
      }
      throw new HttpError(405);
    }
    throw new HttpError(405);
  };
}
