import FilterValue from "@/utils/FilterValue"

export default abstract class ConfigDefault {
	get list(): any[] {
		return Object.values(FilterValue(this, "position"))
	}

	get layout() {
		return this["position"]
	}

	get defaultValues(): Object {
		const result = {}
		for (let [k, v] of Object.entries(this)) {
			if (k === "position") continue
			result[k] = v.default
		}
		return result
	}
	get configs(): Object {
		const result = {}
		for (let [k, v] of Object.entries(this)) {
			if (k === "position") continue
			result[k] = FilterValue(v, "default") // 去除掉每个的 default 属性
		}
		return result
	}
}
