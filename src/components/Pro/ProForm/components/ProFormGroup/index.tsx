import React, { memo, ReactNode, useMemo } from "react"
import styles from "./style.module.scss"
import TitleTip, { TitleTipProps } from "@/components/Pro/components/TitleTip"

import { Space } from "antd"
import { SpaceProps } from "antd/lib/space"

export interface ProFormGroupProps extends SpaceProps {
	title?: TitleTipProps["title"]
	renderTitle?: (title: ProFormGroupProps["title"]) => JSX.Element
	children?: ReactNode
}
function ProFormGroup(props: ProFormGroupProps) {
	const { title, renderTitle, children, ...rest } = props

	const groupTitle = useMemo(() => {
		if (renderTitle) return renderTitle(title)
		return title && <TitleTip title={title} />
	}, [renderTitle, title])

	return (
		<div className={styles.form_group_wrapper}>
			{title && <div className={styles.form_group_title}>{groupTitle}</div>}
			<Space size={[32, 0]} wrap {...rest}>
				{children}
			</Space>
		</div>
	)
}
export default memo(ProFormGroup)
