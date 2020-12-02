import React, { memo } from "react"
import classNames from "classnames"
import styles from "./style.module.scss"
import BaseConfig from "@/configs/BaseConfig"
import BaseMateriel from "./BaseMateriel"
import ConfigUtils from "@/utils/ConfigUtils"
const BaseConfigList = ConfigUtils.getList(BaseConfig)
// 绑定拖拽
function BaseMaterielList() {
	// const list = useCacheSelector(selectors.selectMateriel, "base")
	// console.log(list)
	return (
		<div className={classNames(styles.container)}>
			{BaseConfigList.map((config) => (
				<BaseMateriel key={config.type} {...config} />
			))}
		</div>
	)
}

export default memo(BaseMaterielList)
