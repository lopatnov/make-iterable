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
