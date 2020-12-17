// money prefix
export { default as toNumber } from "lodash.tonumber"
export const moneySign = {
	"zh-cn": "￥",
	"en-us": "$",
}

// 格式化数字
export function formatNumber(num: number) {
	return new Intl.NumberFormat().format(num)
}

// 格式化秒
export function formatSecond(num: number) {
	let str = ""
	const hour = Math.floor(num / 3600)
	const minute = Math.floor((num / 60) % 60)
	const second = Math.floor(num % 60)
	str = `${second}秒`
	if (minute) str = `${minute}分钟${str}`
	if (hour) str = `${hour}小时${str}`
	return str
}
