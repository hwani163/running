import { ApiRoute, PostReq, Res, validator } from "@controller/core";
import strava from "strava-v3";
import { prisma } from "@database";
strava.config({
  "access_token": "c1218d1dea3ac95afce731b0c71842a6c70df781",
  "client_id": "60205",
  "client_secret": "2c31cedcfe8d084d260828e8815a2c34179aa989",
  "redirect_uri": process.env.DOMAIN || '',
});
import z from "zod";
class RouteClass extends ApiRoute {
  _post = async (
    req: PostReq<{ platform: string, code: string }>,
    res: Res<{ name: string }>
  ) => {
    // const validatorResult = validator(HelloParams, req.query);
    const { platform } = req.body;
    if (req.body.platform === 'strava') {
      const { code } = req.body;
      if (code) {
        // const result = await strava.oauth.getToken(code);

        // this.success(res as Res<{}>, user);
      }
    }

  };
}
export default new RouteClass().createHandler;