//-----------------------------1-----------------------------
//-----------------------------Basic Tuples-----------------------------
/*
--> A tuple is a fixed-length array where each element has a specific type.
    Unlike regular arrays, the ORDER and COUNT of types matter.
    Useful for representing structured pairs, triples, or records.
*/

let coordinates: [number, number] = [30.04, 31.24]; // [lat, lng]
let entry: [string, number] = ["age", 25];

// Accessing elements — TS knows the exact type at each index
const lat: number = coordinates[0];
const key: string = entry[0];

// Error examples
// coordinates = [30.04];            // Error: missing second element
// coordinates = [30.04, 31.24, 0];  // Error: too many elements
// entry = [25, "age"];              // Error: types are swapped

//-----------------------------2-----------------------------
//-----------------------------Named Tuples (Labels)-----------------------------
/*
--> You can label tuple elements for readability.
    Labels don't affect runtime behavior — they're purely for documentation.
*/

type GeoPoint = [lat: number, lng: number, alt?: number];

const cairo: GeoPoint = [30.04, 31.24];
const everest: GeoPoint = [27.98, 86.92, 8849];

//-----------------------------3-----------------------------
//-----------------------------Destructuring Tuples-----------------------------

type UserRecord = [id: number, name: string, isActive: boolean];

const record: UserRecord = [1, "Ahmed", true];
const [userId, userName, isActive] = record;
console.log(`${userName} (ID: ${userId}) — active: ${isActive}`);

// Common pattern: function returning multiple values
function divide(a: number, b: number): [result: number, remainder: number] {
  return [Math.floor(a / b), a % b];
}
const [quotient, remainder] = divide(17, 5);
console.log(`17 / 5 = ${quotient} remainder ${remainder}`); // 3 remainder 2

//-----------------------------4-----------------------------
//-----------------------------Rest Elements in Tuples-----------------------------
/*
--> Tuples can have rest elements (...Type[]) for variable-length tails.
    The fixed part is type-checked strictly, the rest is typed as an array.
*/

type LogEntry = [timestamp: string, level: string, ...messages: string[]];

const log1: LogEntry = ["2025-01-01", "INFO", "Server started"];
const log2: LogEntry = ["2025-01-01", "ERROR", "DB failed", "retrying", "attempt 3"];

//-----------------------------5-----------------------------
//-----------------------------Readonly Tuples-----------------------------

type Pixel = readonly [r: number, g: number, b: number];

const red: Pixel = [255, 0, 0];
// red[0] = 128; // Error: cannot assign to '0' because it is a read-only property

//-----------------------------6-----------------------------
//-----------------------------Real-World Pattern: useState-like return-----------------------------

function useState<T>(initial: T): [T, (newVal: T) => void] {
  let value = initial;
  const setter = (newVal: T) => {
    value = newVal;
    console.log("State updated to:", value);
  };
  return [value, setter];
}

const [count, setCount] = useState(0);
console.log(count);  // 0
setCount(5);         // "State updated to: 5"
