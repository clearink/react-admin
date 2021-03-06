import useMemoCallback from "@/components/Pro/hooks/memo-callback"
import useMountedRef from "@/components/Pro/hooks/mounted-ref"
import DrawerForm, {
	DrawerFormProps,
	DrawerFormRef,
} from "@/components/Pro/ProForm/components/DrawerForm"
import ModalForm from "@/components/Pro/ProForm/components/ModalForm"
import withDefaultProps from "@/hocs/withDefaultProps"
import { UseMemoFetchProps } from "@/hooks/useMemoFetch"
import http from "@/http"
import { Spin } from "antd"
import React, {
	forwardRef,
	memo,
	Ref,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react"
import { ProFormInput } from "../../Pro/ProForm"

/** 包装一下 DrawerForm 以便于请求详情数据 */
export interface EditFormProps extends DrawerFormProps {
	/** form 渲染方式 */
	type?: "drawer" | "modal"
	request?: UseMemoFetchProps
	/** 数据请求 */
	id?: string
}
export type EditFormRef = DrawerFormRef
function EditForm(props: EditFormProps, ref: Ref<DrawerFormRef>) {
	const { type, request, id, children, ...rest } = props

	const mountedRef = useMountedRef()
	const formRef = useRef<DrawerFormRef>(null)

	useImperativeHandle(ref, () => formRef.current!, [])

	// 请求详情
	const [loading, setLoading] = useState(false) // 请求数据loading
	const fetchData = useMemoCallback(async () => {
		const { method = "get", url, params, transform } = request ?? {}
		if (!url || !id) return
		try {
			const { form } = formRef.current!
			// 请求前重置表单数据
			const { data } = await http[method as any](url, params)
			if (!mountedRef.current) return
			const result = transform?.(data, false) ?? data
			// 后期会加上是否缓存下来详情数据
			// 提交时再更新缓存
			form.setFieldsValue(result.result)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}, [])

	// 请求详细数据 等到完全打开drawer or modal后再发起请求
	useEffect(() => {
		if (!id) return
		formRef.current?.form.resetFields() // resetFields会重置mounted表单组件
		setLoading(true)
		const timer = window.setTimeout(() => fetchData(), 300)
		return () => clearTimeout(timer)
	}, [fetchData, id])

	const FormComponent = type === "drawer" ? DrawerForm : ModalForm
	return (
		<FormComponent ref={formRef} name='edit-form' {...rest}>
			<Spin spinning={loading}>{children}</Spin>

			{/* 一般修改时会传入id,这里默认给个id */}
			<ProFormInput name='id' formItemClassName='hidden' />
		</FormComponent>
	)
}

export default memo(withDefaultProps(forwardRef(EditForm), { type: "drawer" }))
