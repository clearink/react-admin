import BoundAction from "@/utils/BoundAction"
import { LoadStart, LoadEnd } from "./loading"
import { LoginAction, LogoutAction, SaveUser, GetUserInfo } from "./user"

export default {
	LoadStart: BoundAction(LoadStart),
	LoadEnd: BoundAction(LoadEnd),
	LoginAction: BoundAction<Function>(LoginAction),
	LogoutAction: BoundAction(LogoutAction),
	SaveUser: BoundAction(SaveUser),
	GetUserInfo: BoundAction<Function>(GetUserInfo),
}
