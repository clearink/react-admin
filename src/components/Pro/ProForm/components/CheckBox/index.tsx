import React from "react"
import { Checkbox, Form } from "antd"

interface IProps {}
function ProFormCheckbox(props: IProps) {
	return (
		<Form.Item valuePropName='checked'>
			<Checkbox />
		</Form.Item>
	)
}

function Group() {
	return (
		<Form.Item>
			<Checkbox.Group></Checkbox.Group>
		</Form.Item>
	)
}

// const WrappedProFormCheckbox =
export default ProFormCheckbox
