//-----------------------------1-----------------------------
//-----------------------------extends in Generics (Constraints)-----------------------------
/*
--> `extends` in generics restricts what type T can be.
    In conditional types, `extends` acts like a ternary: T extends U ? X : Y
*/

// Constraint: T must have an id property
function getIds<T extends { id: number }>(items: T[]): number[] {
  return items.map((item) => item.id);
}

const ids = getIds([
  { id: 1, name: "Omar" },
  { id: 2, name: "Sara" },
]);
console.log(ids); // [1, 2]

// Conditional type: behaves like a ternary at the type level
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"
type C = IsString<"hello">; // "yes" — string literal extends string

// Practical conditional type
type ArrayOrSingle<T> = T extends unknown[] ? T : T[];
type D = ArrayOrSingle<string>;    // string[]
type E = ArrayOrSingle<number[]>;  // number[]

//-----------------------------2-----------------------------
//-----------------------------implements (Class Contracts)-----------------------------
/*
--> `implements` ensures a class fulfills an interface contract.
    The class MUST provide all properties and methods defined in the interface.
    A class can implement multiple interfaces.
*/

interface Printable {
  print(): string;
}

interface Loggable {
  log(): void;
}

class Invoice implements Printable, Loggable {
  constructor(
    private id: number,
    private amount: number,
  ) {}

  print(): string {
    return `Invoice #${this.id}: $${this.amount}`;
  }

  log(): void {
    console.log(this.print());
  }
}

const inv = new Invoice(1001, 250);
inv.log(); // "Invoice #1001: $250"

// implements also works with type aliases
type Cacheable = {
  cacheKey(): string;
  ttl: number;
};

class CachedQuery implements Cacheable {
  ttl = 300;
  constructor(private query: string) {}

  cacheKey(): string {
    return `query_${this.query.replace(/\s/g, "_")}`;
  }
}

//-----------------------------3-----------------------------
//-----------------------------infer (Type Extraction)-----------------------------
/*
--> `infer` declares a type variable INSIDE a conditional type.
    It lets you "extract" part of a type and use it.
    Think of it as pattern matching for types.
*/

// Extract the return type manually (this is how ReturnType<T> works internally)
type MyReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;

function fetchData(): { id: number; title: string } {
  return { id: 1, title: "TS" };
}

type FetchResult = MyReturnType<typeof fetchData>;
// { id: number; title: string }

// Extract element type from an array
type ElementType<T> = T extends (infer E)[] ? E : T;

type F = ElementType<string[]>;  // string
type G = ElementType<number[]>;  // number
type H = ElementType<boolean>;   // boolean (not an array, returns T)

// Extract the resolved type from a Promise
type Unwrap<T> = T extends Promise<infer U> ? U : T;

type I = Unwrap<Promise<string>>; // string
type J = Unwrap<number>;          // number

// Practical: extract props type from a component-like function
type PropsOf<T> = T extends (props: infer P) => unknown ? P : never;

function UserCard(props: { name: string; avatar: string }): string {
  return `<div>${props.name}</div>`;
}

type UserCardProps = PropsOf<typeof UserCard>;
// { name: string; avatar: string }

//-----------------------------4-----------------------------
//-----------------------------satisfies (Type Validation without Widening)-----------------------------
/*
--> `satisfies` (TS 4.9+) checks that a value matches a type WITHOUT changing
    the inferred type. Unlike `as`, it keeps the NARROWEST possible type.

    Best of both worlds:
      - Type-checking at assignment time (like annotation)
      - Literal type preservation (like inference)
*/

type ColorMap = Record<string, string | number[]>;

// With type annotation — loses literal info
const colorsAnnotated: ColorMap = {
  red: "#FF0000",
  green: [0, 255, 0],
};
// colorsAnnotated.red is string | number[] — too wide

// With satisfies — checked AND narrow
const colors = {
  red: "#FF0000",
  green: [0, 255, 0],
} satisfies ColorMap;

colors.red.toUpperCase();    // works! TS knows red is a string
colors.green.map((c) => c);  // works! TS knows green is number[]

// Another example: config validation
type AppConfig = {
  port: number;
  host: string;
  features: string[];
};

const config = {
  port: 3000,
  host: "localhost",
  features: ["auth", "logging"],
} satisfies AppConfig;

// config.port is number (not string | number or any wider type)
// AND TS verified it matches AppConfig shape

//-----------------------------5-----------------------------
//-----------------------------Combining: extends + infer + satisfies-----------------------------

// A realistic middleware type system
type Middleware<TReq, TRes> = (req: TReq, res: TRes, next: () => void) => void;

type ExtractReq<T> = T extends Middleware<infer Req, unknown> ? Req : never;

type AuthRequest = { userId: string; token: string };
type AuthResponse = { send(data: string): void };

type AuthMiddleware = Middleware<AuthRequest, AuthResponse>;

type ReqType = ExtractReq<AuthMiddleware>; // { userId: string; token: string }

const authMiddleware = ((req, _res, next) => {
  console.log(`User: ${req.userId}`);
  next();
}) satisfies AuthMiddleware;
