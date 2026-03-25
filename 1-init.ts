//-----------------------------1-----------------------------
//------------------------------TypeScript Overview----------------------------
/*
--> Why TypeScript was created

1.JavaScript becomes hard to maintain in large projects.

2.Lack of static typing leads to runtime errors.

3.TypeScript adds static types to catch errors during development.

4.Improves readability, maintainability, and tooling (autocomplete, refactoring).

--> How TypeScript runs

1.TypeScript does not run directly in browsers or Node.js.

2.It is compiled to JavaScript using the TypeScript compiler (tsc).

3.The generated JavaScript runs in Node.js or browsers.

--> Versioning

1.TypeScript follows Semantic Versioning (SemVer): MAJOR.MINOR.PATCH.

2.Major → breaking changes.

3.Minor → new features without breaking existing code.

4.Patch → bug fixes and small improvements.
*/

//-----------------------------2-----------------------------
//------------------------------TypeScript init----------------------------
// npm i -y

// tsc --init
console.log('Hello, TypeScript!'); // run tsc to compile the ts file to js file

// delete the js files and then uncomment the outDir in tsconfig.json and run tsc again to see the output in dist folder

// tsc --watch or tsc -w to watch for changes and compile automatically or using nodemon to watch for changes and run the js file automatically

// to run the index write node dist/index.js, nodemon dist/index.js(package) or npx ts-node index.ts to run the ts file directly without compiling it to js file, but you need to have ts-node installed globally or as a dev dependency in your project

// npm i -D ts-node or npm i ts-node --save-dev to install ts-node and typescript as dev dependencies in your project
// npm i -D nodemon to install nodemon as a dev dependency in your project

// in modern ts node and ts you can just run node index.ts

// Dependencies vs Dev Dependencies
// Dependencies are packages that are required for the application to run in production, while dev dependencies are packages that are only required for development and testing purposes. For example, if you are building a web application, you might have dependencies like express or react, while you might have dev dependencies like typescript or jest.
// When you run npm install --production, only the dependencies will be installed, while the dev dependencies will be ignored.

//-----------------------------3-----------------------------
//-----------------------------TypeScript Compilation-----------------------------
// run this and see the compiled version with wait keyword in the dist folder
const greet = async () => {
  console.log('Hello TS');
};
greet();

// downgrade the target to es5 in tsconfig.json and see the compiled version in dist folder, you will see that the async function is transformed to a generator function and the await keyword is transformed to yield keyword, this is because async/await is not supported in es5 and it needs to be transformed to a compatible version of JavaScript that can run in older browsers or environments that do not support async/await.
// now you see awaiter instead of async/await

//-----------------------------4-----------------------------
//-----------------------------TypeScript Type Inference-----------------------------
let x = 5; // TypeScript infers the type of x as number based on the assigned value 5.
x = 'not a number';
console.log(x); // no errors in runtime

//-----------------------------5-----------------------------
//-----------------------------TypeScript Type Definitions-----------------------------
// @types packages are always in dev dependencies
// @types packages provide TypeScript type definitions for JavaScript libraries. They allow TypeScript to understand the types of the JavaScript libraries you are using, which can help catch errors and provide better autocompletion in your code editor. For example, if you are using the express library in your TypeScript project, you would install the @types/express package as a dev dependency to get type definitions for express. This way, when you use express in your TypeScript code, you will get type checking and autocompletion for express functions and objects.
// npm i -D @types/express to install the type definitions for express as a dev dependency in your project

// What is inside @types packages? Mostly .d.ts files (TypeScript declaration files).
// Why are they important?
// Without @types:
// import express from "express";

/*
const app = express();
TypeScript might treat it as any, meaning:
*/

//-----------------------------6-----------------------------
//-----------------------------run this so we will see d.ts file-----------------------------

// npm install @types/express -D
// you will find the express.d.ts file in node_modules/@types/express folder, this file contains the type definitions for express library, it defines the types of the functions and objects that are exported by the express library, so when you import express in your TypeScript code, you will get type checking and autocompletion for express functions and objects based on the definitions in the express.d.ts file.

//-----------------------------7-----------------------------
//-----------------------------module type in tsconfig.json-----------------------------
// Use commonjs if your project is mostly Node + old JS.
// Use nodenext if your project is mostly Node + modern JS (ESM).
// Use nodenext if you want to use ES modules in Node.js and take advantage of modern JavaScript features, while still maintaining compatibility with older JavaScript code. This is especially useful if you are working on a project that uses both modern and legacy JavaScript code, or if you want to use third-party libraries that are only available as ES modules. By using nodenext, you can ensure that your TypeScript code is compiled to a format that is compatible with both modern and older JavaScript environments, while still allowing you to take advantage of the latest features of JavaScript.
