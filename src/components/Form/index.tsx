import React, { ReactNode } from "react"
import { FormProvider, UseFormMethods, SubmitHandler } from "react-hook-form"
import FormItem from "../FormItem"

/**
 * 封装react hook form
 */

interface IForm<V> {
	children: ReactNode
	form: UseFormMethods<V>
	onSubmit: SubmitHandler<V>
	[key: string]: any
}

function Form<V extends Record<string, any>>(props: IForm<V>) {
	const { children, onSubmit, form, className, style } = props
	return (
		<FormProvider {...form}>
			<form
				className={className}
				style={style}
				onSubmit={form.handleSubmit(onSubmit)}
			>
				{children}
			</form>
		</FormProvider>
	)
}
Form.Item = FormItem
export { Form }
export { useForm } from "react-hook-form"
