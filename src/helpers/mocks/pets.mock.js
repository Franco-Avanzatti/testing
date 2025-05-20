import { faker } from "@faker-js/faker";

const createMockPet = () => {
  const names = ["Toby", "Luna", "Coco", "Milo", "Nina", "Max", "Lola"];
  const species = ["Perro", "Gato", "Conejo", "Loro"];
  const owner = faker.database.mongodbObjectId();

  return {
    name: faker.helpers.arrayElement(names),
    species: faker.helpers.arrayElement(species),
    birthdate: faker.date.birthdate(),
    adopted: faker.datatype.boolean(),
    owner // suponiendo que el modelo lo requiere
  };
};

export default createMockPet;
