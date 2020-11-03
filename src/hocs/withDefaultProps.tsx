import { ComponentType } from "react"

// P 中都是必须
// D 是P中的默认值
export default function withDefaultProps<P extends object, D>(
	WrappedComponent: ComponentType<P>,
	defaultProps: D
) {
	WrappedComponent.defaultProps = defaultProps
	type Props = Omit<P, keyof D>
	return WrappedComponent as ComponentType<Props & Partial<D>>
}
// Omit 未包含
// Partial 变为可选项
// Pick 取出
