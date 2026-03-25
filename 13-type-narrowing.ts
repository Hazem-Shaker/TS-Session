//-----------------------------1-----------------------------
//-----------------------------typeof Guard-----------------------------
/*
--> Type narrowing = refining a broad type to a more specific one inside a block.
--> `typeof` works for primitives: "string", "number", "boolean",
    "undefined", "object", "function", "symbol", "bigint".
*/

function formatValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value.toUpperCase(); // TS knows: string
  }
  if (typeof value === "number") {
    return value.toFixed(2); // TS knows: number
  }
  return value ? "Yes" : "No"; // TS knows: boolean
}

console.log(formatValue("hello")); // "HELLO"
console.log(formatValue(3.14159)); // "3.14"
console.log(formatValue(true));    // "Yes"

//-----------------------------2-----------------------------
//-----------------------------instanceof Guard-----------------------------
/*
--> `instanceof` checks the prototype chain.
    Works with classes, Error subtypes, built-in objects (Date, RegExp, etc.).
*/

class ValidationError {
  constructor(public field: string, public message: string) {}
}

class NetworkError {
  constructor(public statusCode: number, public url: string) {}
}

function handleError(error: ValidationError | NetworkError): string {
  if (error instanceof ValidationError) {
    return `Validation failed on "${error.field}": ${error.message}`;
  }
  return `Network error ${error.statusCode} at ${error.url}`;
}

console.log(handleError(new ValidationError("email", "Invalid format")));
console.log(handleError(new NetworkError(404, "/api/users")));

//-----------------------------3-----------------------------
//-----------------------------in Operator Guard-----------------------------
/*
--> The `in` operator checks if a property exists on an object.
    Useful when you can't use instanceof (plain objects, API responses).
*/

type Fish = { swim: () => void; name: string };
type Bird = { fly: () => void; name: string };
type Animal = Fish | Bird;

function move(animal: Animal): string {
  if ("swim" in animal) {
    animal.swim(); // TS knows: Fish
    return `${animal.name} is swimming`;
  }
  animal.fly(); // TS knows: Bird
  return `${animal.name} is flying`;
}

const fish: Fish = { name: "Nemo", swim: () => {} };
const bird: Bird = { name: "Tweety", fly: () => {} };
console.log(move(fish)); // "Nemo is swimming"
console.log(move(bird)); // "Tweety is flying"

//-----------------------------4-----------------------------
//-----------------------------Discriminated Union Narrowing-----------------------------
/*
--> A shared literal property (the "discriminant") lets TS narrow automatically
    in switch/if. This is the cleanest narrowing pattern for object unions.
*/

type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Triangle = { kind: "triangle"; base: number; height: number };
type Shape = Circle | Rectangle | Triangle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

console.log(area({ kind: "circle", radius: 5 }));              // 78.54
console.log(area({ kind: "rectangle", width: 10, height: 4 })); // 40
console.log(area({ kind: "triangle", base: 6, height: 3 }));    // 9

//-----------------------------5-----------------------------
//-----------------------------Custom Type Guards (is keyword)-----------------------------
/*
--> A type guard is a function whose return type is `param is Type`.
    When it returns true, TS narrows the variable in the calling scope.
    Use when typeof/instanceof/in aren't enough (complex validation).
*/

type User = { kind: "user"; name: string; email: string };
type Admin = { kind: "admin"; name: string; permissions: string[] };
type Account = User | Admin;

function isAdmin(account: Account): account is Admin {
  return account.kind === "admin";
}

function showDashboard(account: Account): string {
  if (isAdmin(account)) {
    return `Admin ${account.name}: [${account.permissions.join(", ")}]`;
  }
  return `User ${account.name}: ${account.email}`;
}

console.log(showDashboard({ kind: "admin", name: "Omar", permissions: ["manage", "delete"] }));
console.log(showDashboard({ kind: "user", name: "Sara", email: "sara@ex.com" }));

// Validating unknown data from an API
function isUserArray(data: unknown): data is User[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "kind" in item &&
        item.kind === "user" &&
        "name" in item &&
        "email" in item
    )
  );
}

const raw: unknown = JSON.parse('[{"kind":"user","name":"Ali","email":"ali@ex.com"}]');
if (isUserArray(raw)) {
  raw.forEach((u) => console.log(u.name)); // TS knows: User[]
}

//-----------------------------6-----------------------------
//-----------------------------Truthiness Narrowing-----------------------------
/*
--> Checking a value in an if/ternary eliminates null, undefined, 0, "", and false.
    Simple but effective for optional values.
*/

function greet(name?: string | null): string {
  if (name) {
    return `Hello, ${name.toUpperCase()}`; // TS knows: string (non-nullish)
  }
  return "Hello, guest";
}

// Nullish coalescing (??) and optional chaining (?.) also help
type Profile = { bio?: string; avatar?: { url: string } };

function displayProfile(p: Profile): string {
  const bio = p.bio ?? "No bio provided";
  const avatarUrl = p.avatar?.url ?? "/default-avatar.png";
  return `${bio} | ${avatarUrl}`;
}
