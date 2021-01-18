import withDefaultProps from "@/hocs/withDefaultProps"
import ProFormDate from "."

export default withDefaultProps(ProFormDate, {
	showTime: true,
	placeholder: "请输入",
})
