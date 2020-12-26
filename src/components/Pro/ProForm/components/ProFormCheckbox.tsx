import withFormItem from "../../hocs/withFormItem"
import { FieldCheckbox } from "../../ProField"
import { FieldCheckboxProps } from "../../ProField/components/FieldCheckbox"

export default withFormItem<
	Omit<FieldCheckboxProps, "showTag"> & { showTag?: boolean }
>(FieldCheckbox)
