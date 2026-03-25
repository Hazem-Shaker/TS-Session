//-----------------------------1-----------------------------
//-----------------------------Numeric Enums-----------------------------
/*
--> Enums define a set of named constants.
    Numeric enums auto-increment from 0 (or from a custom start value).
    Each member gets a numeric value and a reverse mapping (value → name).
*/

enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}

let move: Direction = Direction.Up;
console.log(move);                // 0
console.log(Direction[0]);        // "Up" — reverse mapping

// Custom starting value
enum StatusCode {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
}

function handleStatus(code: StatusCode): string {
  if (code >= 400) return "Error!";
  return "Success";
}
console.log(handleStatus(StatusCode.NotFound)); // "Error!"

//-----------------------------2-----------------------------
//-----------------------------String Enums-----------------------------
/*
--> String enums require an explicit string value for each member.
    No reverse mapping, but more readable at runtime and in logs.
    Preferred when the value itself matters (API payloads, config).
*/

enum LogLevel {
  Debug = "DEBUG",
  Info = "INFO",
  Warn = "WARN",
  Error = "ERROR",
}

function log(level: LogLevel, message: string): void {
  console.log(`[${level}] ${message}`);
}
log(LogLevel.Error, "Disk full"); // [ERROR] Disk full

//-----------------------------3-----------------------------
//-----------------------------Const Enums-----------------------------
/*
--> `const enum` is fully inlined at compile time — no runtime object is generated.
    The compiled JS replaces enum references with their literal values.
    Advantage: smaller bundle, zero overhead.
    Limitation: no reverse mapping, no dynamic access.
*/

const enum Color {
  Red = "#FF0000",
  Green = "#00FF00",
  Blue = "#0000FF",
}

let bg = Color.Red;
// Compiled JS: let bg = "#FF0000"; — no Color object exists at runtime

//-----------------------------4-----------------------------
//-----------------------------Enums as Types-----------------------------
/*
--> Enum members can be used as types themselves.
    Useful for restricting function parameters to specific enum values.
*/

enum Role {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Viewer = "VIEWER",
}

type AdminUser = {
  name: string;
  role: Role.Admin; // only Role.Admin is allowed
};

const admin: AdminUser = {
  name: "Nour",
  role: Role.Admin,
  // role: Role.Viewer, // Error: not assignable to Role.Admin
};

// Using enum in a function
function hasWriteAccess(role: Role): boolean {
  return role === Role.Admin || role === Role.Editor;
}
console.log(hasWriteAccess(Role.Viewer)); // false

//-----------------------------5-----------------------------
//-----------------------------Enums vs Union Literals-----------------------------
/*
--> In modern TS, string literal unions are often preferred over enums:
    - Simpler, no runtime cost
    - Better tree-shaking
    - No import needed for inline types

    Use enums when you need: runtime iteration, reverse mapping, or grouping constants.
*/

// Enum approach
enum Fruit {
  Apple = "apple",
  Banana = "banana",
  Mango = "mango",
}

// Equivalent union literal approach
type FruitLiteral = "apple" | "banana" | "mango";

// Both work the same for type checking
function eat(fruit: FruitLiteral): void {
  console.log(`Eating ${fruit}`);
}
eat("mango");
