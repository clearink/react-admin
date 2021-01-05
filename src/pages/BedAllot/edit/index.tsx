import { ProFormInput } from "@/components/Pro/ProForm"
import DrawerForm, {
	DrawerFormProps,
	DrawerFormRef,
} from "@/components/Pro/ProForm/components/DrawerForm"
import ModalForm from "@/components/Pro/ProForm/components/ModalForm"
import withDefaultProps from "@/hocs/withDefaultProps"
import { useFetchDataProps } from "@/hooks/useMemoFetch"
import React, { forwardRef, memo, Ref } from "react"

export interface AddFormProps extends DrawerFormProps {
	/** form 渲染方式 */
	type?: "drawer" | "modal"
	request?:useFetchDataProps
}
function EditForm(props: AddFormProps, ref: Ref<DrawerFormRef | undefined>) {
	const { type, ...rest } = props

	// 这个应该是自动生成的
	const DOM = (
		<>
			<ProFormInput />
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
	withDefaultProps(forwardRef(EditForm), { type: "drawer", trigger: null })
)
