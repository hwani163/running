import { NextApiRequest, NextApiResponse } from "next";
import { ApiRoute, GetReq, Res } from "../../controller/core";

class RouteClass extends ApiRoute {
  _post = (
    req: GetReq<{ user: string; hello: string }>,
    res: Res<{ name: string }>
  ) => {
    res
      .status(200)
      .json({ success: true, data: { name: "hello" }, message: "good" });
  };
}
const Route = new RouteClass();

export default Route.make;
