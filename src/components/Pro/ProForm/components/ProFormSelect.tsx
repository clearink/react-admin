import withFormItem from "../../hocs/withFormItem"
import { FieldSelect } from "../../ProField"
import { FieldSelectProps } from "../../ProField/components/FieldSelect"

export default withFormItem<
	Omit<FieldSelectProps, "textTag"> & { textTag?: boolean }
>(FieldSelect, {
	allowClear: true,
	style: { width: "100%" },
})
