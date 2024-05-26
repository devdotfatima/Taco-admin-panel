import { FaHome, FaTruck, FaUsers } from "react-icons/fa";
import { FoodCategoriesT, GenderT } from "./types";

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
