import { AddSelect } from "@/utils/QuickConfig"
import ConfigDefault from "../ConfigDefault"

class keyboardConfig extends ConfigDefault {
	type = {
		name: "类型",
		value: ["number", "price", "idcard"],
		...AddSelect("number"),
	}
}
export default new keyboardConfig()
