export const formatMoney = (
	money: string | number,
	separator: string = ","
) => {
	return `${money}`.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

export const removeSeparator = (
	data: number | string,
	separator: string = ""
) => {
	return `${data}`.replace(new RegExp(`(${separator}*)`, 'gi'), "")
}
