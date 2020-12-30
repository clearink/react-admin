import React, { memo, ReactNode, useMemo } from "react"
import styles from "./style.module.scss"
import TitleTip, { TitleTipProps } from "@/components/Pro/components/TitleTip"

import { Space } from "antd"
import { SpaceProps } from "antd/lib/space"
import GetValue from "@/utils/GetValue"

export interface ProFormGroupProps extends SpaceProps {
	title?: TitleTipProps["title"]
	renderTitle?: (title: ProFormGroupProps["title"]) => JSX.Element
	children?: ReactNode
}
function ProFormGroup(props: ProFormGroupProps) {
	const { title, renderTitle, children } = props
	const spaceProps = GetValue(props, spacePropsArray)

	const groupTitle = useMemo(() => {
		if (renderTitle) return renderTitle(title)
		return title && <TitleTip title={title} />
	}, [renderTitle, title])

	return (
		<div className={styles.form_group_wrapper}>
			<div className={styles.form_group_title}>{groupTitle}</div>
			<Space size={[32, 0]} wrap {...spaceProps}>
				{children}
			</Space>
		</div>
	)
}
export default memo(ProFormGroup)

const spacePropsArray: Array<keyof SpaceProps> = [
	"align",
	"direction",
	"size",
	"split",
	"wrap",
]
