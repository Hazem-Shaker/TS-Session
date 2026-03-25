//-----------------------------1-----------------------------
//-----------------------------Readonly Properties-----------------------------
/*
--> The `readonly` modifier prevents reassignment of a property after creation.
    It's a compile-time check only — no runtime enforcement.
    Useful for config objects, IDs, and immutable data models.
*/

type User = {
  readonly id: number;
  name: string;
  email: string;
};

const user: User = { id: 1, name: "Omar", email: "omar@example.com" };
user.name = "Omar K."; // allowed — name is mutable
// user.id = 2;        // Error: cannot assign to 'id' because it is read-only

//-----------------------------2-----------------------------
//-----------------------------Readonly Arrays and Tuples-----------------------------
/*
--> `readonly` arrays prevent push, pop, splice, and index assignment.
    Two equivalent syntaxes:
      readonly Type[]
      ReadonlyArray<Type>
*/

const scores: readonly number[] = [95, 87, 73];
// scores.push(100);  // Error: push does not exist on readonly number[]
// scores[0] = 50;    // Error: index signature only permits reading

const names: ReadonlyArray<string> = ["Alice", "Bob"];
// names.pop();       // Error

// Readonly tuples
const point: readonly [number, number] = [10, 20];
// point[0] = 30;     // Error

//-----------------------------3-----------------------------
//-----------------------------Readonly<T> Utility Type-----------------------------
/*
--> Readonly<T> wraps all properties of T with `readonly`.
    Useful when you want an immutable version of an existing mutable type.
*/

type Config = {
  host: string;
  port: number;
  debug: boolean;
};

const devConfig: Config = { host: "localhost", port: 3000, debug: true };
devConfig.port = 8080; // allowed — Config is mutable

const prodConfig: Readonly<Config> = { host: "api.example.com", port: 443, debug: false };
// prodConfig.debug = true; // Error: readonly

// Practical pattern: mutable internal state, readonly public API
function createStore<T>(initial: T) {
  let state: T = { ...initial };

  return {
    getState(): Readonly<T> {
      return state;
    },
    setState(newState: T): void {
      state = { ...newState };
    },
  };
}

const store = createStore({ count: 0, label: "clicks" });
const s = store.getState();
console.log(s.count); // 0
// s.count = 5;       // Error: readonly

//-----------------------------4-----------------------------
//-----------------------------const Assertions (as const)-----------------------------
/*
--> `as const` makes a value deeply readonly AND narrows literal types.
    - Arrays become readonly tuples
    - Objects become readonly with literal property types
    - Strings become literal types instead of `string`
*/

// Without as const
const colors = ["red", "green", "blue"];       // string[]
const settings = { theme: "dark", fontSize: 14 }; // { theme: string; fontSize: number }

// With as const
const colorsConst = ["red", "green", "blue"] as const;
// readonly ["red", "green", "blue"] — exact literal types

const settingsConst = { theme: "dark", fontSize: 14 } as const;
// { readonly theme: "dark"; readonly fontSize: 14 }

// colorsConst.push("yellow");   // Error: push doesn't exist on readonly tuple
// settingsConst.theme = "light"; // Error: readonly

// Extracting a union type from a const array
const ROLES = ["admin", "editor", "viewer"] as const;
type Role = (typeof ROLES)[number]; // "admin" | "editor" | "viewer"

function assignRole(role: Role): void {
  console.log(`Assigned: ${role}`);
}
assignRole("admin");
// assignRole("superadmin"); // Error: not in the union
