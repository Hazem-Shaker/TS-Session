//-----------------------------1-----------------------------
//-----------------------------Generic Functions-----------------------------
/*
--> Generics let you write reusable code that works with ANY type
    while preserving type safety. Think of <T> as a type variable —
    the caller decides what T is.
*/

// Without generics — loses type info
function identityAny(value: any): any {
  return value;
}
const a = identityAny("hello"); // type: any — useless

// With generics — preserves the exact type
function identity<T>(value: T): T {
  return value;
}
const b = identity("hello");  // type: "hello" (literal)
const c = identity(42);       // type: 42
const d = identity<string>("hi"); // explicit: type is string

//-----------------------------2-----------------------------
//-----------------------------Generic with Arrays-----------------------------

function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

const first = getFirst([10, 20, 30]); // number | undefined
const firstStr = getFirst(["a", "b"]); // string | undefined

// Multiple type parameters
function merge<A, B>(obj1: A, obj2: B): A & B {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "Omar" }, { age: 25 });
console.log(merged.name, merged.age); // "Omar" 25

//-----------------------------3-----------------------------
//-----------------------------Generic Interfaces & Types-----------------------------

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

type UserData = { id: number; name: string };
type ProductData = { id: number; title: string; price: number };

const userRes: ApiResponse<UserData> = {
  data: { id: 1, name: "Sara" },
  status: 200,
  message: "OK",
};

const productRes: ApiResponse<ProductData> = {
  data: { id: 1, title: "Laptop", price: 999 },
  status: 200,
  message: "OK",
};

//-----------------------------4-----------------------------
//-----------------------------Generic Constraints (extends)-----------------------------
/*
--> Use `extends` to restrict what types T can be.
    This ensures T has certain properties or structure.
*/

interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(`Length: ${item.length}`);
}

logLength("hello");        // string has .length
logLength([1, 2, 3]);     // array has .length
logLength({ length: 10 }); // object with length property
// logLength(42);          // Error: number doesn't have .length

// Constraining to object keys
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Ali", age: 30, city: "Cairo" };
const personName = getProperty(person, "name"); // string
const personAge = getProperty(person, "age");   // number
// getProperty(person, "email");                 // Error: "email" not in keyof person

//-----------------------------5-----------------------------
//-----------------------------Default Generic Types-----------------------------

interface PaginatedResponse<T = unknown> {
  items: T[];
  page: number;
  totalPages: number;
}

// T defaults to unknown if not specified
const rawPage: PaginatedResponse = {
  items: [{ x: 1 }, { x: 2 }],
  page: 1,
  totalPages: 5,
};

// Or specify T explicitly
const userPage: PaginatedResponse<UserData> = {
  items: [{ id: 1, name: "Omar" }],
  page: 1,
  totalPages: 3,
};

//-----------------------------6-----------------------------
//-----------------------------Generic Classes-----------------------------

class DataStore<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  getAll(): readonly T[] {
    return this.items;
  }
}

const numStore = new DataStore<number>();
numStore.add(10);
numStore.add(20);
console.log(numStore.get(0)); // 10

const userStore = new DataStore<{ id: number; name: string }>();
userStore.add({ id: 1, name: "Nour" });
console.log(userStore.getAll()); // [{ id: 1, name: "Nour" }]
