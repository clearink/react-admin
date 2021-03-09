import React from "react"
import styles from "./style.module.scss"

export interface TimeSelectProps {
	render?: (data: any[]) => React.ReactNode
}
function TimeSelect(props: TimeSelectProps) {
	const { render } = props
  return <div>123</div>
}
export default TimeSelect
