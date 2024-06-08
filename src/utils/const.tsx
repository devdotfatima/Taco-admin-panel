import { FaHome, FaTruck, FaUsers } from "react-icons/fa";
import { CardT, FoodCategoriesT, GenderT } from "./types";
import { TbTruck } from "react-icons/tb";
import { SiJusteat } from "react-icons/si";
import { GoTasklist } from "react-icons/go";
import { MdOutlineSupervisorAccount } from "react-icons/md";

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
    title: "Trucks Supervisors",
    icon: <MdOutlineSupervisorAccount size={18} />,
    link: "/supervisors",
  },
  {
    title: "Trucks Owners",
    icon: <FaUsers size={18} />,
    link: "/owners",
  },
  {
    title: "Customers",
    icon: <SiJusteat size={18} />,
    link: "/customers",
  },
];

export const cards: CardT[] = [
  {
    cardData: "400",
    cardTitle: "Total Food Trucks",
    cardIcon: <TbTruck size={30} />,
    link: "/trucks",
  },
  {
    cardData: "1700",
    cardTitle: "Total Orders",
    cardIcon: <GoTasklist size={30} />,
    link: "/orders",
  },
  {
    cardData: "10",
    cardTitle: "Total Truck Supervisors",
    cardIcon: <MdOutlineSupervisorAccount size={30} />,
    link: "/supervisors",
  },
  {
    cardData: "300",
    cardTitle: "Total Truck Owners",
    cardIcon: <FaUsers size={30} />,
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
  CUSTOMERS: "Customer",
} as const;
