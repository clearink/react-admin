import React, {
	Children,
	cloneElement,
	isValidElement,
	memo,
	ReactNode,
	useCallback,
} from "react"
import { FormProvider, UseFormMethods, SubmitHandler } from "react-hook-form"
import FormItem from "../FormItem"

/**
 * 封装react hook form
 */
interface IForm<F> {
	children: ReactNode
	form: UseFormMethods
	onSubmit: SubmitHandler<F>
	[key: string]: any
}

function FormWrap<F>(props: IForm<F>) {
	const { children, onSubmit, form, ...rest } = props

	return (
		<FormProvider {...form}>
			<form {...rest} onSubmit={form.handleSubmit(onSubmit)}>
				{children}
			</form>
		</FormProvider>
	)
}
FormWrap.Item = FormItem
export const Form = FormWrap
export { useForm } from "react-hook-form"
