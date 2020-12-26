import withFormItem from "../../hocs/withFormItem"
import FieldRadio, {
	FieldRadioProps,
} from "../../ProField/components/FieldRadio"

export default withFormItem<
	Omit<FieldRadioProps, "showTag"> & { showTag?: boolean }
>(FieldRadio)
