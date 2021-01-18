import DrawerForm, {
	DrawerFormProps,
	DrawerFormRef,
} from "@/components/Pro/ProForm/components/DrawerForm"
import ModalForm from "@/components/Pro/ProForm/components/ModalForm"
import withDefaultProps from "@/hocs/withDefaultProps"
import { UseMemoFetchProps } from "@/hooks/useMemoFetch"
import React, {
	forwardRef,
	memo,
	Ref,
	useImperativeHandle,
	useRef,
} from "react"

/** 包装一下 Drawer modal 以便于请求详情数据 */
export interface AddFormProps extends DrawerFormProps {
	/** form 渲染方式 */
	type?: "drawer" | "modal"
	request?: UseMemoFetchProps
	id?: string
}
function Detail(props: AddFormProps, ref: Ref<DrawerFormRef>) {
	const { type, request, id, children, ...rest } = props

	const formRef = useRef<DrawerFormRef>(null)
	useImperativeHandle(ref, () => formRef.current!, [])

	const FormComponent = type === "drawer" ? DrawerForm : ModalForm
	return <FormComponent ref={formRef} {...rest}></FormComponent>
}

export default withDefaultProps(forwardRef(Detail), {
	type: "drawer",
	trigger: null,
})

/**
 * 	// 这个应该是自动生成的
	const DOM = (
		<>
			<ProFormInput label='姓名' name='name' />
			<ProFormRadio label='性别' name='gender' options={["男", "女"]} />
			<ProFormDate label='生日' name='birthday' />
			<ProFormNumber label='年龄' name='age' />
			<ProFormInput label='身份证号' name='cardNum' />
		</>
	)
 */
