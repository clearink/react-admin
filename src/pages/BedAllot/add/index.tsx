import { ProFormInput } from "@/components/Pro/ProForm"
import DrawerForm, {
	DrawerFormProps,
	DrawerFormRef,
} from "@/components/Pro/ProForm/components/DrawerForm"
import ModalForm from "@/components/Pro/ProForm/components/ModalForm"
import ProFormGroup from "@/components/Pro/ProForm/components/ProFormGroup"
import withDefaultProps from "@/hocs/withDefaultProps"
import React, { forwardRef, memo, Ref } from "react"

export interface AddFormProps extends DrawerFormProps {
	/** form 渲染方式 */
	type?: "drawer" | "modal"
}
export type AddFormRef = DrawerFormRef
function AddForm(props: AddFormProps, ref: Ref<AddFormRef>) {
	const { type, ...rest } = props

	// 这个应该是自动生成的
	const DOM = (
		<>
			<ProFormGroup>
				<ProFormInput label='姓名' name='name' width='m' />
				<ProFormInput label='护管' name='nurse' width='m' />
				<ProFormInput label='护管2' name='nurs2e' width='m' />
			</ProFormGroup>
		</>
	)
	const FormComponent = type === "drawer" ? DrawerForm : ModalForm
	return (
		<FormComponent ref={ref} {...rest}>
			{DOM}
		</FormComponent>
	)
}

export default memo(
	withDefaultProps(forwardRef(AddForm), { type: "drawer", trigger: null })
)
