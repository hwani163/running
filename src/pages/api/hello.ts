import { NextApiRequest, NextApiResponse } from "next";
import { ApiRoute, GetReq, Res } from "../../utils/apiUtils";


class RouteClass extends ApiRoute {
  _post = (req: GetReq<{ user: string, hello: string }>, res: Res<{ name: string }>) => {
    res.status(200).json({ success: true, data: { name: 'hello' }, message: 'good' })
  }
}

export default new RouteClass().make;