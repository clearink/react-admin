import withFormItem from "../../hocs/withFormItem"
import { FieldCheckbox } from "../../ProField"
import { FieldCheckboxProps } from "../../ProField/components/FieldCheckbox"

export default withFormItem<Omit<FieldCheckboxProps, 'textTag'> & { textTag?: boolean }>(
	FieldCheckbox
)
