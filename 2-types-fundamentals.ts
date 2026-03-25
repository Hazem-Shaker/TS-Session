//-----------------------------1-----------------------------
//-----------------------------Implicit vs Explicit Typing-----------------------------
/*
--> Implicit (Type Inference)
  TypeScript automatically infers the type from the assigned value.
  You don't need to write the type — TS figures it out.

--> Explicit (Type Annotation)
  You manually declare the type using a colon after the variable name.
  Use this when inference isn't enough (no initial value, union types, complex objects).
*/

// Implicit — TS infers these automatically
let city = 'Cairo'; // string
let population = 10_000_000; // number
let isCapital = true; // boolean

// Explicit — you declare the type yourself
let country: string = 'Egypt';
let area: number = 1_010_408;
let isAfrican: boolean = true;

// When inference fails, explicit is required
let response: string | number; // no initial value → must annotate
response = 'OK';
response = 200;

//-----------------------------2-----------------------------
//-----------------------------Fundamental Types-----------------------------

// Primitives
let username: string = 'admin';
let age: number = 28;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Arrays — two equivalent syntaxes
let scores: number[] = [95, 87, 73];
let names: Array<string> = ['Alice', 'Bob'];

// Object type with optional property (?)
let user: { name: string; age: number; email?: string } = {
  name: 'Sara',
  age: 25,
};

// Function type annotation
let add: (a: number, b: number) => number;
add = (a, b) => a + b;

// Rest parameters
function sum(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

//-----------------------------3-----------------------------
//-----------------------------Type Casting (Type Assertions)-----------------------------
/*
--> Type assertions tell TS: "Trust me, I know the type."
    They do NOT convert values at runtime — they only affect the compiler.
    Two syntaxes:
      1. value as Type        (preferred, works everywhere)
      2. <Type>value           (not available in JSX/TSX files)
*/

// "as" syntax
const inputEl = document.getElementById('user-input') as HTMLInputElement;
inputEl.value = 'admin';

// Angle-bracket syntax (same effect)
const passEl = <HTMLInputElement>document.getElementById('pass-input');

// Forced double assertion through unknown — use with caution
let raw: string = '123';
let forced = raw as unknown as number; // compiles, but raw is still a string at runtime!
// let forced = raw as number; // also compiles, but still a string at runtime!

// Practical example: asserting an API response shape
const apiData: unknown = JSON.parse('{"id":1,"title":"Learn TS"}');
const course = apiData as { id: number; title: string };
console.log(course.title); // "Learn TS"

//-----------------------------4-----------------------------
//-----------------------------unknown vs any-----------------------------

/*
unknown in TypeScript

unknown is a type-safe version of any used when the type of a value is not known yet.

Unlike any, TypeScript does not allow you to use the value until you check its type.

*/
let value: unknown = 'Hello';
value.toUpperCase(); // ❌ Error

if (typeof value === 'string') {
  value.toUpperCase(); // ✅ OK
}

// but with any, you can do anything without checks
let anything: any = 'Hello';
anything.toUpperCase(); // ✅ OK, but no type safety

/*

any -> Type checking is disabled
unknown -> Type checking is enabled, but you must narrow the type before using it
Type narrowing means reducing a variable’s possible types to a more specific type using checks.
*/
