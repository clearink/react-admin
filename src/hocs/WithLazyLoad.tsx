import { IBaseProps } from "@/@types/fc"
import { Spin } from "antd"
import React, { ComponentType, PureComponent, Suspense } from "react"
export default function WithLazyLoad(WrappedComponent: ComponentType<any>) {
	class Hoc extends PureComponent<IBaseProps> {
		render() {
			return (
				<Suspense
					fallback={
						<div className='flex justify-center items-center w-full min-h-full'>
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
