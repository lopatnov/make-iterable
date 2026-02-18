import { describe, it } from "node:test";
import assert from "node:assert/strict";
import makeIterable from "../src/make-iterable";

describe("Base tests", () => {
  it("should extend the value", () => {
    const x = {},
      iterableX = makeIterable(x);
    assert.strictEqual(iterableX, x);
  });
  it("should save all methods", () => {
    const say = () => "who",
      x = {
        hello: "world",
        say: say,
      },
      iterableX = makeIterable(x);
    assert.strictEqual(iterableX.hello, x.hello);
    assert.strictEqual(iterableX.say, x.say);
    assert.strictEqual(x.hello, "world");
    assert.strictEqual(x.say, say);
  });
});

describe("Array tests", () => {
  it("should have push and pop methods", () => {
    const x = {},
      iterableX = makeIterable(x);
    assert.notStrictEqual(iterableX.push, undefined);
    assert.notStrictEqual(iterableX.pop, undefined);
  });
  it("should convert function", () => {
    const x = function () {},
      iterableX = makeIterable(x);
    assert.strictEqual(iterableX.push(1, 2, 3, 4, 5), 5);
    assert.strictEqual(iterableX.indexOf(3), 2);
    assert.strictEqual(iterableX[1], 2);
  });
});

describe("Iterator tests", () => {
  it("should convert to iterator", () => {
    const x = {},
      iterableX = makeIterable(x);
    iterableX.push(10);
    iterableX.push(20);
    iterableX.push(30);
    iterableX.push(40);

    const actual = [...iterableX];
    assert.strictEqual(actual[0], 10);
    assert.strictEqual(actual[1], 20);
    assert.strictEqual(actual[2], 30);
    assert.strictEqual(actual[3], 40);
  });
});

describe("Function prototype tests", () => {
  it("should work with instances of the function, not with prototype", () => {
    const TestConstructorFunction = function (this: any, a: any, b: any) {
      this.a = a;
      this.b = b;
    };
    makeIterable(TestConstructorFunction.prototype);

    const x = new (TestConstructorFunction as any)(1, 2);
    const y = new (TestConstructorFunction as any)(3, 4);
    x.push(10, 20, 30, 40, 50);
    y.push("hello", "world");

    const actual1 = [...x];
    const actual2 = [...y];
    assert.strictEqual(x[0], 10);
    assert.strictEqual(actual1[1], 20);
    assert.strictEqual(y[0], "hello");
    assert.strictEqual(actual2[1], "world");
    assert.strictEqual(x.length, 5);
    assert.strictEqual(y.length, 2);
    assert.strictEqual(x.a, 1);
    assert.strictEqual(y.a, 3);
  });
  it("should work with classes prototype", () => {
    class Sample {
      static count = 0;
      message: string;

      constructor(message: string) {
        Sample.count++;
        this.message = message;
      }
    }

    makeIterable(Sample.prototype);

    const x = new Sample("Hello world") as Sample & any[];
    const y = new Sample("It working!") as Sample & any[];
    x.push(true, false, true, true, false, true, false, true);
    y.push("hello", "world", "!");

    const actual1 = [...x];
    const actual2 = [...y];
    assert.strictEqual(x[0], true);
    assert.strictEqual(y[0], "hello");
    assert.strictEqual(actual1[1], false);
    assert.strictEqual(actual2[1], "world");
    assert.strictEqual(x.length, 8);
    assert.strictEqual(y.length, 3);
    assert.strictEqual(Sample.count, 2);
    assert.strictEqual(x.message, "Hello world");
    assert.strictEqual(y.message, "It working!");
  });
});
