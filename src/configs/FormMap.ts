// 右边配置属性的map

import { ComponentType } from "react"
import { Input, InputNumber } from "antd"

// 封装过的
import { Select, Switch } from "@/components/Wrapped/ConfigWrap"

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
