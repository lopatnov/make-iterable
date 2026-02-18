/**
 * Convert the value to iterable and Array-like object.
 * @param value The value to convert
 * @returns the value with its type and any[]
 * @throws {Error} if value is null, undefined, boolean, number, or string
 */
declare function makeIterable<T>(value: T): T & Array<any>;
export default makeIterable;
