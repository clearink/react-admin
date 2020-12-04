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
import withDefaultProps from "@/hocs/withDefaultProps"
/**
 * 封装react hook form
 */
interface IFormItem {
	propName: string
	required: boolean
	children?: ReactNode
	label?: ReactNode
	name?: string
	rules?: any
	refName?: string
	render?: ControllerProps<any>["render"]
	defaultValue?: any
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
		required,
		rules,
		render,
		defaultValue,
		propName,
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
		// 没有name 直接返回
		if (!name) return children

		if (typeof render === "function")
			return (
				<Controller
					control={control}
					name={name}
					rules={rules}
					render={render}
				/>
			)

		return Children.map(children, (child) => {
			// formItem如果不是有效的element
			if (!isValidElement(child)) return child
			if (propName !== "value")
				return (
					<Controller
						control={control}
						name={name}
						rules={rules}
						defaultValue={defaultValue}
						render={({ value, ...rest }) =>
							cloneElement(child, {
								id: name,
								...rest,
								[propName]: value,
							})
						}
					/>
				)

			//	id 字段是为了配合label
			// 有 refName 字段
			if (refName)
				return cloneElement(child, {
					name,
					id: name,
					[refName]: register(rules),
				})

			return (
				<Controller
					control={control}
					name={name}
					as={cloneElement(child, {
						id: name,
					})}
					rules={rules}
					defaultValue={defaultValue}
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
export default memo(
	withDefaultProps(FormItem, { propName: "value", required: false })
)
