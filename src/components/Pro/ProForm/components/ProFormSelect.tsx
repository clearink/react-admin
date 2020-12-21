import withFormItem from "../../hocs/withFormItem"
import { FieldSelect } from "../../ProField"
import { FieldSelectProps } from "../../ProField/components/FieldSelect"

export default withFormItem<FieldSelectProps>(FieldSelect, {
	allowClear: true,
})
