import withFormItem from "../../hocs/withFormItem"
import FieldText, { FieldTextProps } from "../../ProField/components/FieldText"

export default withFormItem<FieldTextProps>(FieldText, {
	allowClear: true,
	style: { width: "100%" },
})
