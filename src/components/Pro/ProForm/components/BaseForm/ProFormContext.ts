import { ButtonProps } from "antd/lib/button"
import { FormInstance } from "antd/lib/form"
import React from "react"
// 只有一个作用 传递  form 给 子组件
export default React.createContext<{
	form?: FormInstance
	loading?: ButtonProps["loading"]
}>({})
