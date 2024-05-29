import { FaHome, FaTruck, FaUsers } from "react-icons/fa";
import { CardT, FoodCategoriesT, GenderT } from "./types";
import { TbTruck } from "react-icons/tb";
import { GoTasklist } from "react-icons/go";
import { BiGroup } from "react-icons/bi";
import { MdOutlinePendingActions } from "react-icons/md";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: <FaHome size={18} />,
    link: "/",
  },
  {
    title: "Food Trucks",
    icon: <FaTruck size={18} />,
    link: "/trucks",
  },
  {
    title: "Trucks Owners",
    icon: <FaUsers size={18} />,
    link: "/owners",
  },
];

export const cards: CardT[] = [
  {
    cardData: "400",
    cardTitle: "Food Trucks",
    cardIcon: <TbTruck size={30} />,
    link: "/trucks",
  },
  {
    cardData: "1700",
    cardTitle: "Orders",
    cardIcon: <GoTasklist size={30} />,
    link: "/orders",
  },
  {
    cardData: "10",
    cardTitle: "Pending Truck Owners",
    cardIcon: <MdOutlinePendingActions size={30} />,
    link: "/owners",
  },
  {
    cardData: "300",
    cardTitle: "Total Truck Owners",
    cardIcon: <BiGroup size={30} />,
    link: "/owners",
  },
];

export const categories: FoodCategoriesT[] = [
  { name: "Burger", code: "burgers" },
  { name: "Taco", code: "tacos" },
  { name: "Hotdog", code: "hotdogs" },
  { name: "Wings", code: "wings" },
];

export const genders: GenderT[] = [
  { name: "Male", code: "Male" },
  { name: "Female", code: "Female" },
  { name: "Other", code: "Other" },
];

export const COLLECTIONS = {
  TRUCKS: "trucks",
  TRUCK_FOOD_MENU: "truck_food_menu",
  FOOD_EXTRAS: "food_extras",
  FOOD_ADDONS: "food_addons",
  USERS: "users",
} as const;

export const USER_ROLES = {
  TRUCK_OWNER: "TruckOwner",
  TRUCK_SUPERVISOR: "TruckSupervisor",
} as const;
