import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import BaseConfig from "@/configs/BaseConfig"
import BaseMateriel from "./BaseMateriel"
// 绑定拖拽

function BaseMaterielList() {
	// const list = useCacheSelector(selectors.selectMateriel, "base")
	// console.log(list)
	return (
		<div className={classNames(styles.container)}>
			{BaseConfig.map((config) => (
				<BaseMateriel key={config.type} config={config as any} />
			))}
		</div>
	)
}

export default memo(BaseMaterielList)
