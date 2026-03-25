//-----------------------------1-----------------------------
//-----------------------------Basic Union Types-----------------------------
/*
--> A union type allows a variable to hold one of several types.
    Syntax: Type1 | Type2 | Type3
    TS will only let you use operations common to ALL types in the union,
    unless you narrow the type first.
*/

let id: string | number;
id = "abc-123";
id = 42;
// id = true; // Error: boolean is not assignable to string | number

// You can only access shared members without narrowing
function printId(id: string | number): void {
  // id.toUpperCase(); // Error — toUpperCase doesn't exist on number
  console.log(`ID: ${id.toString()}`); // toString exists on both
}

//-----------------------------2-----------------------------
//-----------------------------Literal Types-----------------------------
/*
--> Literal types restrict a variable to an exact value, not just a type.
    Often combined with unions to create a fixed set of allowed values.
*/

let direction: "north" | "south" | "east" | "west";
direction = "north";
// direction = "up"; // Error: "up" is not assignable

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function sendRequest(url: string, method: HttpMethod): void {
  console.log(`${method} ${url}`);
}
sendRequest("/api/users", "GET");
// sendRequest("/api/users", "PATCH"); // Error

// Numeric literals work too
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceRoll = 3;

//-----------------------------3-----------------------------
//-----------------------------Unions with Objects-----------------------------

type SuccessResponse = { status: "success"; data: string[] };
type ErrorResponse = { status: "error"; message: string };
type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(res: ApiResponse): void {
  if (res.status === "success") {
    console.log("Data:", res.data); // TS narrows to SuccessResponse
  } else {
    console.log("Error:", res.message); // TS narrows to ErrorResponse
  }
}

//-----------------------------4-----------------------------
//-----------------------------Discriminated Unions-----------------------------
/*
--> A discriminated union is a pattern where each type in the union has a
    common literal property (the "discriminant") that TS can use to narrow.
    Best practice for modeling state, events, or API results.
*/

type LoadingState = { state: "loading" };
type SuccessState = { state: "success"; data: string[] };
type ErrorState = { state: "error"; error: string };
type RequestState = LoadingState | SuccessState | ErrorState;

function renderUI(req: RequestState): string {
  switch (req.state) {
    case "loading":
      return "Loading...";
    case "success":
      return `Items: ${req.data.join(", ")}`;
    case "error":
      return `Error: ${req.error}`;
  }
}

console.log(renderUI({ state: "success", data: ["item1", "item2"] }));

//-----------------------------5-----------------------------
//-----------------------------Intersection vs Union-----------------------------
/*
--> Union (A | B): the value is A OR B — you get the SHARED members.
--> Intersection (A & B): the value is A AND B — you get ALL members from both.
*/

type HasName = { name: string };
type HasAge = { age: number };

type Person = HasName & HasAge; // must have both name AND age
const person: Person = { name: "Omar", age: 24 };

type NameOrAge = HasName | HasAge; // must have name OR age (or both)
const partial1: NameOrAge = { name: "Ali" };
const partial2: NameOrAge = { age: 30 };
