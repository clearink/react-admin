// 右边配置属性的map

import { ComponentType } from "react"
import { Input, InputNumber } from "antd"
import { Select, Switch } from "@/components/FormMapWrap"
export default {
	Select,
	Switch,
	Input,
	InputNumber,
} as {
	[key: string]: ComponentType<any>
}
