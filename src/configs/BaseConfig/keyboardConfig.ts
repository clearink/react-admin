import { AddSelect } from "@/utils/QuickConfig"

export default {
	type: {
		...AddSelect("number"),
		name: "类型",
		value: ["number", "price", "idcard"],
	},
	position: {
		h: 9,
		minH: 9,
	},
}
