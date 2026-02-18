# make-iterable

[![npm](https://img.shields.io/npm/dt/@lopatnov/make-iterable)](https://www.npmjs.com/package/@lopatnov/make-iterable)
[![NPM version](https://badge.fury.io/js/%40lopatnov%2Fmake-iterable.svg)](https://www.npmjs.com/package/@lopatnov/make-iterable)
[![License](https://img.shields.io/github/license/lopatnov/make-iterable)](https://github.com/lopatnov/make-iterable/blob/master/LICENSE)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
[![GitHub stars](https://img.shields.io/github/stars/lopatnov/make-iterable)](https://github.com/lopatnov/make-iterable/stargazers)

A TypeScript library that converts objects, functions, and their prototypes into Array-like iterable entities. Apply it to a class prototype and every instance becomes iterable automatically.

## Installation

```shell
npm install @lopatnov/make-iterable
```

Browser (CDN):

```html
<script src="//lopatnov.github.io/make-iterable/dist/make-iterable.umd.min.js"></script>
```

## Usage

### ES Modules

```typescript
import makeIterable from "@lopatnov/make-iterable";
```

### CommonJS

```javascript
const makeIterable = require("@lopatnov/make-iterable");
```

### Browser / UMD

```html
<script src="make-iterable.umd.min.js"></script>
<script>
  // available as window.makeIterable
  var x = makeIterable({});
</script>
```

## API

```typescript
function makeIterable<T>(value: T): T & Array<any>;
```

Converts `value` to an Array-like iterable object **in place** and returns it. The original object reference is preserved — `value === makeIterable(value)`.

The function attaches all `Array.prototype` methods (`push`, `pop`, `splice`, `slice`, `indexOf`, `map`, `filter`, `forEach`, etc.) and implements `Symbol.iterator`, enabling `for...of` loops and the spread operator.

**Throws** `Error` when `value` is `undefined`, `null`, a `boolean`, a `number`, or a `string`.

## Examples

### Make an Object Iterable and Array-Like

```typescript
let x = { hello: "world" };
let iterableX = makeIterable(x);

iterableX.push(10); // [10]
iterableX.push(20); // [10, 20]
iterableX.push(30); // [10, 20, 30]
iterableX.push(40); // [10, 20, 30, 40]
iterableX.pop(); // [10, 20, 30]

for (const index in x) {
  console.log(`Index [${index}] = ${x[index]}`);
  // "Index [0] = 10"
  // "Index [1] = 20"
  // "Index [2] = 30"
  // "Index [hello] = world"
}

for (const value of x) {
  console.log(value); // 10, 20, 30
}

console.log(x === iterableX); // true
console.log(iterableX.indexOf(30)); // 2
console.log([...iterableX]); // [10, 20, 30]
console.log(iterableX.hello); // "world"
```

### Make a Class Iterable via Prototype

```typescript
class Simple {
  constructor(public message: string) {}
}

makeIterable(Simple.prototype);

let z = new Simple("Length is not enumerable now") as Simple & any[];
z.push([1, 2], [3, 4], [5, 6]);

for (const index in z) {
  console.log(`z[${index}]=${z[index]}`);
  // "z[0]=1,2"
  // "z[1]=3,4"
  // "z[2]=5,6"
  // "z[message]=Length is not enumerable now"
}
```

### Make a Function Iterable

```typescript
const fn = function () {};
const iterableFn = makeIterable(fn);

iterableFn.push(1, 2, 3, 4, 5);
console.log(iterableFn.indexOf(3)); // 2
console.log([...iterableFn]); // [1, 2, 3, 4, 5]
```

## Demo

- [RunKit demo](https://runkit.com/lopatnov/make-iterable-demo-1.3.1)
- [Interactive playground](https://npm.runkit.com/@lopatnov/make-iterable)

## Contributing

Feel free to open issues or pull requests at [GitHub](https://github.com/lopatnov/make-iterable/issues). See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

[Apache-2.0](https://github.com/lopatnov/make-iterable/blob/master/LICENSE)

Copyright 2019–2026 Oleksandr Lopatnov

[![LinkedIn](https://img.shields.io/badge/LinkedIn-lopatnov-informational?style=social&logo=linkedin)](https://www.linkedin.com/in/lopatnov/)
