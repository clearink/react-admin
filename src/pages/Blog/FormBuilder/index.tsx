import { IBaseProps } from "@/@types/fc"
import React from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import { Layout } from "antd"
import { Materiel, Header, Attribute, Action } from "./components"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

function FormBuilder(props: IBaseProps) {
	return (
		<Layout className={classNames(styles.container)}>
			<Header />
			<Layout className={classNames(styles.layout)}>
				<DndProvider backend={HTML5Backend}>
					<Materiel />
					<Action />
					<Attribute />
				</DndProvider>
			</Layout>
		</Layout>
	)
}

export default FormBuilder
