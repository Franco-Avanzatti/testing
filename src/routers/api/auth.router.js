import CustomRouter from "../../helpers/CustomRouter.helper.js";
import { register, login,logout} from "../../controllers/auth.controller.js"
import passportCb from "../../middlewares/passportCb.mid.js";

class AuthRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.create("/logout",["USER" , "ADMIN"], logout);
  };
}

const authRouter = new AuthRouter();
export default authRouter.getRouter();