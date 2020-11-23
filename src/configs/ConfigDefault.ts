import FilterValue from "@/utils/FilterValue"
export default class ConfigDefault {
	get defaultValues(): Object {
		return Object.entries(this).reduce((pre, [k, v]) => {
			return { ...pre, [k]: v.default }
		}, {})
	}
	get configs(): Object {
		return Object.entries(this).reduce((pre, [k, v]) => {
			return { ...pre, [k]: FilterValue(v, "default") }
		}, {})
	}
}
