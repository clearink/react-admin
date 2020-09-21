import { IBaseProps } from "@/@types/fc"
import { Spin } from "antd"
import React, { ComponentType, PureComponent, Suspense } from "react"
export default function WithLazyLoad(WrappedComponent: ComponentType<any>) {
	class Hoc extends PureComponent<IBaseProps> {
		private displayName = `HOC ${WrappedComponent.displayName}`

		componentDidMount() {
			console.log(this.displayName)
		}

		render() {
			return (
				<Suspense
					fallback={
						<div className='min-h-screen w-screen flex justify-center items-center'>
							<Spin />
						</div>
					}
				>
					<WrappedComponent {...this.props} />
				</Suspense>
			)
		}
	}
	return Hoc
}
