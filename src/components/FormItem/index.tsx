import React, {
	Children,
	cloneElement,
	isValidElement,
	memo,
	ReactNode,
	useCallback,
} from "react"
import { Controller, get, useFormContext } from "react-hook-form"
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

	const renderChildren = useCallback(() => {
		return Children.map(children, (child, index) => {
			// formItem如果不是有效的element 或者没有name属性
			if (!isValidElement(child) || !name) return child

			// 克隆child 根据是否有ref字段 判断 是用 Controller 包裹还是直接传入 register
			if (ref)
				return cloneElement(child, {
					...child.props,
					[ref]: register,
					name,
				})
			return child
			// return <Controller as={child} control={control} name={child.props.name} />
		})
	}, [children, control, register, ref, name])

	// if (name) {
	// 	const error = get(errors, name)
	// }
	return (
		<div className='relative form-item-wrap'>
			<div className='form-item-label'>{label}</div>
			<div className='form-item-input'>
				<div className='control'>{renderChildren()}</div>
				<div className='absolute form-item-error'>err</div>
			</div>
		</div>
	)
}
export default memo(FormItem)
