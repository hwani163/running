import { ApiRoute, validator } from "../../controller/core";
import type { UserInfo, GetReq, Res } from "../../controller/core";
import z from "zod";
import { strava } from "../../controller/strava";
import { Session } from "next-auth";
export const HelloParams = z.object({
  id: z.number().or(z.nan()),
  type: z.enum(["daily", "monthly"]),
  name: z
    .string({
      invalid_type_error: "보험 이름을 입력해 주세요.",
    })
    .max(30, { message: "최대 30자까지 입력 가능합니다" })
    .min(1, { message: "보험 이름을 입력해 주세요." }),
  fee: z.preprocess(
    (value) => {
      if (value === null) return null;
      if (value === "") return null;
      return Number(value);
    },
    z
      .number({
        invalid_type_error: "보험료를 입력해 주세요.",
      })
      .max(1000000, { message: "최대 1,000,000까지 입력 가능합니다" })
  ),
  coverage: z.preprocess(
    (value) => {
      if (value === null) return null;
      if (value === "") return null;
      return Number(value);
    },
    z
      .number({
        invalid_type_error: "보상한도를 입력해 주세요.",
      })
      .max(10000, { message: "최대 10,000까지 입력 가능합니다" })
  ),
  indemnification_fee: z.preprocess(
    (value) => {
      if (value === null) return null;
      if (value === "") return null;
      return Number(value);
    },
    z
      .number({
        invalid_type_error: "자차 면책금을 입력해 주세요.",
      })
      .max(10000, { message: "최대 10,000까지 입력 가능합니다" })
  ),
  car_group_ids: z
    .array(z.number())
    .nonempty("보험 적용 차량 그룹을 선택해 주세요."),
});
export type HelloParams = z.infer<typeof HelloParams>;

class RouteClass extends ApiRoute {
  _get = async (
    req: GetReq<{ user: string; hello: string }>,
    res: Res<any>,
    userInfo: UserInfo
  ) => {
    console.log(userInfo);
    if (userInfo.access_token) {
      //@ts-ignore
      const result = await strava(userInfo.access_token).athlete.listActivities(
        {
          per_page: 50,
        }
      );
      res.status(200).json({ success: true, data: result, message: "good" });
    }
  };
}
export default new RouteClass().createHandler;
