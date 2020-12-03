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
const checkType = (obj: any, type: VariableType) =>
	Object.prototype.toString.call(obj) === `[object ${type}]`

export const isObject = (obj: any) => checkType(obj, "Object")
export const isArray = Array.isArray
export const isUndefined = (obj: any) => checkType(obj, "Undefined")
export const isNull = (obj: any) => checkType(obj, "Null")
export const isNumber = (obj: any) => checkType(obj, "Number")
export const isString = (obj: any) => checkType(obj, "String")
export const isBoolean = (obj: any) => checkType(obj, "Boolean")
export const isFunction = (obj: any) => checkType(obj, "Function")
export const isSymbol = (obj: any) => checkType(obj, "Symbol")
export const isBigInt = (obj: any) => checkType(obj, "BigInt")
