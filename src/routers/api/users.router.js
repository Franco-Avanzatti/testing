import CustomRouter from "../../helpers/CustomRouter.helper.js";
import { usersController } from "../../controllers/controller.js";

class UsersRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["PUBLIC" ,"ADMIN"], usersController.createOne);
    this.read("/", ["ADMIN", "USER", "PUBLIC"], usersController.readAll);
    this.read("/:id", ["USER", "ADMIN", "PUBLIC"], usersController.readById);
    this.update("/:id", ["ADMIN"], usersController.updateById);
    this.destroy("/:id", ["ADMIN"], usersController.destroyById);
  };
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();