import withFormItem from "../../hocs/withFormItem"
import { FieldSelect } from "../../ProField"
import { FieldSelectProps } from "../../ProField/components/FieldSelect"

export default withFormItem<
	Omit<FieldSelectProps, "showTag"> & { showTag?: boolean }
>(FieldSelect, { showTag: true })
