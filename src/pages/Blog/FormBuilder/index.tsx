import { IBaseProps } from "@/@types/fc"
import React from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { Layout } from "antd"
import { Materiel, Header, Attribute, Action } from "./components"

function FormBuilder(props: IBaseProps) {
	return (
		<Layout className={classNames(styles.container)}>
			<Header />
			<Layout className={classNames(styles.layout)}>
				<Materiel />
				<Action />
				<Attribute />
			</Layout>
		</Layout>
	)
}

export default FormBuilder
