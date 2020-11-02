import React from "react"
import { Layout } from "antd"
import styles from "./style.module.scss"

const { Header } = Layout

interface IProps {}
function HeaderComponent(props: IProps) {
	return <Header className={styles.header}>header</Header>
}

export default HeaderComponent
