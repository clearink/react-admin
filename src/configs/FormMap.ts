// 右边配置属性的map

import { ComponentType } from "react"
import { Input, InputNumber } from "antd"
import { Select, Switch } from "@/components/Wrapped/ConfigWrap" // 封装现有的组件
// 自己写的
import ConfigList from "@/components/ConfigList"
export default {
	Select,
	Switch,
	Input,
	InputNumber,
	List: ConfigList,
} as {
	[key: string]: ComponentType<any>
}
