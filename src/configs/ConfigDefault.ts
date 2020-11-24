import FilterValue from "@/utils/FilterValue"
export default class ConfigDefault {
	get list(): any[] {
		return Object.values(FilterValue(this, "layout"))
	}

	get position(): Object {
		return this["layout"]
	}

	get defaultValues(): Object {
		const result = {}
		for (let [k, v] of Object.entries(this)) {
			result[k] = v.default
		}
		return result
	}
	get configs(): Object {
		const result = {}
		for (let [k, v] of Object.entries(this)) {
			result[k] = FilterValue(v, "default", "layout")
		}
		return result
	}
}
