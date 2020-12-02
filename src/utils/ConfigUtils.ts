import { IConfigItem, ObjectAny } from "@/@types/buildConfig"
import FilterValue from "@/utils/FilterValue"

// 将ConfigDefault的逻辑引过来
export default class ConfigUtils {
	static getList(obj: {}): Array<IConfigItem> {
		return Object.values(FilterValue(obj, "position"))
	}

	// 获取 默认值
	// 需要递归
	static getDefaultValues(obj: ObjectAny) {
		const result: ObjectAny = {}
		for (let [k, v] of Object.entries(obj)) {
			if (k === "position") continue
			console.log("getDefaultValues", k, v)
			if (v.config) result[k] = ConfigUtils.getDefaultValues(v.config)
			else result[k] = v.default
		}
		return result
	}

	// 这里应该要用到递归? 递归找到 config字段
	// 获取 config 去除 position 和每个的 default
	static getConfigs(obj: ObjectAny) {
		const result: ObjectAny = {}
		for (let [k, v] of Object.entries(obj)) {
			if (k === "position") continue
			result[k] = FilterValue(v, "default") // 去除掉每个的 default 属性
		}
		return result
	}

	// 获取位置
	static getLayout(obj: ObjectAny) {
		return obj["position"]
	}
}
