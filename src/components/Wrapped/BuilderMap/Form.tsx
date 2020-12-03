import React, { memo } from "react"
import { Form, useForm } from "@/components/Form"
import styles from "./style.module.scss"

interface IProps {
	title: string
}
function WrappedForm(props: IProps) {
	console.log("WrappedForm", props)
	const { title } = props
	const form = useForm()
	const handleSubmit = (values: any) => {
		console.log(values)
	}
	return (
		<div className={styles.form_wrap}>
			<div className={styles.form_title}>title</div>
			<Form form={form} onSubmit={handleSubmit}></Form>
		</div>
	)
}

export default memo(WrappedForm)
