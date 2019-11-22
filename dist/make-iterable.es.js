var objNames = Object.getOwnPropertyNames(Object.prototype), arrNames = Object.getOwnPropertyNames(Array.prototype), iterableNames = arrNames.filter(function (name) {
    return objNames.indexOf(name) === -1;
});
function attachIterable(value) {
    if (value === undefined || value === null)
        throw new Error("Incorrect argument: " + value);
    value[Symbol.iterator] = function () {
        return {
            next: function () {
                if (value.length && this._index < value.length) {
                    return { value: value[this._index++], done: false };
                }
                else {
                    return { done: true };
                }
            },
            _index: 0
        };
    };
}
function attachArrayProperties(value) {
    iterableNames.forEach(function (name) {
        if (Array.prototype[name] instanceof Function) {
            value[name] = Array.prototype[name].bind(value);
        }
        else {
            if (name === "length") {
                var index = 0;
                while (value[index] !== undefined) {
                    index++;
                }
                Object.defineProperty(value, "length", {
                    value: index,
                    writable: true
                });
            }
            else {
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
function makeIterable(value) {
    attachArrayProperties(value);
    attachIterable(value);
    return value;
}

export default makeIterable;
//# sourceMappingURL=make-iterable.es.js.map
