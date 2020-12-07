// 判断类型
type VariableType =
	| "Object"
	| "Array"
	| "Undefined"
	| "Null"
	| "Number"
	| "String"
	| "Boolean"
	| "Function"
	| "Symbol"
	| "BigInt"
const validateType = (obj: any, type: VariableType) =>
	Object.prototype.toString.call(obj) === `[object ${type}]`

export const isObject = (obj: any) => validateType(obj, "Object")
export const isArray = Array.isArray
export const isUndefined = (obj: any) => validateType(obj, "Undefined")
export const isNull = (obj: any) => validateType(obj, "Null")
export const isNumber = (obj: any) => validateType(obj, "Number")
export const isString = (obj: any) => validateType(obj, "String")
export const isBoolean = (obj: any) => validateType(obj, "Boolean")
export const isFunction = (obj: any) => validateType(obj, "Function")
export const isSymbol = (obj: any) => validateType(obj, "Symbol")
export const isBigInt = (obj: any) => validateType(obj, "BigInt")
