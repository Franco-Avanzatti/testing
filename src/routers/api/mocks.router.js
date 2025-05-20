import CustomRouter from "../../helpers/CustomRouter.helper.js";
import createMockProduct from "../../helpers/mocks/products.mock.js";
import createMockUser from "../../helpers/mocks/users.mock.js";
import createMockPet from "../../helpers/mocks/pets.mock.js";
import { productsService, usersService, petsService } from "../../services/service.js";

class MocksRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/mockingusers", ["PUBLIC"], async (req, res) => {
      let users = [];
      for (let i = 0; i < 50; i++) {
        users.push(createMockUser());
      }
      res.status(200).json(users);
    });
    this.create("/generateData", ["PUBLIC"], async (req, res) => {
      const { users = 0, pets = 0 } = req.body;

      for (let i = 0; i < users; i++) {
        const user = createMockUser();
        await usersService.createOne(user);
      }

      for (let i = 0; i < pets; i++) {
        const pet = createMockPet();
        await petsService.createOne(pet);
      }

      res.status(201).json({
        message: "Datos generados exitosamente",
        users,
        pets
      });
    });
    this.read("/mockingpets/:n", ["PUBLIC"], async (req, res) => {
      const { n } = req.params;
      let pets = [];
      for (let i = 0; i < n; i++) {
        pets.push(createMockPet());
      }
      res.status(200).json(pets);
    });
    this.read("/products/:n", ["PUBLIC"], async (req, res) => {
      const { n } = req.params;
      const products = [];

      for (let index = 0; index < n; index++) {
        const one = createMockProduct();
        const created = await productsService.createOne(one);
        products.push(created);
      }

      res.status(201).json({
        message: `Se generaron ${n} productos mock`,
        products,
      });
    });
    this.read("/users/:n", ["PUBLIC"], async (req, res) => {
      const { n } = req.params;
      for (let index = 0; index < n; index++) {
        const one = createMockUser();
        await usersService.createOne(one);
      }
      res.json201({ mocks: n });
    });
  };
}

const mocksRouter = new MocksRouter();
export default mocksRouter.getRouter();