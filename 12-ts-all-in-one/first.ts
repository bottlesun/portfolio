// 강의 교안 1

const a: string = '5';
const b: number = 5;
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
const f: any = '아무거나 다 됨.'

// 타입스크립트가 추론을 정확하게 해줬다면, 굳이 쓰지 말아라.
/*
function add(x: number, y: number): number {
  return x + y
}

const result = add(1, 2);*/


// type Add = (x: number, y: number) => void
// interface Add {
//   (x: number, y: number): number;
// }
// const add: Add = (x, y) => x + y;

let aa = 123;
aa = 'hello' as unknown as number;

const arr1: string[] = ['123', '456'];
const arr2: Array<number> = [123, 456];
const arr3: [number, number, string] = [123, 456, 'hello'] // tuple 배열의 길이가 고정 됨.

const obj: { lat: number, lon: number } = {lat: 37.5, lon: 127.5};

const enum EDirection { // 여러개의 변수들을 하나로 묶고싶을때 사용 한다. (자바스크립트 코드로 안남아있음.)
  Up,     //1        // 첫번째 부터 + 1 의 값을 반환
  Down,   //2        // 문자열도 가능
  Left,   //3        // 각자 값을 정해 줄 수 있다.
  Right,  //4
}

const ODirection = { // 객체  ( 자바스크립트 코드로 남아있음. )
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

const obj2 = {a: '123', b: 'hello', c: 'world'};
type key = keyof typeof obj2;
// typeof 값을 type 으로 쓰고싶을때 사용
// keyof key 값을 뽑아 내고 싶을때 typeof 를 붙혀 사용


// Using the enum as a parameter
function walk(dir: EDirection) {
} // enum 은 직접 타입으로 사용 가능

// It requires an extra line to pull out the keys
type Direction = typeof ODirection[keyof typeof ODirection];

function run(dir: Direction) {
}

walk(EDirection.Left);

try {
} catch (error) { // error 의 type 은 unknown
  (error as Error).message // 따로 type을 선언 해줘야 한다.
}

function fs(): void {
  return undefined
}

function numOrStr(a: number | string) {
  // 이렇게도 사용해도 되지만 실수 했을 수 있기에 error 를 낼 확률 이 있다. (unknown 일때 제외 하고 최대한 안써야 한다. )
  (a as number).toFixed()

  // 타입가드
  if (typeof a === 'number') { // a 가 숫자 일때만 내부 값 return
    a.toFixed(1) // 첫번째 소수점 까지 반환
  } else {
    a.charAt(3) // 3번째 단일 문자 반환 (b)
  }

  if (typeof a === 'string') {
    a.charAt(3)
  }

  /* type 값에 boolean 이 없기 때문에 사용을 할 수 없다.
   if(typeof a === 'boolean'){
      a.toString(); // a : never ( 사용 할 수 없음 )
    }
    */
}

numOrStr('123')
numOrStr(1)

function numOrNumArray(a: number | number[]) {
  if (Array.isArray(a)) { // 배열인지 아닌지 구분
    a.concat(4); // concat - 배열 합쳐 새 배열로 반환
  } else { // false 면 number
    a.toFixed(3)
  }
}

numOrNumArray(123)
numOrNumArray([1, 2, 3])

/* class  */
class classA { // class 는 그자체로 타입이 된다.
  aaa() {
  }
}

class classB {
  bbb() {
  }
}

function aOrB(param: classA | classB) {
  if (param instanceof classA) { // param 값이 classA이다.
    param.aaa();
  }
}

aOrB(new classA()); // class 자체가 아닌 instance 를 의미한다.
aOrB(new classB());


type B = { type: 'b', bbb: string };
type C = { type: 'c', ccc: string };
type D = { type: 'd', ddd: string };
type A = B | C | D;

function typeCheck(a: A) {
  if (a.type === 'b') {
    a.bbb;
  } else if (a.type === 'c') {
    a.ccc;
  } else {
    a.ddd;
  }
}


interface Cat {
  meow: number
}

interface Dog {
  bow: number
}

function catOrDog(a: Cat | Dog): a is Dog {
// 타입 판별을 만들어 적용 할 수 있다.
  if ((a as Cat).meow) {
    return false
  }
  return true;
}

// 타입을 구분해주는 커스텀 함수 만들기.
const cat: Cat | Dog = {meow: 3}
if (catOrDog(cat)) {
  console.log(cat.meow);
}
if ('meow' in cat) {
  console.log(cat.meow);
}


const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => input.status === 'rejected';
const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => input.status === 'fulfilled';

const promises = await Promise.allSettled([Promise.resolve('a'), Promise.resolve('b')]);
const errors = promises.filter(isRejected); // allSettled 가 있을때 error 들만 구분하고 싶을때 isRejected 반대로 하면 성공만 반환
// const errors = promises.filter((promise) => promise.status ==='rejected'); 위랑 같은것. return 값에 : input is PromiseRejectedResult 이것만 더 추가 되어 있는 것.

export {}


//index-signature [key: type] : type
type AAA = { [key: string]: string }; // 모든 속성이 type 으로 만들때 사용
const aaa: AAA = {a: 'hi', b: 'hello'}


/*

interface A {
  readonly a: string;
  b: string;
}

// implements , private , protected - typeScript 에만 있는 키워드.
class B implements A { // interface 를 구현 할 수 있게 해준다.

  private a: string; = '123' // class B 안에서만 사용 할 수 있다. 외부에서 사용 불가능
  protected b: string; = '456'  // private 가 같지만 상속 받은 곳에서는 사용 가능

  method() {
  console.log(this.a);
  console.log(this.b);
  }
}
class C extends B {
method(){
console.log(this.a); // 불가능
console.og(this.b); // 가능
}
}
new C().a;
new C().b;

*/


// public         protected         private
//   o                o                o   - 클래스 내부
//   o                x                x   - 클래스 외부
//   o                o                x   - 상속 받은 곳


/*

abstract  class B {
  private readonly a :string = '123';
  b: string = 'word';
  c : string = 'wow'

  abstract method() : void
  abstract method2(){ // 실질적인 메서드도 가지고 있을 수 있다.
  return : '3'
  }
}

class C extends B {
  method() {
    console.log(this.a)
    console.log(this.b)
    console.log(this.c)
  }
}

new C().a;
new C().b;
new C().c;

*/

/*
function add(x:string | number , y: string | number) : string | number {return x+y};

add(1,2) // 3
add('1' , '2') //12

// 이렇게 되버릴 수 있기 때문에 위는 잘못 된 타입 추론
add(1,'2')
add('1',2)

// generic 타입을 변수처럼 만드는 것
// T 는 모든 타입이 들어올 수 있다.  -> extends 로 T에다 제한을 둘 수 있다.
function add< T extends number | string >(x: T , y: T ) : T {return x + y};

// 함수를 선언할때 타입 지정하는것이 아닌, 함수를 사용 할때 타입이 지정된다.

add(1,2) // 3
add('1' , '2') //12
*/

// 코드를 보고 타입 만들어보기
// 코드 대로 작성 후 타입을 하나씩 추가
interface Arr<T> {

  forEach(callback: (item: T) => void): void

  map<S>(callback: (value: T, index: number) => S): S[]

  filter<S extends T>(callback: (v: T) => v is S): S[]

  // T는 <number | string> 또는 으로 타입이 잡혔기 때문에 고정된 타입을 위해선 새로운 제네릭 변수를 넣어준다. (S)
  // 커스텀 타입가드를 통해 s를 t의 요소로 할당해준다.,
}

const ArrA: Arr<number> = [1, 2, 3];
ArrA.map((v, i) => v + 1) // [2,3,4] type 은 number 가 나오도록하기
ArrA.map((v, i) => v.toString()) // ['2','3','4'] type 은 string 이 나오도록하기


const ArrB: Arr<string> = ["1", "2", "3"];
ArrB.forEach((i) => {
  console.log(i)
  i.charAt(1)
})
ArrB.forEach((i) => {
  console.log(i)
  return '3';
});

const ArrC: Arr<number> = [1, 2, 3];
ArrC.filter((v): v is number => v % 2 === 0); // [2] number[]

const ArrD: Arr<number | string> = [1, '2', 3, '4', 5];
// 바깥으로 빼서 사용 하는 방법
const predicate2 = (v: string | number): v is string => typeof v === 'string';
ArrD.filter(predicate2) // ['2','4'] string[]

// 안쪽에서 사용 하는 방법
ArrD.filter((v): v is string => typeof v === 'string') // ['2','4'] string[]


function Aa(x: string | number): number {
  return 0;
}

type Bb = (x: string) => number | string;

// Aa가 Bb 로 대입이 가능하다.
// return 값은 넓은 타입으로 대입 가능
// 매게변수는 좁은 타입으로 대입 가능

const Bb: Bb = Aa;


// 같은 타입을 여러번 선언 하는것
declare function add(x: number, y: number): number
declare function add(x: number, y: number, z: number): number

add(1, 2);
add(2, 3, 4);

class AA {
  add(x: number, y: number): number
  add(x: string, y: string): string
  add(x: any, y: any) {
    return x + y
  }
}

const cc = new AA().add('1', '2');

interface Axios {
  get(): void;
}

class CustomError extends Error {
  // 기본 javascript 의 error 에서는 없기 때문에 Custom으로 만들어 extends 시켜준다.
  response?: {
    data: any;
  }
}

declare const axios: Axios;

(async () => {
  try {
    await axios.get();
  } catch (err: unknown) {
    if (err instanceof CustomError) {
      // as 는 unknown 일 경우 꼭 사용해야 된다.
      // ts 는 1회성으로 사용이 되기 때문에,  변수를 만들어줘 타입을 저장해줘야 한다.
      console.error(err.response?.data)
      err.response?.data;
    }

  }
})();

interface Profile {
  name: string,
  age: number,
  married: boolean
}

const bottlesun: Profile = { // married 값을 제거하고 싶을땐?
  name: 'bottlesun',
  age: 27,
  married: false
}

// Partial - <Props> 안에 들어가는 값을 ? 옵셔널로 만들어주는 기능.
/*
const newBottlesun: Partial<Profile> = {
  name: 'bottlesun',
  age: 27,
  }
 */

// Pick - <Props> 에서 특정 값만 가지고 오는 기능.
/*
const newBottlesun: Pick<Profile , 'name' | 'age'> = {
  name: 'bottlesun',
  age: 27,
}
*/

// Omit - <Props> 에서 특정 값만 제외 하는 기능.
/*const newBottlesun: Omit<Profile , 'married'> = {
  name: 'bottlesun',
  age: 27,
}*/

// Partial 만들어보기
type P<T> = {
  // key : value
  [key in keyof T]?: T[key];
}

// Pick 만들어보기
type Picks<T, S extends keyof T> = {
  // key : value
  [key in S]: T[key];
}

// Exclude - key 들에서 빼고 싶은걸 선택.
type Exc = Exclude<keyof Profile, 'married'>

type O<T, S> = Pick<T, Exclude<keyof T, S>>

const CustomNewBottlesun: O<Profile, 'married'> = {
  name: 'bottlesun',
  age: 27,
}

// type Exclude<T,U> = T extends U ? never : T;
// type Extract<T,U> = T extends U ? T : never;
type Animal = 'Cat' | 'Dog' | 'Human';
type Mammal = Exclude<Animal, 'Human'>;  // 'Cat' | 'Dog' | never
type Human = Extract<Animal, 'Cat' | 'Dog'>; // 'Cat' | 'Dog' | never


/*type R<T> = {
  [key in keyof T] -? : T[key];
  // 옵셔널을 전부 빼버린다.
}*/
// Mapping Modifiers - -?

/*
const newBottlesun: Required<Profile> = {
  name: 'bottlesun',
  age: 27,
  married : false,
}*/


/*
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
  // 남의 키를 가지고 올때 readonly 를 붙혀준다.
};

const newBottlesun: Readonly<Profile> = {
  name: 'bottlesun',
  age: 27,
  married: false,
}*/


/*
type Record<T extends keyof any ,S> = { // extends keyof any string / number /symbol 만 올 수 있기에 제한 조건이필요
 [key in T] : S;
}
// 객체에서 key , type 형식으로 반환 해준다
const ReA : Record<string, number> = {a:3 , b: 5 , c : 7}
*/

/*
type n = string | null | undefined | boolean | number
type CN<T> = T extends null | undefined ? never : T

type newN = NonNullable<n> // string | boolean | number
*/


/*
function zip(x: number, y: string, z: boolean): {x: number, y: string, z: boolean} {
  return {x, y, z};
}
// T extends (...args : any) => any 함수 제한두는 방법.
// T 는 무조건 함수여야 한다 = A로 추론 해서 값이 있으면 A : 없으면 never
// infer = 자동추론
type CP<T extends (...args : any) => any> = T extends (...args : infer A) => any ? A : never
type CR<T extends (...args : any) => any> = T extends (...args : any) => infer A ? A : never

type params = Parameters< typeof zip>
type Ret = ReturnType<typeof zip>
// 배열처럼 되있는 타입에 접근이 가능하다.
type Fisrst = Ret // string
*/


//T extends abstract new (...args: any) => any 생성자 모양

// type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;

// type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;

/*
class CPI {
  a: string;
  b: number;
  c: boolean;

  constructor(a: string, b: number, c: boolean) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}

const newConstructorP = new CPI('123', 456, true);
type CP = ConstructorParameters<typeof CPI> // typeof 클래스가 생성자
type I = InstanceType<typeof CPI>

const NI: CPI = new CPI('123', 456, true); // 인스턴스(new)
*/
