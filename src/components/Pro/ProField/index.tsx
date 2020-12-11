import React from "react"

/**
 * 仿 antd 的 pro field
 * 根据 field 字段去FieldMap中匹配组件
 */

interface IProFieldProps {
	field: string | { type: string; [key: string]: any }
}
function ProField(props: IProFieldProps) {
	return <div></div>
}

export default ProField
