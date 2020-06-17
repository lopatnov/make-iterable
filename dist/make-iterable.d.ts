/**
 * Convert the value to iterable and Array like object.
 * @param value The value to convert
 * @returns the value with it's type and any[]
 */
declare function makeIterable<T>(value: T): T & Array<any>;
export default makeIterable;
