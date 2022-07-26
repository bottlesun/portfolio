"use strict";
// 강의 교안 1
const a = '5';
const b = 5;
const c = true;
const d = undefined;
const e = null;
const f = '아무거나 다 됨.';
// 타입스크립트가 추론을 정확하게 해줬다면, 굳이 쓰지 말아라.
function add(x, y) { return x + y; }
const result = add(1, 2);
// type Add = (x: number, y: number) => void
// interface Add {
//   (x: number, y: number): number;
// }
// const add: Add = (x, y) => x + y;
let aa = 123;
aa = 'hello';
const arr1 = ['123', '456'];
const arr2 = [123, 456];
const arr3 = [123, 456, 'hello']; // tuple 배열의 길이가 고정 됨.
const obj = { lat: 37.5, lon: 127.5 };
const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
};
const obj2 = { a: '123', b: 'hello', c: 'world' };
// typeof 값을 type 으로 쓰고싶을때 사용
// keyof key 값을 뽑아 내고 싶을때 typeof 를 붙혀 사용
// Using the enum as a parameter
function walk(dir) { } // enum 은 직접 타입으로 사용 가능
function run(dir) { }
walk(2 /* EDirection.Left */);
try {
}
catch (error) { // error 의 type 은 unknown
    error.message; // 따로 type을 선언 해줘야 한다.
}
