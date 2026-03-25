//-----------------------------1-----------------------------
//-----------------------------Basic Type Aliases-----------------------------
/*
--> The `type` keyword creates aliases — custom names for any type.
    Aliases don't create new types; they're just convenient references.
    Use them to avoid repetition and improve readability.
*/

type ID = string | number;
type Username = string;

let userId: ID = 'abc-123';
let adminId: ID = 42;
let name1: Username = 'Omar';

//-----------------------------2-----------------------------
//-----------------------------Object Type Aliases-----------------------------

type User = {
  id: ID;
  name: string;
  email: string;
  age?: number; // optional
};

const user: User = {
  id: 1,
  name: 'Sara',
  email: 'sara@example.com',
};

// Nested objects
type Address = {
  street: string;
  city: string;
  zip: string;
};

type Customer = {
  user: User;
  address: Address;
  loyaltyPoints: number;
};

const customer: Customer = {
  user: { id: 2, name: 'Ali', email: 'ali@example.com' },
  address: { street: 'Tahrir St', city: 'Cairo', zip: '11511' },
  loyaltyPoints: 250,
};

//-----------------------------3-----------------------------
//-----------------------------Function Type Aliases-----------------------------

type Formatter = (input: string) => string;

const toUpper: Formatter = (input) => input.toUpperCase();
const addPrefix: Formatter = (input) => `>> ${input}`;

console.log(toUpper('hello')); // "HELLO"
console.log(addPrefix('hello')); // ">> hello"

// Function type with generics
type Mapper<T, U> = (item: T) => U;

const stringToLength: Mapper<string, number> = (s) => s.length;
console.log(stringToLength('TypeScript')); // 10

//-----------------------------4-----------------------------
//-----------------------------Union & Intersection Aliases-----------------------------

type StringOrNumber = string | number;
type Nullable<T> = T | null;

let score: Nullable<number> = 95;
score = null; // allowed

// Intersection: combine multiple types into one
type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

type Post = {
  title: string;
  body: string;
};

type BlogPost = Post & Timestamps;

const post: BlogPost = {
  title: 'TS Aliases',
  body: 'Type aliases simplify complex types.',
  createdAt: new Date(),
  updatedAt: new Date(),
};

//-----------------------------5-----------------------------
//-----------------------------Template Literal Types-----------------------------
/*
--> `type` can define string patterns using template literals.
    Useful for constraining string formats at the type level.
*/

type HexColor = `#${string}`;
let primary: HexColor = '#FF5733';
// let bad: HexColor = "red"; // Error: doesn't match pattern

type EventName = `on${string}`;
let handler: EventName = 'onClick';
// let invalid: EventName = "click"; // Error

// Combining literals
type HTTPEndpoint = `/${'users' | 'posts' | 'comments'}`;
let endpoint: HTTPEndpoint = '/users';
// let wrong: HTTPEndpoint = "/orders"; // Error

//-----------------------------6-----------------------------
//-----------------------------Index Signatures-----------------------------
/*
--> When you don't know exact property names ahead of time,
    use index signatures to describe the shape of dynamic keys.
*/

type Dictionary = {
  [key: string]: string;
};

const translations: Dictionary = {
  hello: 'مرحبا',
  goodbye: 'مع السلامة',
};

type NumberMap = {
  [key: string]: number;
  length: number; // you can mix known props with index signatures
};

const data: NumberMap = {
  length: 3,
  x: 10,
  y: 20,
};
