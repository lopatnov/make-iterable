const objNameSet = new Set(Object.getOwnPropertyNames(Object.prototype));
const arrNames = Object.getOwnPropertyNames(Array.prototype);
const iterableNames: string[] = arrNames.filter((name) => !objNameSet.has(name));

function attachIterable(value: any): void {
  if (!Symbol || !Symbol.iterator) {
    return;
  }
  if (Object.getOwnPropertyDescriptor(value, Symbol.iterator)) {
    return;
  }
  Object.defineProperty(value, Symbol.iterator, {
    writable: false,
    enumerable: false,
    configurable: false,
    value: function (this: any) {
      let index = 0;
      return {
        next: () => {
          if (this.length && index < this.length) {
            return { value: this[index++], done: false };
          } else {
            return { value: undefined, done: true };
          }
        },
      };
    },
  });
}

function attachArrayProperties(value: any): void {
  if (typeof value.push === "function") {
    return;
  }
  const proto = Array.prototype as any;
  iterableNames.forEach((name) => {
    if (proto[name] instanceof Function) {
      value[name] = function (this: any, ...args: any[]): any {
        return proto[name].apply(this, args);
      };
    } else {
      if (name === "length") {
        let index = 0;
        while (value[index] !== undefined) {
          index++;
        }
        Object.defineProperty(value, "length", {
          value: index,
          writable: true,
          enumerable: false,
          configurable: false,
        });
      } else {
        value[name] = proto[name];
      }
    }
  });
}

/**
 * Convert the value to iterable and Array-like object.
 * @param value The value to convert
 * @returns the value with its type and any[]
 * @throws {Error} if value is null, undefined, boolean, number, or string
 */
function makeIterable<T>(value: T): T & Array<any> {
  if (
    value === undefined ||
    value === null ||
    typeof value === "boolean" ||
    typeof value === "number" ||
    typeof value === "string"
  ) {
    throw new Error(`Incorrect argument: ${value}`);
  }

  attachArrayProperties(value);
  attachIterable(value);
  return value as T & any[];
}

export default makeIterable;
