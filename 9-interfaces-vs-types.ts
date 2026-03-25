//-----------------------------1-----------------------------
//-----------------------------Interfaces: Basics-----------------------------
/*
--> Interfaces define the shape of objects.
    They describe WHAT an object looks like, not how it's implemented.
*/

interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // optional
}

const user1: User = { id: 1, name: "Omar", email: "omar@example.com" };

//-----------------------------2-----------------------------
//-----------------------------Types: Basics-----------------------------
/*
--> `type` aliases can describe objects (same as interface) but also
    primitives, unions, tuples, functions — anything.
*/

type Product = {
  id: number;
  title: string;
  price: number;
};

type ID = string | number;            // union — interface can't do this
type Pair = [string, number];          // tuple — interface can't do this
type Callback = (data: string) => void; // function — interface can't do this

//-----------------------------3-----------------------------
//-----------------------------Extending (Inheritance)-----------------------------

// Interface extends interface
interface Animal {
  name: string;
  sound(): string;
}

interface Pet extends Animal {
  owner: string;
}

const cat: Pet = { name: "Milo", sound: () => "Meow", owner: "Sara" };

// Type intersection (equivalent of extends)
type AnimalType = { name: string; sound(): string };
type PetType = AnimalType & { owner: string };

const dog: PetType = { name: "Rex", sound: () => "Woof", owner: "Ali" };

// Interface extending a type — works
interface ServiceDog extends AnimalType {
  task: string;
}

//-----------------------------4-----------------------------
//-----------------------------Declaration Merging (Interface Only)-----------------------------
/*
--> Interfaces with the same name in the same scope are MERGED automatically.
    This is powerful for extending third-party types or global types.
    Types CANNOT merge — duplicate type names cause an error.
*/

interface AppConfig {
  apiUrl: string;
}

interface AppConfig {
  timeout: number;
}

// Merged result: { apiUrl: string; timeout: number }
const config: AppConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};

// type AppConfig = { apiUrl: string }; // Error if uncommented: duplicate identifier

//-----------------------------5-----------------------------
//-----------------------------implements (Class Contract)-----------------------------
/*
--> Both interfaces and types can be used with `implements` in classes.
    `implements` ensures a class satisfies a contract at compile time.
*/

interface Logger {
  log(message: string): void;
  level: string;
}

class ConsoleLogger implements Logger {
  level: string;

  constructor(level: string) {
    this.level = level;
  }

  log(message: string): void {
    console.log(`[${this.level}] ${message}`);
  }
}

const logger = new ConsoleLogger("INFO");
logger.log("Server started"); // [INFO] Server started

// implements with a type alias works too
type Serializable = {
  serialize(): string;
};

class UserModel implements Serializable {
  constructor(public name: string, public age: number) {}

  serialize(): string {
    return JSON.stringify({ name: this.name, age: this.age });
  }
}

//-----------------------------6-----------------------------
//-----------------------------When to Use Which?-----------------------------
/*
  | Feature                    | interface | type |
  |----------------------------|-----------|------|
  | Object shapes              |    ✅     |  ✅  |
  | Extends / inheritance      |    ✅     |  ✅ (via &)  |
  | Declaration merging        |    ✅     |  ❌  |
  | Unions, tuples, primitives |    ❌     |  ✅  |
  | implements in classes      |    ✅     |  ✅  |
  | Computed / mapped types    |    ❌     |  ✅  |

  Rule of thumb:
  - Use `interface` for public APIs and object contracts (merging, extends).
  - Use `type` for unions, tuples, mapped types, or anything beyond objects.
  - For simple objects, either works — pick one and be consistent.
*/
