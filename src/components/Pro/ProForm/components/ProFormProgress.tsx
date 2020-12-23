import withFormItem from "../../hocs/withFormItem"
import { FieldProgress } from "../../ProField"
import { FieldProgressProps } from "../../ProField/components/FieldProgress"

export default withFormItem<FieldProgressProps>(FieldProgress, {
	style: { width: "100%" },
})
