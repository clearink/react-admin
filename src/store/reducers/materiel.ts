// 物料区
import {
	createSlice,
	createSelector,
	createAsyncThunk,
	createEntityAdapter,
} from "@reduxjs/toolkit"
import { AppState } from ".."
import BaseConfig from "@/configs/BaseConfig"

type TComponentConfig = {
	type: string
	name: string
	cover: string
	config: {
		type: string
		name: string
		value?: any[]
		default: any
	}
}

const materielAdapter = createEntityAdapter<TComponentConfig>()
const fetchMateriel = createAsyncThunk<TComponentConfig[]>(
	"builder-materiel/getBase",
	async () => {
		return new Promise<TComponentConfig[]>((resolve, reject) => {
			setTimeout(() => {
				resolve(BaseConfig.list)
			}, 400)
		})
	}
)
const slice = createSlice({
	name: "builder-materiel",
	initialState: materielAdapter.getInitialState({
		loading: false,
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMateriel.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchMateriel.fulfilled, (state, action) => {
				state.loading = false
				materielAdapter.addMany(state, action.payload)
			})
			.addCase(fetchMateriel.rejected, (state) => {
				state.loading = false
			})
	},
})
export const actions = { ...slice.actions, fetchMateriel }
export default slice.reducer

// 创建 selector
/**
 * 缓存 selector 可以避免不必要的渲染
 */
export const selectors = {
	selectMateriel: () =>
		createSelector(
			[
				(state: AppState) => state.materiel,
				(_: any, category: string) => category,
			],
			(materiel: AppState["materiel"], category) => {
				console.log("selectMateriel", materiel, category)
				return materiel.entities
			}
		),
}
