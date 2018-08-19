/**
 * Number.isNaN polyfill for IE
 */

interface NumberConstructor {
  isNaN: any;
}
if (!Number.isNaN) {
  Number.isNaN = (value: any) => {
    return value !== value;
  };
}
