import React, { ReactNode, useMemo } from "react"
import { Tooltip } from "antd"
import { TooltipProps } from "antd/lib/tooltip"
import styles from "./style.module.scss"
import { InfoCircleOutlined } from "@ant-design/icons"
import { isString } from "@/utils/validate"
/**
 * title 属性后跟一个 tooltip 提示文案
 * TODO 只传入一个 title字段
 */
export interface TitleTipProps {
	title?: { title: ReactNode; tooltip?: string | TooltipProps } | string
}
function TitleTip(props: TitleTipProps) {
	const { title } = props
	const [T, tooltipProps] = useMemo(() => {
		if (!title) return [undefined, undefined]
		if (typeof title === "string") return [title, undefined]
		if (isString(title?.tooltip)) return [title.title, { title: title.tooltip }]
		return [title.title, title.tooltip as TooltipProps]
	}, [title])
	if (!tooltipProps) return <>{T}</>
	return (
		<span>
			<span className={styles.title}>{T}</span>
			<Tooltip {...tooltipProps}>
				<InfoCircleOutlined className={styles.icon} />
			</Tooltip>
		</span>
	)
}

export default TitleTip
