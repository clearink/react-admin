import Cascader, { CascaderProps } from "antd/lib/cascader"
import React from "react"
import withFormItem from "../../hocs/withFormItem"
// 级联选择组件
export interface ProFormCascaderProps extends CascaderProps {}

function ProFormCascader(props: ProFormCascaderProps) {
	return <Cascader {...props} />
}
export default withFormItem<ProFormCascaderProps>(ProFormCascader)
