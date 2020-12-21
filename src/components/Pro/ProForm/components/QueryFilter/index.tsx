import withDefaultProps from "@/hocs/withDefaultProps"
import React, { memo } from "react"
import { BaseFormProps } from "../../type"
import BaseForm from "../BaseForm"
// 查询筛选表单
// 主要是处理各种控件的样式
interface QueryFilterProps extends BaseFormProps {
	collapsed: boolean
	defaultCollapsed?: boolean
	onCollapse?: (collapsed: boolean) => void
}
function QueryFilter(props: QueryFilterProps) {
  const { children, collapsed, defaultCollapsed, onCollapse, ...rest } = props
  
	return <BaseForm {...rest}>{children}</BaseForm>
}

export default memo(
	withDefaultProps(QueryFilter, {
		collapsed: false,
	})
)
