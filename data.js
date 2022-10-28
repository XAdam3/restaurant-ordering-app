import { v4 as uuid } from "https://jspm.dev/uuid";

const menuArray = [
  {
    name: "Pizza",
    ingredients: ["pepperoni, mushrom, mozarella"],
    id: 0,
    uuid: uuid(),
    price: 14,
    emoji: "🍕",
  },
  {
    name: "Hamburger",
    ingredients: ["beef, cheese, lettuce"],
    price: 12,
    emoji: "🍔",
    uuid: uuid(),
    id: 1,
  },
  {
    name: "Dr.Pepper",
    ingredients: ["Soft drink"],
    price: 3,
    emoji: "🥤",
    uuid: uuid(),
    id: 2,
  },
];

export default menuArray;
