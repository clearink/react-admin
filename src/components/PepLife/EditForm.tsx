import useMemoCallback from "@/components/Pro/hooks/memo-callback"
import useMountedRef from "@/components/Pro/hooks/mounted-ref"
import DrawerForm, {
	DrawerFormProps,
	DrawerFormRef,
} from "@/components/Pro/ProForm/components/DrawerForm"
import ModalForm from "@/components/Pro/ProForm/components/ModalForm"
import ProSkeleton from "@/components/Pro/ProSkeleton"
import withDefaultProps from "@/hocs/withDefaultProps"
import { useFetchDataProps } from "@/hooks/useMemoFetch"
import http from "@/http"
import React, {
	forwardRef,
	memo,
	Ref,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react"

/** 包装一下 DrawerForm 以便于请求详情数据 */
export interface AddFormProps extends DrawerFormProps {
	/** form 渲染方式 */
	type?: "drawer" | "modal"
	request?: useFetchDataProps
	id?: string
}
function EditForm(props: AddFormProps, ref: Ref<DrawerFormRef>) {
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
			form.resetFields()
			const { data } = await http[method as any](url, params)
			if (!mountedRef.current) return
			const result = transform?.(data) ?? data
			// 后期会加上是否缓存下来详情数据
			// 提交时再更新缓存

			// setFieldValue 可能需要外部转换一下
			form.setFieldsValue(result.result)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}, [])

	// 请求详细数据 等到完全打开drawer后再发起请求
	useEffect(() => {
		if (!id) return
		setLoading(true)
		const timer = window.setTimeout(() => fetchData(), 300)
		return () => clearTimeout(timer)
	}, [fetchData, id])

	const FormComponent = type === "drawer" ? DrawerForm : ModalForm
	return (
		<FormComponent ref={formRef} {...rest}>
			{loading ? <ProSkeleton type='form' /> : children}
		</FormComponent>
	)
}

export default memo(
	withDefaultProps(forwardRef(EditForm), { type: "drawer", trigger: null })
)
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
