import { Client } from "../pages/NewUser";

export const createInputForClient = (data: Client) => {
  const { firstName,
    lastName,
    cedula,
    cellphone } = data
  return {
    firstName,
    lastName,
    cedula,
    cellphone,
    address: { streetAddress: data.address, city: data.city }
  }
}
