//-----------------------------1-----------------------------
//-----------------------------any-----------------------------
/*
--> `any` opts out of type checking entirely.
    TS treats the value as if it could be anything — no errors, no autocompletion.
    Use it as a last resort (e.g., migrating JS to TS gradually).
*/

let data: any = "hello";
data = 42;
data = { x: 1 };
data.nonExistentMethod(); // no error at compile time — crashes at runtime!
data.toUpperCase();       // no error — TS doesn't check

// any spreads silently
let val: any = "text";
let len: number = val; // no error — TS trusts any completely

//-----------------------------2-----------------------------
//-----------------------------unknown-----------------------------
/*
--> `unknown` is the type-safe counterpart of `any`.
    You can assign anything to it, but you CANNOT use it without narrowing first.
    Forces you to check the type before operating on the value.
*/

let input: unknown = "Hello World";

// input.toUpperCase(); // Error: Object is of type 'unknown'

// You must narrow first
if (typeof input === "string") {
  console.log(input.toUpperCase()); // "HELLO WORLD" — now TS knows it's a string
}

// Real-world use: safely handling API responses
function processResponse(res: unknown): string {
  if (typeof res === "object" && res !== null && "message" in res) {
    return (res as { message: string }).message;
  }
  return "Unknown response";
}

//-----------------------------3-----------------------------
//-----------------------------void-----------------------------
/*
--> `void` means a function does NOT return a meaningful value.
    It can return undefined implicitly or explicitly, but nothing else.
    Common in event handlers, loggers, side-effect functions.
*/

function logMessage(msg: string): void {
  console.log(`[LOG]: ${msg}`);
}

// void in callback types allows the callback to return anything (return is ignored)
type Callback = (item: string) => void;
const items = ["a", "b", "c"];
// Array.forEach expects a void callback — push returns a number, but TS allows it
const result: string[] = [];
items.forEach((item) => result.push(item)); // push returns number, but void ignores it

//-----------------------------4-----------------------------
//-----------------------------never-----------------------------
/*
--> `never` represents values that NEVER occur.
    Two main uses:
      1. Functions that never return (infinite loops, always throw)
      2. Exhaustiveness checking in switch/if — ensuring all cases are handled
*/

// Function that always throws — it never returns a value
function throwError(message: string): never {
  throw new Error(message);
}

// Function with an infinite loop — never reaches the end
function infiniteLoop(): never {
  while (true) {
    // process events forever
  }
}

// Exhaustiveness checking
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape): number {
  switch (shape) {
    case "circle":
      return Math.PI * 10 ** 2;
    case "square":
      return 10 * 10;
    case "triangle":
      return (10 * 5) / 2;
    default:
      // if a new shape is added to the union and not handled above,
      // this line will cause a compile-time error
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

//-----------------------------5-----------------------------
//-----------------------------Summary-----------------------------
/*
  | Type    | Assignable? | Usable without check? | Use case                          |
  |---------|-------------|-----------------------|-----------------------------------|
  | any     | Yes         | Yes (unsafe)          | Escape hatch, JS migration        |
  | unknown | Yes         | No (must narrow)      | Safe dynamic values, API input    |
  | void    | —           | —                     | Functions with no meaningful return|
  | never   | —           | —                     | Unreachable code, exhaustiveness  |
*/
