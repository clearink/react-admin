import { AddDisable, AddSwitch } from "@/utils/QuickConfig"

export default {
	checked: {
		name: "选中",
		...AddSwitch(true),
	},
	...AddDisable(),

	position: {
		h: 2,
		w: 3,
	},
}
