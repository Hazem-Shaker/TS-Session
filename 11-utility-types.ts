//-----------------------------1-----------------------------
//-----------------------------Partial<T>-----------------------------
/*
--> Makes ALL properties of T optional.
    Common use: update functions where you only patch some fields.
*/

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

const original: User = { id: 1, name: "Omar", email: "omar@ex.com", age: 25 };
const updated = updateUser(original, { name: "Omar K.", age: 26 });
console.log(updated); // { id: 1, name: "Omar K.", email: "omar@ex.com", age: 26 }

//-----------------------------2-----------------------------
//-----------------------------Required<T>-----------------------------
/*
--> Opposite of Partial — makes ALL properties required.
    Useful when a type has optional fields but you need a complete version.
*/

interface FormInput {
  name?: string;
  email?: string;
  phone?: string;
}

type CompleteForm = Required<FormInput>;
// { name: string; email: string; phone: string } — all required now

const form: CompleteForm = {
  name: "Sara",
  email: "sara@ex.com",
  phone: "+201234567890",
};

//-----------------------------3-----------------------------
//-----------------------------Pick<T, Keys>-----------------------------
/*
--> Creates a type with ONLY the selected properties from T.
    Useful for creating sub-views or DTOs from a larger model.
*/

type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }

const preview: UserPreview = { id: 1, name: "Ali" };

// Real-world: API response that only returns certain fields
type UserListItem = Pick<User, "id" | "name" | "email">;

function renderList(users: UserListItem[]): void {
  users.forEach((u) => console.log(`${u.name} <${u.email}>`));
}

//-----------------------------4-----------------------------
//-----------------------------Omit<T, Keys>-----------------------------
/*
--> Creates a type with all properties EXCEPT the omitted ones.
    Opposite of Pick — useful for removing sensitive or internal fields.
*/

type PublicUser = Omit<User, "email">;
// { id: number; name: string; age: number }

type CreateUserDTO = Omit<User, "id">;
// { name: string; email: string; age: number } — id is auto-generated

function createUser(dto: CreateUserDTO): User {
  return { id: Date.now(), ...dto };
}
const newUser = createUser({ name: "Nour", email: "nour@ex.com", age: 22 });

//-----------------------------5-----------------------------
//-----------------------------Record<Keys, Type>-----------------------------
/*
--> Creates an object type with specified keys, all having the same value type.
    Great for dictionaries, lookup maps, and indexed structures.
*/

type Role = "admin" | "editor" | "viewer";

const rolePermissions: Record<Role, string[]> = {
  admin: ["read", "write", "delete", "manage"],
  editor: ["read", "write"],
  viewer: ["read"],
};

// Dynamic key maps
type StatusMap = Record<number, string>;
const httpStatus: StatusMap = {
  200: "OK",
  404: "Not Found",
  500: "Server Error",
};

//-----------------------------6-----------------------------
//-----------------------------ReturnType<T> & Parameters<T>-----------------------------
/*
--> ReturnType<T> extracts the return type of a function type.
--> Parameters<T> extracts the parameter types as a tuple.
    Useful when you need to reuse types from functions you don't control.
*/

function fetchUser(id: number): Promise<{ name: string; email: string }> {
  return Promise.resolve({ name: "Sara", email: "sara@ex.com" });
}

type FetchUserReturn = ReturnType<typeof fetchUser>;
// Promise<{ name: string; email: string }>

type FetchUserParams = Parameters<typeof fetchUser>;
// [id: number]

// Practical: wrapping a function with the same signature
function cachedFetchUser(...args: Parameters<typeof fetchUser>): ReturnType<typeof fetchUser> {
  console.log("Cache check for ID:", args[0]);
  return fetchUser(...args);
}

//-----------------------------7-----------------------------
//-----------------------------Exclude<T, U> & Extract<T, U>-----------------------------
/*
--> Exclude: removes types from a union that are assignable to U.
--> Extract: keeps only types from a union that are assignable to U.
*/

type AllEvents = "click" | "scroll" | "mousemove" | "keydown" | "keyup";

type MouseEvents = Extract<AllEvents, "click" | "scroll" | "mousemove">;
// "click" | "scroll" | "mousemove"

type KeyboardEvents = Exclude<AllEvents, "click" | "scroll" | "mousemove">;
// "keydown" | "keyup"

//-----------------------------8-----------------------------
//-----------------------------NonNullable<T>-----------------------------

type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string

function greet(name: DefiniteString): string {
  return `Hello, ${name}`;
}
// greet(null); // Error
