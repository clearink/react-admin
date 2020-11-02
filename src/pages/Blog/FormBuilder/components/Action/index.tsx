import React from "react"
import { Layout } from "antd"
import classNames from "classnames"
import styles from "./style.module.scss"
const { Content } = Layout
interface IProps {}
function Action(props: IProps) {
	return <Content className={classNames(styles.container)}>
		{Array.from({length:100},(_,i)=><div>{i}</div>)}
	</Content>
}

export default Action
