// 강의 교안 1
const a: string = '5';
const b: number = 5;
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
const f: any = '아무거나 다 됨.'

// 타입스크립트가 추론을 정확하게 해줬다면, 굳이 쓰지 말아라.

function add(x: number, y: number): number {return x + y}
const result = add(1,2);


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

