export { default as toNumber } from "lodash.tonumber"

export const getSymbol = (num: number) => {
	if (num > 0) return "+"
	if (num < 0) return "-"
	return ""
}

export const getPrecisionNumber = (num: number, precision: number = 2) => {
	return num.toFixed(precision ?? 0)
}
