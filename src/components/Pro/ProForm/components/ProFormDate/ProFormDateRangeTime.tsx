import withFormItem from "@/components/Pro/hocs/withFormItem"
import ProFormDateRange, { ProFormDateRangeProps } from "./ProFormDateRange"

export default withFormItem<ProFormDateRangeProps>(ProFormDateRange, {
	showTime: true,
})
