import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";

export default async function user(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.login_token;
    console.log(req.cookies.login_token, "token");
    // 토큰이 없다면 에러를 프론트엔드로 보내주기
    if (!token) return next();

    // 토큰이 있다면 토큰을 검증하고 유저 정보를 가져온다.
    const { username }: any = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await User.findOneBy({ username });
    console.log("user", user);

    if (!user) throw new Error("Unauthenticated");

    // 유저 정보를 res.user.local.user에 저장한다.
    // 이렇게 하면 다음 미들웨어에서 유저 정보를 사용할 수 있다.
    res.locals.user = user;
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong" });
  }
}
