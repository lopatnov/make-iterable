# make-iterable

[![NPM version](https://badge.fury.io/js/%40lopatnov%2Fmake-iterable.svg)](https://www.npmjs.com/package/@lopatnov/make-iterable)
[![License](https://img.shields.io/github/license/lopatnov/make-iterable)](https://github.com/lopatnov/make-iterable/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/lopatnov/make-iterable.png?branch=master)](https://travis-ci.org/lopatnov/make-iterable)
[![Twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F@lopatnov/make-iterable)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F@lopatnov/make-iterable)

This TypeScript library makes objects as Array like and iterable.

# Install

[![https://nodei.co/npm/@lopatnov/make-iterable.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/@lopatnov/make-iterable.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/@lopatnov/make-iterable)

```shell
npm install @lopatnov/make-iterable
```

[Browser](//lopatnov.github.io/make-iterable/dist/make-iterable.js)

```html
<script src="//lopatnov.github.io/make-iterable/dist/make-iterable.min.js"></script>
```

## Import package to the project

TypeScript:

```typescript
import makeIterable from "@lopatnov/make-iterable";
```

or JavaScript:

```javascript
var makeIterable = require("@lopatnov/make-iterable");
```

## Make Iterable

**makeIterable<T>(value: T): T | any[]**

```typescript
let x = {
  hello: "world"
};
let iterableX = makeIterable(x);

iterableX.push(10);
iterableX.push(20);
iterableX.push(30);
iterableX.push(40);
iterableX.pop();

console.log(`x === iterableX ? ${x === iterableX}`); // true
console.log(`indexOf(30) = ${iterableX.indexOf(30)}`); // 2
console.log(`[...iterableX] = ${[...iterableX]}`); // [10,20,30]
console.log(`iterableX.hello = ${iterableX.hello}`); // "world"
```

From v.1.1.0 it works with Function prototype like:

```typescript
class Sample {
  static count = 0;
  message: string;

  constructor(message: string) {
    Sample.count++;
    this.message = message;
  }
}

makeIterable(Sample.prototype);

let x = new Sample("Hello world") as Sample & any[];
let y = new Sample("It working!") as Sample & any[];
x.push(true, false, true, true, false, true, false, true);
y.push("hello", "world", "!");

console.log(Sample.count); // 2
console.log([...x]); // true, false, true, true, false, true, false, true
console.log([...y]); // "hello", "world", "!"
console.log(x.message); // Hello world
console.log(y.message); // It working!
```

# Demo

See, how it's working: [https://runkit.com/lopatnov/make-iterable-demo](https://runkit.com/lopatnov/make-iterable-demo)

Test it with a runkit: [https://npm.runkit.com/@lopatnov/make-iterable](https://npm.runkit.com/@lopatnov/make-iterable)

# Rights and Agreements

License [Apache-2.0](https://github.com/lopatnov/make-iterable/blob/master/LICENSE)

Copyright 2019 Oleksandr Lopatnov
