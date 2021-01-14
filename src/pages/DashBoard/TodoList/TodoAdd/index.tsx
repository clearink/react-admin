import { ProFormInput } from "@/components/BigSight"
import BaseForm from "@/components/Pro/ProForm/components/BaseForm"
import React from "react"
import useTodoAddService from "./useTodoAdd.service"

function TodoAdd() {
	const TodoAddService = useTodoAddService()
	return (
		<div>
			<BaseForm onFinish={TodoAddService.handleAdd}>
				<ProFormInput label='名称' name='title' required />
				<ProFormInput label='内容' name='value' />
			</BaseForm>
		</div>
	)
}
export default TodoAdd
