let objNames = Object.getOwnPropertyNames(Object.prototype),
  arrNames = Object.getOwnPropertyNames(Array.prototype),
  iterableNames: any[] = arrNames.filter(function(name) {
    return objNames.indexOf(name) === -1;
  });

function attachIterable(value: any) {
  if (!Symbol || !Symbol.iterator) {
    return;
  }
  Object.defineProperty(value, Symbol.iterator as any, {
    writable: false,
    enumerable: false,
    configurable: false,
    value: function() {
      let context = this;
      return {
        next: function() {
          if (context.length && this._index < context.length) {
            return { value: context[this._index++], done: false };
          } else {
            return { done: true };
          }
        },
        _index: 0
      };
    }
  });
}

function attachArrayProperties(value: any) {
  iterableNames.forEach(name => {
    if (Array.prototype[name] instanceof Function) {
      Object.defineProperty(value, name, {
        value: function() {
          return Array.prototype[name].apply(this, arguments);
        },
        configurable: true,
        writable: true,
        enumerable: false
      });
      value[name] = function() {
        const arrayFunction = Array.prototype[name];
        return arrayFunction.apply(this, arguments);
      };
    } else {
      if (name === "length") {
        var index = 0;
        while (value[index] !== undefined) {
          index++;
        }
        Object.defineProperty(value, "length", {
          value: index,
          writable: true,
          enumerable: false,
          configurable: false
        });
      } else {
        value[name] = Array.prototype[name];
      }
    }
  });
}

/**
 * Convert the value to iterable and Array like object.
 * @param value The value to convert
 * @returns the value with it's type and any[]
 */
function makeIterable<T>(value: T): T & Array<any> {
  if (
    value === undefined ||
    value === null ||
    typeof value === "boolean" ||
    typeof value === "number" ||
    typeof value === "string"
  ) {
    throw new Error("Incorrect argument: " + value);
  }

  attachArrayProperties(value);
  attachIterable(value);
  return value as T & any[];
}

export default makeIterable;
