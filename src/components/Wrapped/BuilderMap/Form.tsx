import React, { memo } from "react"
import { Form, useForm } from "@/components/Form"
import styles from "./style.module.scss"
function WrappedForm(props: any) {
	console.log("WrappedForm", props)
	const form = useForm()
	const handleSubmit = (values: any) => {
		console.log(values)
	}
	return (
		<div className={styles.form_wrap}>
			<Form form={form} onSubmit={handleSubmit}></Form>
		</div>
	)
}

export default memo(WrappedForm)
