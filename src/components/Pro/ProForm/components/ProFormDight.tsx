import withFormItem from "../../hocs/withFormItem"
import { FieldDigit } from "../../ProField"
import { FieldDigitProps } from "../../ProField/components/FieldDigit"

export default withFormItem<FieldDigitProps>(FieldDigit, {
	style: { width: "100%" },
})
