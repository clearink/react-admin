import { ComponentType } from "react"

// P 中都是必须
// D 是P中的默认值
export default function withDefaultProps<P extends object, D>(
	WrappedComponent: ComponentType<P>,
	defaultProps: D
) {
	WrappedComponent.defaultProps = defaultProps
	type Props = Omit<P, keyof D>// P中没有包含D的参数 则为必须的参数
	return WrappedComponent as ComponentType<Props & Partial<D>> // defaultProps 则为可选项了
}
// Omit 未包含
// Partial 变为可选项
// Pick 取出
