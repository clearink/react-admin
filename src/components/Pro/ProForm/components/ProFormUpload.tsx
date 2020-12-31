import React from "react"
import { Upload } from "antd"
import withFormItem from "../../hocs/withFormItem"
import { BaseProFieldProps } from "../../ProField/type"
import { UploadProps } from "antd/lib/upload"

export interface ProFormUploadProps extends UploadProps {
	render?: BaseProFieldProps<ProFormUploadProps>["render"]
	value?: UploadProps["fileList"]
}
function ProFormUpload(props: ProFormUploadProps) {
	const { render, ...rest } = props
	const DOM = <Upload {...rest} />
	if (render) return render(rest, DOM)
	return DOM
}
export default withFormItem<ProFormUploadProps>(ProFormUpload, {
	// 可在此设置   headers
})
