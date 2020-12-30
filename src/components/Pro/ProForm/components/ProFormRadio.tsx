import { useFetchDataProps } from "@/hooks/useFetchData"
import { CheckboxValueType } from "antd/lib/checkbox/Group"
import { RadioGroupProps } from "antd/lib/radio"
import withFormItem from "../../hocs/withFormItem"
import FieldRadio, {
	FieldRadioProps,
} from "../../ProField/components/FieldRadio"
import { BaseProFieldProps } from "../../ProField/type"

export interface ProFormRadioProps
	extends Omit<RadioGroupProps, "options">,
		BaseProFieldProps {
	text?: string | CheckboxValueType[]
	showTag?: boolean
	request?: useFetchDataProps
	options?: RadioGroupProps["options"]
}

// export default withFormItem<InputProps, ProFormTextProps>(FieldText)
export default withFormItem<
	ProFormRadioProps, // edit props and  baseProFieldProps
	Omit<FieldRadioProps, "formItemProps"> // read props
>(FieldRadio, { showTag: true })
