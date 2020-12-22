import withDefaultProps from "@/hocs/withDefaultProps"
import { SearchOutlined, UpOutlined } from "@ant-design/icons"
import { Col, Form, Grid, Space } from "antd"
import React, { Children, memo, useMemo } from "react"
import { BaseFormProps } from "../../type"
import BaseForm from "../BaseForm"
// 查询筛选表单
// TODO: 收起时 查询的状态
const screenWithColSpan = {
	xxl: 6,
	xl: 8,
	lg: 12,
	md: 12,
	sm: 24,
	xs: 24,
}

interface QueryFilterProps extends BaseFormProps {
	collapsed: boolean
	defaultCollapsed?: boolean
	onCollapse?: (collapsed: boolean) => void
	layout?: "horizontal" | "horizontal"
}
function QueryFilter(props: QueryFilterProps) {
	const {
		children,
		collapsed,
		defaultCollapsed,
		layout,
		onCollapse,
		submitConfig,
		...rest
	} = props
	const breakpoints = Grid.useBreakpoint()

	const submitterSpan = (() => {
		const point = Object.entries(screenWithColSpan).find(
			([k]) => breakpoints[k] === true
		)
		const childCount = Children.count(children)
		if (point) {
			const maxCol = 24 / point[1]
			const residue = Math.floor(childCount % maxCol)
			if (residue === 0) return 24 // 占满了 直接下一行
			return 24 - point[1] * residue
		}
		// 收起状态
		if (collapsed) return 8
		return 24
	})()
	const submitter = useMemo<BaseFormProps["submitConfig"]>(() => {
		return {
			submitProps: {
				text: "查询",
				icon: <SearchOutlined />,
			},
			render: (dom) => {
				//需要计算出 submitter 的 span 以便使其一直在最右边
				return (
					<Col span={submitterSpan} className='text-right px-4 relative'>
						<Form.Item label=' ' colon={false}>
							<Space>
								{dom}
								<span className='overflow-hidden'>
									展开
									<UpOutlined />
								</span>
							</Space>
						</Form.Item>
					</Col>
				)
			},
		}
	}, [submitterSpan])

	// 策略 默认 小屏幕 span = 12 中 span = 8 大 span = 6
	const renderChildren = useMemo(() => {
		return Children.map(children, (child) => {
			return (
				<Col className='px-4 ' {...screenWithColSpan}>
					{child}
				</Col>
			)
		})
	}, [children])
	return (
		<BaseForm
			{...rest}
			layout={breakpoints.lg ? "horizontal" : "vertical"}
			submitConfig={submitter}
			className='flex flex-wrap'
		>
			{renderChildren}
		</BaseForm>
	)
}

export default memo(
	withDefaultProps(QueryFilter, {
		collapsed: false,
	})
)
