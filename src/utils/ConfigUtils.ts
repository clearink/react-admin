import FilterValue from "@/utils/FilterValue"

// 将ConfigDefault的逻辑引过来
export default class ConfigUtils {
	static getList(obj: {}): any[] {
		return Object.values(FilterValue(obj, "position"))
	}

	static getPosition(obj: {}) {
		return obj["position"]
	}

	static get defaultValues(): Object {
		const result = {}
		for (let [k, v] of Object.entries(this)) {
			if (k === "position") continue
			result[k] = v.default
		}
		return result
	}
	static get configs(): Object {
		const result = {}
		for (let [k, v] of Object.entries(this)) {
			if (k === "position") continue
			result[k] = FilterValue(v, "default") // 去除掉每个的 default 属性
		}
		return result
	}
}
