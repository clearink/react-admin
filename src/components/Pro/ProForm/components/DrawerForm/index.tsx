import { useSwitch, useToggle } from "@/components/Pro/hooks/boolean"
import { TitleTip } from "@/components/Pro/ProCard/components"
import { TitleTipProps } from "@/components/Pro/ProCard/components/TitleTip"
import { Drawer, Space } from "antd"
import Button, { ButtonProps } from "antd/lib/button"
import { DrawerProps } from "antd/lib/drawer"
import Form, { FormInstance } from "antd/lib/form"
import React, {
	cloneElement,
	forwardRef,
	isValidElement,
	memo,
	ReactNode,
	Ref,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react"
import { createPortal } from "react-dom"
import { BaseFormProps } from "../../type"
import BaseForm from "../BaseForm"
import Submitter from "../Submitter"

export interface DrawerFormProps
	extends Omit<BaseFormProps, "title" | "onFinish"> {
	children?: ReactNode
	trigger: ReactNode
	drawerProps?: Omit<DrawerProps, "title">
	title?: TitleTipProps["title"]
	/** 返回 true 关闭 drawer 且重置表单 */
	onFinish?: (values: any) => Promise<boolean>
}

/** drawerForm 暴露出 的 方法
 * toggle 控制 drawer 的显示隐藏
 * form 外部控制form的实例
 * open 完全打开或者关闭的变量 用于请求数据
 * */
export type DrawerFormRef =
	| {
			toggle: () => void
			form: FormInstance
	  }
	| undefined
function DrawerForm(
	props: DrawerFormProps,
	ref: Ref<DrawerFormRef | undefined>
) {
	const { children, trigger, drawerProps, title, onFinish, ...rest } = props
	// 内部状态
	const [visible, on, off, toggle] = useSwitch()
	const [loading, setLoading] = useState<ButtonProps["loading"]>(false)

	const [form] = Form.useForm(rest.form)
	const handleFinish = async (values: any) => {
		// 提交完成关闭 drawer 重置表单
		setLoading({ delay: 100 })
		const result = await onFinish?.(values)
		if (result) off()
		setLoading(false)
	}
	/** 外部控制 显示隐藏 */
	useImperativeHandle(ref, () => ({ toggle, form }), [toggle, form])

	const wrapperTrigger = useMemo(() => {
		if (!isValidElement(trigger)) return trigger
		return cloneElement(trigger, {
			onClick: (e: MouseEvent) => {
				on()
				trigger.props.onClick?.(e)
			},
		})
	}, [on, trigger])
	const submitter = (
		<Space	>
			<Button onClick={off}>取消</Button>
			<Button type='primary' loading={loading} onClick={form.submit}>
				确认
			</Button>
		</Space>
	)

	const DOM = (
		<Drawer
			visible={visible}
			title={<TitleTip title={title} />}
			width={800}
			getContainer={false}
			onClose={toggle}
			{...drawerProps}
			footerStyle={{ textAlign: "right" }}
			footer={submitter}
		>
			<BaseForm
				submitConfig={false}
				layout='vertical'
				{...rest}
				form={form}
				onFinish={handleFinish}
			>
				{children}
			</BaseForm>
		</Drawer>
	)
	const formPortal = createPortal(
		DOM,
		document.querySelector("body") as Element
	)
	return (
		<div>
			{wrapperTrigger}
			{formPortal}
		</div>
	)
}

export default memo(forwardRef(DrawerForm))
