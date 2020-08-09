# make-iterable

![npm](https://img.shields.io/npm/dt/@lopatnov/make-iterable)
[![NPM version](https://badge.fury.io/js/%40lopatnov%2Fmake-iterable.svg)](https://www.npmjs.com/package/@lopatnov/make-iterable)
[![License](https://img.shields.io/github/license/lopatnov/make-iterable)](https://github.com/lopatnov/make-iterable/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/lopatnov/make-iterable.png?branch=master)](https://travis-ci.org/lopatnov/make-iterable)
[![Twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F@lopatnov/make-iterable)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F@lopatnov/make-iterable)

How to make object as array? This TypeScript library makes objects as Array like and iterable. This change allows to iterate objects, functions and their prototypes. Making prototype iterable by this library allows to create iterable objects from classes.

## Install

[![https://nodei.co/npm/@lopatnov/make-iterable.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/@lopatnov/make-iterable.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/@lopatnov/make-iterable)

```shell
npm install @lopatnov/make-iterable
```

[Browser](//lopatnov.github.io/make-iterable/dist/make-iterable.js)

```html
<script src="//lopatnov.github.io/make-iterable/dist/make-iterable.min.js"></script>
```

## Import package to the project

### TypeScript

```typescript
import makeIterable from "@lopatnov/make-iterable";
```

### JavaScript

```javascript
var makeIterable = require("@lopatnov/make-iterable");
```

## Make Objects Iterable and Array-Like

### TypeScript usage of `makeIterable<T>(value: T): T & any[]`. Interaction with an object

```typescript
let x = {
  hello: "world"
};
let iterableX = makeIterable(x); // <-- now object iterableX has hello property and Array properties

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

### JavaScript usage of makeIterable. Interaction with function prototype.

```javascript
class Simple {
  constructor(message) {
    this.message = message;
  }
}

makeIterable(Simple.prototype); // <-- now Simple.prototype has Array properties

let z = new Simple('Length is not enumerable now');
z.push([1,2], [3,4], [5,6]);

for (var index in z) {
 console.log(`z[${index}]=${z[index]}`)
}
/*
"z[0]=1,2"
"z[1]=3,4"
"z[2]=5,6"
"z[message]=Length is not enumerable now"
*/
```

## Demo

See, how it's working: [https://runkit.com/lopatnov/make-iterable-demo-1.3.1](https://runkit.com/lopatnov/make-iterable-demo-1.3.1)

Test it with a runkit: [https://npm.runkit.com/@lopatnov/make-iterable](https://npm.runkit.com/@lopatnov/make-iterable)

## Rights and Agreements

License [Apache-2.0](https://github.com/lopatnov/make-iterable/blob/master/LICENSE)

Copyright 2019–2020 Oleksandr Lopatnov
