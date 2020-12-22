import withDefaultProps from "@/hocs/withDefaultProps"
import { SearchOutlined, UpOutlined } from "@ant-design/icons"
import { Col, Form, Grid, Space } from "antd"
import React, { Children, memo, useEffect, useMemo, useState } from "react"
import classNames from "classnames"
import { BaseFormProps } from "../../type"
import BaseForm from "../BaseForm"
import { QFColSpan, QFColSpanArray } from "./QFColSpan"
import styles from "./style.module.scss"
// 查询筛选表单
// 未测试完全 可能有bug
// <QueryFilter submitConfig={{render:()=>null}} />
// 是否需要一个变量 用来决定是否渲染 submitter ?
// 暂时不需要x 不想起名√
// hasSubmitter
export interface QueryFilterProps extends BaseFormProps {
	collapsed: boolean
	defaultCollapsed?: boolean
	onCollapse?: (collapsed: boolean) => void
	layout?: "horizontal" | "horizontal"
	hasSubmitter: boolean
}
function QueryFilter(props: QueryFilterProps) {
	const {
		children,
		collapsed: propsCollapsed,
		defaultCollapsed,
		layout,
		onCollapse,
		submitConfig,
		hasSubmitter,
		...rest
	} = props
	const [collapsed, setCollapsed] = useState(() => propsCollapsed)

	// props controls collapsed
	useEffect(() => setCollapsed(propsCollapsed), [propsCollapsed])

	const childCount = useMemo(() => Children.count(children), [children])
	const breakpoints = Grid.useBreakpoint()
	const point = QFColSpanArray.find(([k]) => breakpoints[k] === true)

	// submitter col span
	const STColSpan = (() => {
		if (!point) return 24
		const maxCol = 24 / point[1]
		if (collapsed) {
			if (childCount >= maxCol) return point[1]
			return 24 - point[1] * childCount
		}
		const residue = Math.floor(childCount % maxCol)
		return 24 - point[1] * residue
	})()

	const handleCollapsed = () => {
		setCollapsed((p) => !p)
		onCollapse?.(!collapsed)
	}
	const submitter: BaseFormProps["submitConfig"] = {
		submitProps: {
			text: "查询",
			icon: <SearchOutlined />,
		},
		render: (dom) => {
			if (!hasSubmitter) return null
			return (
				<Col span={STColSpan} className='text-right px-4'>
					<Form.Item label=' ' colon={false}>
						<Space>
							{dom}
							<span
								className={styles.collapsed_trigger}
								onClick={handleCollapsed}
							>
								{collapsed ? "展开" : "收起"}
								<UpOutlined
									className={classNames(styles.trigger_icon, {
										[styles.collapsed]: collapsed,
									})}
								/>
							</span>
						</Space>
					</Form.Item>
				</Col>
			)
		},
		...submitConfig,
	}

	// 策略 默认 小屏幕 span = 12 中 span = 8 大 span = 6
	const renderChildren = useMemo(() => {
		let maxCol = Infinity
		if (collapsed && point) maxCol = Math.max(~~(24 / point[1]) - 1, 1)
		return Children.map(children as React.ReactElement[], (child, index) => {
			return (
				<Col
					className={classNames(styles.item_wrap, {
						[styles.item_hidden]: index >= maxCol,
					})}
					{...QFColSpan}
				>
					{child}
				</Col>
			)
		})
	}, [children, collapsed, point])

	if (childCount === 0) return null
	return (
		<BaseForm
			submitConfig={submitter}
			{...rest}
			layout={breakpoints.lg ? "horizontal" : "vertical"}
			className='flex flex-wrap'
		>
			{renderChildren}
		</BaseForm>
	)
}

export default memo(
	withDefaultProps(QueryFilter, {
		collapsed: true,
		requiredMark: false,
		hasSubmitter: true,
	})
)
