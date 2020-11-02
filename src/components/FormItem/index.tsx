import React, {
	Children,
	cloneElement,
	isValidElement,
	memo,
	ReactNode,
	useEffect,
	useMemo,
} from "react"
import {
	Controller,
	ControllerProps,
	get,
	useFormContext,
} from "react-hook-form"
import { motion as m, AnimatePresence } from "framer-motion"
import { animateProps, errorVariants } from "@/configs/animate"
import { Col } from "antd"
import classNames from "classnames"
import "./style.scss"
/**
 * 封装react hook form
 */
interface IFormItem {
	children?: ReactNode
	required?: boolean
	refName?: string
	label?: ReactNode
	name?: string
	rules?: any
	render?: ControllerProps<any>["render"]
	[key: string]: any
}

/**
 * FormItem组件.最好只有一个输入组件
 */
function FormItem(props: IFormItem) {
	const {
		children,
		refName,
		label,
		name,
		required = false,
		rules,
		render,
		...rest
	} = props
	const { errors, register, control } = useFormContext()

	// 是否渲染required标志
	const isRequired = useMemo(
		() => required || Object.keys(rules ?? {}).includes("required"),
		[rules, required]
	)

	// 警告
	const childCount = Children.count(children)
	useEffect(() => {
		if (process.env.NODE_ENV !== "production" && childCount > 1) {
			console.error("Form.Item should only one child, please use Form.List")
		}
	}, [childCount])

	// 渲染输入组件
	const renderComponent = () => {
		if (typeof render === "function" && name)
			return (
				<Controller
					control={control}
					name={name}
					rules={rules}
					render={render}
				/>
			)

		return Children.map(children, (child) => {
			// formItem如果不是有效的element 或者没有name属性
			if (!isValidElement(child) || !name) return child

			//	id 字段是为了配合label

			// 有 refName 字段
			if (refName)
				return cloneElement(child, {
					[refName]: register(rules),
					name,
					id: name,
				})
			return (
				<Controller
					control={control}
					name={name}
					as={cloneElement(child, { id: name })}
					rules={rules}
				/>
			)
		})
	}

	// 获取errors
	const error = get(errors, name ?? "")

	return (
		<div className='form-item mb-8 flex items-center'>
			{label && (
				<Col
					className={classNames("form_item_label mark", {
						required: isRequired,
					})}
				>
					<label htmlFor={name}>{label}</label>
				</Col>
			)}
			<Col className='form-item-control relative'>
				<div className='form-item-control-input'>{renderComponent()}</div>
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
