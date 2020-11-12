import { IBaseProps } from "@/@types/fc"
import { Spin } from "antd"
import React, { ComponentType, PureComponent, Suspense } from "react"
export default function withLazyLoad(WrappedComponent: ComponentType<any>) {
	class Hoc extends PureComponent<IBaseProps> {
		render() {
			return (
				<Suspense
					fallback={
						<div className='flex justify-center items-center w-full h-64'>
							<Spin size='large' />
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
