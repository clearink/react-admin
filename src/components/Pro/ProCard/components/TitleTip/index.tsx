import React, { ReactNode, useMemo } from "react"
import { Space, Tooltip } from "antd"
import { TooltipProps } from "antd/lib/tooltip"
import styles from "./style.module.scss"
import { InfoCircleOutlined } from "@ant-design/icons"
import { isString } from "@/utils/validate"
/**
 * title 属性后跟一个 tooltip 提示文案
 */
interface TitleTipProps {
	title: ReactNode
	tooltip?: string | TooltipProps
}
function TitleTip(props: TitleTipProps) {
	const { tooltip, title } = props
	const tooltipProps = useMemo(() => {
		if (isString(tooltip)) return { title: tooltip }
		return tooltip as TooltipProps
	}, [tooltip])
	if (!tooltip) return <>{title}</>
	return (
		<>
			<span className={styles.title}>{title}</span>
			<Tooltip {...tooltipProps}>
				<InfoCircleOutlined className={styles.icon} />
			</Tooltip>
		</>
	)
}

export default TitleTip
