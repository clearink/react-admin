import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import BaseConfig from "@/configs/BaseConfig"
import BaseMateriel from "./BaseMateriel"
import useCacheSelector from "@/hooks/useCacheSelector"
import { selectors } from "@/store/reducers/materiel"
const materielList = BaseConfig.list
console.log(materielList);
// 绑定拖拽

function BaseMaterielList() {
	// const list = useCacheSelector(selectors.selectMateriel, "base")
	// console.log(list)
	return (
		<div className={classNames(styles.container)}>
			{materielList.map((config) => (
				<BaseMateriel key={config.type} config={config} />
			))}
		</div>
	)
}

export default memo(BaseMaterielList)
