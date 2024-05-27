import { GeoPoint } from "firebase/firestore";

export type ModalT = {
  visible: boolean;
  updateVisibility: (visible: boolean) => void;
};

export type MenuModalT = ModalT & {
  truckId: string;
  itemToEdit?: MenuItemT;
};

export type ExtraModalT = ModalT & {
  truckId: string;
  itemToEdit?: ExtraItemT;
};

export type AddonModalT = ModalT & {
  truckId: string;
  itemToEdit?: AddOnItemT;
};

export type TruckModalT = ModalT & {
  truckOwnerId: string;
  itemToEdit?: TruckT;
};

export type DeleteConfirmationModalT = ModalT & {
  selectedId: string;
  onConfirm: () => void;
};

export type GenderT = {
  name: string;
  code: string;
};

export type FoodCategoriesT = {
  name: string;
  code: string;
};

export type UserT = {
  userDOB?: Date;
  userEmail: string;
  userFullName: string;
  userGender?: string;
  userId: string;
  userPhone: string;
  userProfileImg?: string;
  userRole: string;
  userPassword?: string;
};

export type MenuItemT = {
  basicPackageName: string;
  basicPackagePrice: string;
  categoryType: string;
  comboDealPackageName: string;
  comboDealPackagePrice: string;
  date: Date;
  description: string;
  docId: string;
  ingredients: string;
  name: string;
  price: string;
  supervisorId: string;
  availability: boolean;
};

export type ExtraItemT = {
  available: boolean;
  date: Date;
  docId: string;
  extraFoodName: string;
  extraFoodPrice: string;
  truckId: string;
};

export type AddOnItemT = {
  addonName: string;
  addonPrice: string;
  available: boolean;
  date: Date;
  docId: string;
  truckId: string;
};

export type TruckT = {
  date?: Date;
  email: string;
  truckAddress: string;
  truckId?: string;
  truckName: string;
  truckOwnerId?: string;
  truckSupervisorName: string;
  truckGeoHash?: {
    geohash: string;
    geopoint: GeoPoint;
  };

  truckLatLng: GeoPoint;
};
