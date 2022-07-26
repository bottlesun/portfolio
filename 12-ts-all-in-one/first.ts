// 강의 교안 1
const a: string = '5';
const b: number = 5;
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
const f: any = '아무거나 다 됨.'

// 타입스크립트가 추론을 정확하게 해줬다면, 굳이 쓰지 말아라.

function add(x: number, y: number): number {
  return x + y
}

const result = add(1, 2);


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
  aaa () {}
}

class classB{
  bbb() {}
}

function aOrB(param: classA | classB){
  if(param instanceof classA) { // param 값이 classA이다.
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


interface Cat { meow: number }
interface Dog { bow: number }
function catOrDog(a: Cat | Dog): a is Dog {
// 타입 판별을 만들어 적용 할 수 있다.
  if ((a as Cat).meow) { return false }
  return true;
}

// 타입을 구분해주는 커스텀 함수 만들기.
const cat: Cat | Dog = { meow: 3 }
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
type AAA = {[key : string] : string}; // 모든 속성이 type 으로 만들때 사용
const aaa:AAA ={a:'hi' , b:'hello'}


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
