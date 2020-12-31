import { SorterResult } from "antd/lib/table/interface"
import moment, { Moment } from "moment"
import removeEmpty from "./removeEmpty"
import { isArray, isObject } from "./validate"
// 金钱格式化
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
	return `${data}`.replace(new RegExp(`(${separator}*)`, "gi"), "")
}
// 对 onFinish 的一些字段的封装
/**
 * 需要处理的数据有
 * 1.Moment
 * 2.富文本
 */
// function findValueByPath(data: any, path: string[]) {
// 	let value = data
// 	while (value) {
// 		value = data[path.pop()]
// 	}
// }
export default function formatValues(
	values: object | any[],
	formatList: any[]
): any {
	const result = { ...values }
	for (let i = 0; i < formatList.length; i++) {
		const { type, path } = formatList[i]
		if (type === "date") {
			// 找 path
		}
	}
	// if (isArray(values)) {
	// 	return values.map((item) => {
	// 		if (isArray(item) || isObject(item)) return formatValues(item, path)
	// 		if (moment.isMoment(item)) return moment(item).format("YYYY-MM-DD")
	// 		// 是富文本
	// 		return item
	// 	})
	// }
	// if (isObject(values)) {
	// 	return Object.entries(values).reduce((pre, [k, v]) => {
	// 		if (isArray(v) || isArray(v))
	// 			return Object.assign(pre, { [k]: formatValues(v, path) })
	// 		if (v !== undefined && v !== "") return Object.assign(pre, { [k]: v })
	// 		return pre
	// 	}, {})
	// }
	return result
}
export interface TableSearchParamsProps {
	filters?: {}
	pagination?: {
		current?: number
		pageSize?: number
		total?: number
		pageNo?: number
	}
	params?: any
	sorter: SorterResult<any>
	parameter?:
		| { column: string; order: "asc" | "desc" }
		| Array<{ column: string; order: "asc" | "desc" }>
	form: object
}

// 不同的公司有不同的search方式
export interface BigSiteQueryProps {
	pageNo?: number
	pageSize?: number
	parameter?:
		| { column: string; order: "asc" | "desc" }
		| Array<{ column: string; order: "asc" | "desc" }>
}
export function formatTableSearchParams(
	values: TableSearchParamsProps
): BigSiteQueryProps {
	const { filters, pagination, sorter, params, form } = values
	const result: BigSiteQueryProps = { ...(params ?? {}) }

	// 筛选相关  当前公司无该选项
	if (filters) {
	}

	if (form) {
		// 搜索字段
		// 搜索时 默认返回第一页
		result.pageNo = 1
		Object.assign(result, removeEmpty(form))
	}

	// 分页相关
	if (pagination && Object.keys(pagination).length) {
		result.pageNo = pagination.current
		result.pageSize = pagination.pageSize
	}

	// console.log('values',values);
	// 排序相关
	if (sorter && Object.keys(sorter).length) {
		// 排序也默认返回第一页
		// 如何判断当前是否该变了排序的方式呢?

		// result.pageNo = 1
		// 加到 parameter
		const render = (item: any) => ({
			column: [].concat(item.field).join("."),
			order: item.order.replace("end", "") as "asc" | "desc",
		})

		const sortParams = [].concat(sorter as any).map(render)
		console.log("adsssssss", sortParams, params?.parameter)
		if (params?.parameter) {
			// 如果 sortParams 中不含有 params?.parameter
			// sortParams.map(item=>{
			// })
		}
	}

	return result
}

type commonServerData = {
	result: {
		records: any[]
		current: number
		size: number
		total: number
	}
}

/**
 *  返回四个数据
 *  data 数据
 *  current 页码
 *  pageSize 每页数量
 *  total 总数
 */
export function commonTransformServerData(data: commonServerData) {
	const { result } = data
	return {
		data: result.records,
		current: result.current,
		pageSize: result.size,
		total: result.total,
	}
}
