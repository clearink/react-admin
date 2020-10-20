import React, {
	Children,
	cloneElement,
	createElement,
	isValidElement,
	memo,
	ReactNode,
	useCallback,
	useEffect,
} from "react"
import { Controller, get, useFormContext } from "react-hook-form"
import { motion as m, AnimatePresence } from "framer-motion"
import { animateProps, errorVariants } from "@/configs/animate"
import { Col } from "antd"
import classNames from "classnames"
import "./style.scss"
/**
 * 封装react hook form
 */
interface IFormItem {
	children: ReactNode
	label?: ReactNode
	name?: string
	ref?: string
	[key: string]: any
}

/**
 * FormItem组件.最好只有一个输入组件
 */
function FormItem(props: IFormItem) {
	const { children, ref, label, name, ...rest } = props
	const { errors, register, control } = useFormContext()

	const childCount = Children.count(children)
	useEffect(() => {
		if (process.env.NODE_ENV !== "production" && childCount > 1) {
			console.error("Form.Item should only one child, please use Form.List")
		}
	}, [childCount])
	const renderChildren = useCallback(() => {
		return Children.map(children, (child, index) => {
			// formItem如果不是有效的element 或者没有name属性
			if (!isValidElement(child) || !name) return child

			// 克隆child 根据是否有ref字段 判断 是用 Controller 包裹还是直接传入 register
			if (ref)
				return cloneElement(child, {
					[ref]: register,
					id: name,
					name,
				})

			return (
				<Controller
					control={control}
					name={name}
					as={
						cloneElement(child, { id: name }) ??
						createElement(child.type, { ...child.props, id: name }, [
							...child.props.children,
						])
					}
				/>
			)
		})
	}, [children, control, register, ref, name])

	const error = get(errors, name ?? "")
	return (
		<div className='form-item mb-8 flex items-center'>
			{label && (
				<Col className='form_item_label mark required'>
					<label htmlFor={name}>{label}</label>
				</Col>
			)}
			<Col className='form-item-control relative'>
				<div className='form-item-control-input'>{renderChildren()}</div>
				<AnimatePresence exitBeforeEnter>
					{error && (
						<m.div
							{...animateProps}
							variants={errorVariants}
							transition={{ type: "tween" }}
							className='absolute text-red-600 whitespace-no-wrap'
						>
							{error?.message}
						</m.div>
					)}
				</AnimatePresence>
			</Col>
		</div>
	)
}
export default memo(FormItem)
