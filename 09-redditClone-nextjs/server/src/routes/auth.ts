import {validate} from "class-validator";
import {Request, Response, Router} from "express";
import {User} from "../entity/User";

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
  const {email, username, password} = req.body;

  try {
    let errors: any = {};
    // 1. 이메일과 유저이름이 이미 사용 중인지 확인.
    // baseEntity 의 findOneBy() 지정된 요소와 일치하는 값을 찾는다.
    const emailUser = await User.findOneBy({email});
    const usernameUser = await User.findOneBy({username});

    //2. 이미 있다면 errors 객체에 넣어준다.
    if (emailUser) errors.email = '이미 해당 이메일 주소가 사용 중 입니다.';
    if (emailUser) errors.username = '이미 해당 사용자 이름이 사용 중 입니다.';

    //3. 에러가 있다면 return 으로 에러를 response 로 보냄.
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    // 유저 정보와 함께 user 인스턴스를 생성.
    const user = new User()
    user.email = email
    user.username = username
    user.password = password

    // 엔티티에 저장 해놓은 조건으로 user 데이터의 유효성 검사를 해준다.
    errors = await validate(user); // class-validator 의 유효성 검사

    if (errors.length > 0) return res.status(400).json(mapError(errors));

    // 유저 정보를 user table 에 저장.
    await user.save()

    // 저장된 유저 정보를 response 로 보내준다.
    return res.json(user);
  } catch (error) {
    console.log(error)
    // 에러를 response 로 보내준다.
    return res.status(500).json({error})
  }
}

const router = Router();
router.post('/register', register);

export default router




/*
*  Object.entries 란?
*  정적 메서드는 주어진 개체 자체의 열거 가능한 문자열 키 속성 키-값 쌍의 배열을 반환합니다
* const obj = {0 : 'a', 1 : 'b' , 2  : 'c'};
* console.log(Object.entries)
* // [[0,'a'],[1,'b'],[2,'c']]
* */
