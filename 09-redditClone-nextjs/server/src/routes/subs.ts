import {Response,Request, Router} from "express";
import jwt from "jsonwebtoken";
import {User} from "../entity/User";

const createSub = async (req:Request, res:Response , next) => {
  const {name, title, description} = req.body;

  const token = req.cookies.token;
  // 토큰이 없다면 에러를 프론트엔드로 보내주기
  if(!token) return res.status(401).json({error: 'Unauthenticated'});

  // 토큰이 있다면 토큰을 검증하고 유저 정보를 가져온다.
  const {username} : any = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOneBy({username : username});

  if(!user) throw new Error('Unauthenticated');

}

const router = Router();

router.post('/', createSub);

export default router;
