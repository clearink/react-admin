import React from "react"
import { Layout } from "antd"
import classNames from "classnames"
import styles from "./style.module.scss"
import TickMark from "../TickMark"
const { Content } = Layout
interface IProps {}
function Action(props: IProps) {
	return (
		<Content className={classNames(styles.container)}>
			<div className={styles.tickMark__horizontal}>
				<TickMark
					className='ml-20 absolute'
					end={1350}
					markStep={5}
					step={50}
				/>
				<TickMark
					className='mt-20 absolute'
					vertical
					end={1050}
					markStep={5}
					step={50}
				/>
			</div>
			<div className={styles.tickMark__horizontal}></div>
		</Content>
	)
}

export default Action
