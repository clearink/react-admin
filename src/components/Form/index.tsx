import React, { ReactNode } from "react"
import { FormProvider, UseFormMethods, SubmitHandler } from "react-hook-form"
import FormItem from "../FormItem"

/**
 * 封装react hook form
 */
interface IForm<F, T> {
	children: ReactNode
	form: UseFormMethods<T>
	onSubmit: SubmitHandler<F>
	[key: string]: any
}

function Form<F, T>(props: IForm<F, T>) {
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
