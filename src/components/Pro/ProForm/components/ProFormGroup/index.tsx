import React, { Children, memo, ReactNode, useMemo } from "react"
import TitleTip, { TitleTipProps } from "@/components/Pro/components/TitleTip"
import classNames from "classnames"

import styles from "./style.module.scss"

export interface ProFormGroupProps {
	title?: TitleTipProps["title"]
	renderTitle?: (title: ProFormGroupProps["title"]) => JSX.Element
	children?: ReactNode
	className?: string
	style?: React.CSSProperties
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
			<div
				{...rest}
				className={classNames(styles.children_wrap, rest.className)}
			>
				{Children.map(children, (child, index) => {
					return (
						<div key={index} className={styles.item}>
							{child}
						</div>
					)
				})}
			</div>
		</div>
	)
}
export default memo(ProFormGroup)
