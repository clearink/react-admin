// 右边配置属性的map
import { Input, InputNumber } from "antd"
import { SketchPicker } from "react-color"
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
	Color: SketchPicker,
}
