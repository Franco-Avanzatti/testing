import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

faker.locale = "es";

const createMockUser = () => {
  const roles = ["USER", "ADMIN", "PREM"];
  const first_name = faker.person.firstName();
  const last_name = faker.person.lastName();
  const email = `${first_name.toLowerCase()}.${last_name.toLowerCase()}@coder.com.ar`;
  const password = bcrypt.hashSync("coder123", 10); // Encriptado
  const avatar = faker.image.urlLoremFlickr({
    category: "nature",
    width: 360,
    height: 360,
  });
  const city = faker.location.city();
  const birthdate = faker.date.birthdate();
  const role = roles[Math.floor(Math.random() * roles.length)];
  const pets = [];

  return {
    first_name,
    last_name,
    email,
    password,
    avatar,
    city,
    birthdate,
    role,
    pets
  };
};

export default createMockUser;
