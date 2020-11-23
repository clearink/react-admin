// 中间生成组件的map
import { ComponentType } from "react"
import { Button, Icon, Calendar } from "zarm"
import { FilePicker, Input, Carousel } from "@/components/FormMapWrap"
export default {
	Button,
	Icon,
	Calendar,
	FilePicker,
	Input,
	Carousel,
} as {
	[key: string]: ComponentType<any>
}
