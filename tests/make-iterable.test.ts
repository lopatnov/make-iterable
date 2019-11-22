import makeIterable from "../src/make-iterable";

describe("Base tests", () => {
  it("should extend the value", () => {
    let x = {},
      iterableX = makeIterable(x);
    expect(iterableX).toBe(x);
  });
  it("should save all methods", () => {
    let say = () => "who",
      x = {
        hello: "world",
        say: say
      },
      iterableX = makeIterable(x);
    expect(iterableX.hello).toBe(x.hello);
    expect(iterableX.say).toBe(x.say);
    expect(x.hello).toBe("world");
    expect(x.say).toBe(say);
  });
});

describe("Array tests", () => {
  it("should have push and pop methods", () => {
    let x = {},
      iterableX = makeIterable(x);
    expect(iterableX.push).toBeDefined();
    expect(iterableX.pop).toBeDefined();
  });
});

describe("Iterator tests", () => {
  it("should convert to iterator", () => {
    let x = {},
      iterableX = makeIterable(x);
    iterableX.push(10);
    iterableX.push(20);
    iterableX.push(30);
    iterableX.push(40);

    let actual = [...iterableX];
    expect(actual[0]).toBe(10);
    expect(actual[1]).toBe(20);
    expect(actual[2]).toBe(30);
    expect(actual[3]).toBe(40);
  });
});

describe("Function prototype tests", () => {
  it("should work with instances of the function, not with prototype", () => {
    const TestConstructorFunction = function(this: any, a: any, b: any) {
      this.a = a;
      this.b = b;
    };
    makeIterable(TestConstructorFunction.prototype);

    let x = new (TestConstructorFunction as any)(1, 2);
    let y = new (TestConstructorFunction as any)(3, 4);
    x.push(10, 20, 30, 40, 50);
    y.push("hello", "world");

    let actual1 = [...x];
    let actual2 = [...y];
    expect(x[0]).toBe(10);
    expect(actual1[1]).toBe(20);
    expect(y[0]).toBe("hello");
    expect(actual2[1]).toBe("world");
    expect(x.length).toBe(5);
    expect(y.length).toBe(2);
    expect(x.a).toBe(1);
    expect(y.a).toBe(3);
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

    let x = new Sample("Hello world") as Sample & any[];
    let y = new Sample("It working!") as Sample & any[];
    x.push(true, false, true, true, false, true, false, true);
    y.push("hello", "world", "!");

    let actual1 = [...x];
    let actual2 = [...y];
    expect(x[0]).toBe(true);
    expect(y[0]).toBe("hello");
    expect(actual1[1]).toBe(false);
    expect(actual2[1]).toBe("world");
    expect(x.length).toBe(8);
    expect(y.length).toBe(3);
    expect(Sample.count).toBe(2);
    expect(x.message).toBe("Hello world");
    expect(y.message).toBe("It working!");
  });
});
