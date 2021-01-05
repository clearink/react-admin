import withFormItem from "@/components/Pro/hocs/withFormItem"
import ProFormDate, { ProFormDateProps } from "."

export default withFormItem<ProFormDateProps>(ProFormDate, {
	showTime: true,
	placeholder: "请输入",
})
