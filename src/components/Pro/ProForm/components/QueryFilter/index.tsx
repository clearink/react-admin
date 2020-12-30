import withDefaultProps from "@/hocs/withDefaultProps"
import { SearchOutlined, UpOutlined } from "@ant-design/icons"
import { Col, Form, Grid, Space } from "antd"
import React, {
	Children,
	CSSProperties,
	memo,
	useLayoutEffect,
	useMemo,
	useState,
} from "react"
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
// 包裹一层div 以便处理样式
// 自己维护一个loading
export interface QueryFilterProps extends BaseFormProps {
	collapsed: boolean
	defaultCollapsed?: boolean
	onCollapse?: (collapsed: boolean) => void
	layout?: "horizontal" | "horizontal"
	hasSubmitter: boolean
	ghost: boolean
	className?: string
	style?: CSSProperties
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
		ghost,
		className,
		style,
		...rest
	} = props
	const [collapsed, setCollapsed] = useState(() => propsCollapsed)

	// props controls collapsed
	useLayoutEffect(() => setCollapsed(propsCollapsed), [propsCollapsed])

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
		...submitConfig,
		render: (dom, form) => {
			if (!hasSubmitter) return null
			const renderDOM = (
				<Col span={STColSpan} className='text-right px-4'>
					{/* TODO: 24 可能 是会变化的 */}
					<Form.Item label={STColSpan === 24 ? null : " "} colon={false}>
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
			if (submitConfig?.render)
				return submitConfig?.render([renderDOM], form, props)
			return renderDOM
		},
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
		<div
			className={classNames(styles.query_filter_wrap, className, {
				[styles.ghost]: ghost,
			})}
			style={style}
		>
			<BaseForm
				submitConfig={submitter}
				layout={breakpoints.lg ? "horizontal" : "vertical"}
				{...rest}
				className={"flex flex-wrap"}
			>
				{renderChildren}
			</BaseForm>
		</div>
	)
}

export default memo(
	withDefaultProps(QueryFilter, {
		collapsed: true,
		requiredMark: false,
		hasSubmitter: true,
		ghost: false,
	})
)
