# make-iterable [![Twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F@lopatnov/make-iterable)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F@lopatnov/make-iterable)

[![npm](https://img.shields.io/npm/dt/@lopatnov/make-iterable)](https://www.npmjs.com/package/@lopatnov/make-iterable)
[![NPM version](https://badge.fury.io/js/%40lopatnov%2Fmake-iterable.svg)](https://www.npmjs.com/package/@lopatnov/make-iterable)
[![License](https://img.shields.io/github/license/lopatnov/make-iterable)](https://github.com/lopatnov/make-iterable/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/lopatnov/make-iterable)](https://github.com/lopatnov/make-iterable/issues)
[![GitHub forks](https://img.shields.io/github/forks/lopatnov/make-iterable)](https://github.com/lopatnov/make-iterable/network)
[![GitHub stars](https://img.shields.io/github/stars/lopatnov/make-iterable)](https://github.com/lopatnov/make-iterable/stargazers)
![GitHub top language](https://img.shields.io/github/languages/top/lopatnov/make-iterable)

[![Patreon](https://img.shields.io/badge/Donate-Patreon-informational)](https://www.patreon.com/lopatnov)
[![sobe.ru](https://img.shields.io/static/v1?label=sobe.ru&message=%D0%91%D0%BB%D0%B0%D0%B3%D0%BE%D0%B4%D0%B0%D1%80%D0%BD%D0%BE%D1%81%D1%82%D1%8C&color=yellow&logo=data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAArlBMVEUAAAD//////////////////////////////////////////////////////////////////PP/3l7/9c//0yb/zAD/6ZP/zQf/++7/3FD/88X/0h7//v7/5oX/zATUqQDktgD/5HjQpgAFBACQcwD/zw/fsgCOcQD6yADZrQD2xAD8yQDnuADxwADcsADbrwDpugD3xQD5xwDjtQDywQD+ywD9ygDvvwD7yAD/1jRaObVGAAAAEHRSTlMAA3zg707pEJP8MMUBYN5fiwXJMQAAAAFiS0dEAf8CLd4AAAAHdElNRQflBgMAAxO4O2jCAAAAuElEQVQoz42S1w7CMAxFS8ueYZgNLZuyRynw/z9GdtxIkbgPceQT6Tq2vZwfEKx8wRPyiaViSYDABqQsAMq0OzxUqhbo9kBcavUM6A9AAtJAYDgC0ID7i+t4AghwfxanszlAGBnA/Flc0MfL1doA5s/ChoLtbg8QI392gpIBzf/AwYAWAsdTrIE05/nz5Xq7S6DKpenHM0pe+o/qg5Am74/0ybTkm+q6wG4iltV2LTko52idy+Banx9RYiS6Vrsc3AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNi0wM1QwMDowMzoxOCswMDowMLvSSCkAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDYtMDNUMDA6MDM6MTgrMDA6MDDKj/CVAAAAAElFTkSuQmCC)](https://sobe.ru/na/tech_knigi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-lopatnov-informational?style=social&logo=linkedin)](https://www.linkedin.com/in/lopatnov/)

[![Build Status](https://travis-ci.org/lopatnov/make-iterable.png?branch=master)](https://travis-ci.org/lopatnov/make-iterable)
[![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/@lopatnov/make-iterable)](https://www.npmjs.com/package/@lopatnov/make-iterable?activeTab=dependencies)

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

## Usage of `makeIterable<T>(value: T): T & any[]`

Apply `makeIterable` method to an object, function or it's prototype and use [Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

### Make an Object Iterable and Array-Like

```typescript
let x = {
  hello: "world"
};
let iterableX = makeIterable(x); // <-- now object iterableX has hello property and Array properties

iterableX.push(10); // [10]
iterableX.push(20); // [10, 20]
iterableX.push(30); // [10, 20, 30]
iterableX.push(40); // [10, 20, 30, 40]
iterableX.pop(); // [10, 20, 30]

for (const index in x) {
    /*
    "Index [0] = 10"
    "Index [1] = 20"
    "Index [2] = 30"
    "Index [hello] = world"
    */
    console.log(`Index [${index}] = ${x[index]}`);
}

for (const value of x) {
    /*
    10
    20
    30
    */
    console.log(value)
}

console.log(`x === iterableX ? ${x === iterableX}`); // true
console.log(`indexOf(30) = ${iterableX.indexOf(30)}`); // 2
console.log(`[...iterableX] = ${[...iterableX]}`); // [10,20,30]
console.log(`iterableX.hello = ${iterableX.hello}`); // "world"
```

### Interaction with function prototype

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
  /*
  "z[0]=1,2"
  "z[1]=3,4"
  "z[2]=5,6"
  "z[message]=Length is not enumerable now"
  */
  console.log(`z[${index}]=${z[index]}`)
}
```

## Demo

See, how it's working: [https://runkit.com/lopatnov/make-iterable-demo-1.3.1](https://runkit.com/lopatnov/make-iterable-demo-1.3.1)

Test it with a runkit: [https://npm.runkit.com/@lopatnov/make-iterable](https://npm.runkit.com/@lopatnov/make-iterable)

## Rights and Agreements

License [Apache-2.0](https://github.com/lopatnov/make-iterable/blob/master/LICENSE)

Copyright 2019–2021 Oleksandr Lopatnov
