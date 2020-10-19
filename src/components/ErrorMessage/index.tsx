import React, {
	createElement,
	memo,
	ReactHTML,
	ReactNode,
	ReactSVG,
} from "react"
import classNames from "classnames"
import { DeepMap, FieldError, get, useFormContext } from "react-hook-form"
import { AnimatePresence, motion as m } from "framer-motion"
import styles from "./style.module.scss"

interface IErrorMessage {
	errors: DeepMap<Record<string, any>, FieldError>
	name: string
	as?: keyof (ReactHTML & ReactSVG)
	message?: string
	children?: ReactNode
}
function ErrorMessage(props: IErrorMessage) {
	const { errors, name, as, message, children, ...rest } = props

	const methods = useFormContext()

	const error = get(errors ?? methods.errors, name) // 可能使用了FormContext

	const errorText = error?.message ?? message ?? ""

	const ErrorComponent = as ? createElement(as, rest, errorText) : errorText

	return (
		<div className='form-item-wrap relative mb-10'>
			<div className='form-item-label'>{children}</div>
			<AnimatePresence>
				{error && (
					<m.div
						className={classNames("absolute field-error text-red-600", {
							[styles.showError]: !!error,
						})}
					>
						{ErrorComponent}
					</m.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default memo(ErrorMessage)
