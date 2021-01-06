import DrawerForm, {
	DrawerFormProps,
	DrawerFormRef,
} from "@/components/Pro/ProForm/components/DrawerForm"
import ModalForm from "@/components/Pro/ProForm/components/ModalForm"
import withDefaultProps from "@/hocs/withDefaultProps"
import React, { forwardRef, memo, Ref } from "react"

/**
 * Add Form children 传入
 */
export interface AddFormProps extends DrawerFormProps {
	/** form 渲染方式 */
	type?: "drawer" | "modal"
}
export type AddFormRef = DrawerFormRef
function AddForm(props: AddFormProps, ref: Ref<AddFormRef>) {
	const { type, ...rest } = props
	// 还有可能是单独一个页面 那么就是 Fragment or <></> 了
	const FormComponent = type === "drawer" ? DrawerForm : ModalForm
	return <FormComponent ref={ref} {...rest} />
}

export default memo(
	withDefaultProps(forwardRef(AddForm), { type: "drawer", trigger: null })
)
/**
 * 	// 这个应该是自动生成的
	const DOM = (
		<>
			<ProFormGroup> 
				<ProFormInput label='姓名' name='name' width='m' />
				<ProFormInput label='护管' name='nurse' width='m' />
			</ProFormGroup>
		</>
	)
 */
