import React, { CSSProperties, ReactNode } from "react"
import { FormProvider, UseFormMethods, SubmitHandler } from "react-hook-form"
import FormItem from "../FormItem"

/**
 * 封装react hook form
 * 仅仅只为Form.Item 提供 methods
 *
 * 1. form 由外界传入
 * 2. 如何拿到验证的 schema
 */

interface IForm<V> {
	children: ReactNode
	form: UseFormMethods<V>
	onSubmit: SubmitHandler<V>
	style?: CSSProperties
	className?: string
}

function Form<V extends Record<string, any>>(props: IForm<V>) {
	const { children, onSubmit, form, className, style } = props
	return (
		<FormProvider {...form}>
			<form
				className={className}
				style={style}
				onSubmit={form.handleSubmit(onSubmit, (err) => {
					console.log(err)
				})}
			>
				{children}
			</form>
		</FormProvider>
	)
}
Form.Item = FormItem
export { Form }
export { useForm } from "react-hook-form"
