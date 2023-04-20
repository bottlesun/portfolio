import bcrypt from "bcryptjs";
import { isEmpty, validate } from "class-validator";
import cookie from "cookie";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";

/**
 * mapError - 유효성 검사에 대한 error 처리 로직.
 * @param errors
 * */
const mapError = (errors: Object[]) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1];
    return prev;
  }, {});
};

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    let errors: any = {};
    // 1. 이메일과 유저이름이 이미 사용 중인지 확인.
    // baseEntity 의 findOneBy() 지정된 요소와 일치하는 값을 찾는다.
    const emailUser = await User.findOneBy({ email });
    const usernameUser = await User.findOneBy({ username });

    //2. 이미 있다면 errors 객체에 넣어준다.
    if (emailUser) errors.email = "이미 해당 이메일 주소가 사용 중 입니다.";
    if (emailUser) errors.username = "이미 해당 사용자 이름이 사용 중 입니다.";

    //3. 에러가 있다면 return 으로 에러를 response 로 보냄.
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    // 유저 정보와 함께 user 인스턴스를 생성.
    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;

    // 엔티티에 저장 해놓은 조건으로 user 데이터의 유효성 검사를 해준다.
    errors = await validate(user); // class-validator 의 유효성 검사

    if (errors.length > 0) return res.status(400).json(mapError(errors));

    // 유저 정보를 user table 에 저장.
    await user.save();

    // 저장된 유저 정보를 response 로 보내준다.
    return res.json(user);
  } catch (error) {
    console.log(error);
    // 에러를 response 로 보내준다.
    return res.status(500).json({ error });
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    let errors: Error | any = {};
    // 비워져있다면 에러를 프론트엔드로 보내주기
    if (isEmpty(username)) errors.username = "사용자 이름은 비워둘 수 없습니다.";
    if (isEmpty(password)) errors.password = "비밀번호는 비워둘 수 없습니다.";
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // 디비 에서 유저 찾기
    const user = await User.findOneBy({ username });
    // 유저가 없다면 에러 보내기
    if (!user) return res.status(404).json({ username: "사용자 이름이 등록되지 않았습니다." });
    // 유저가 있다면 비밀번호 비교
    // bcrypt.compare() 로 local password 값과 db 저장된 password 값을 비교해주기.
    const passwordMatches = await bcrypt.compare(password, user.password);
    //비밀번호가 다르면 에러보내기
    if (!passwordMatches) return res.status(401).json({ password: "비밀번호가 일치하지 않습니다." });
    // 비밀번호가 맞다면 토큰 생성 (jwt 사용)
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    // 쿠키 저장
    // cookie.serialize 를 사용해서 const token 에 저장 된 값을 저장한다.
    res.set(
      "Set-Cookie",
      cookie.serialize("login_token", token, {
        httpOnly: true, // 임의로 클라이언트에서 쿠키 조작을 할 수 없도록 해주는 옵션
        maxAge: 60 * 60 * 24 * 7, // 1 week 쿠키의 만료시간을 정해준다.
        // secure : process.env.NODE_ENV === "production" // https 연결에서만 쿠키를 사용 할 수 있게 해준다.
        // sameSite : "script" // 요청이 외부 사이트에서 일어날때 쿠키를 보내지 못하도록 막는다.
        path: "/"
      })
    );

    return res.json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const router = Router();
router.post("/register", register);
router.post("/login", login);

export default router;

/*
 *  Object.entries 란?
 *  정적 메서드는 주어진 개체 자체의 열거 가능한 문자열 키 속성 키-값 쌍의 배열을 반환합니다
 * const obj = {0 : 'a', 1 : 'b' , 2  : 'c'};
 * console.log(Object.entries)
 * // [[0,'a'],[1,'b'],[2,'c']]
 * */
