import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMenuItemDetail } from "../api";
import Header from "../components/Header";
import Loader from "../components/Loader";

const MenuItemDetail = () => {
  const { menuItemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [menuItemDetail, setMenuItemDetail] = useState<any>(null);

  useEffect(() => {
    if (menuItemId) {
      const fetchMenuItemDetail = async () => {
        setLoading(true);
        const response = await getMenuItemDetail(menuItemId);
        setMenuItemDetail(response.data);
        setLoading(false);
      };

      fetchMenuItemDetail();
    }
  }, [menuItemId]);

  if (loading) {
    return <Loader />;
  }

  if (!menuItemDetail) {
    return <div>Error fetching menu item detail.</div>;
  }

  const {
    name,
    price,
    description,
    categoryType,
    truckId,
    ingredients,
    basicPackageName,
    basicPackagePrice,
    comboDealPackageName,
    comboDealPackagePrice,
    availability,
    foodItemImg,
  } = menuItemDetail;

  console.log(menuItemDetail);

  return (
    <>
      <Header pageTitle={name} />

      <div className="m-0 mx-auto bg-white rounded-lg shadow-lg sm:m-4 ">
        <img
          className="object-cover w-full h-64 md:h-96"
          src={foodItemImg}
          alt={name}
        />
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">{name}</div>
          <p className="text-base text-gray-700">{description}</p>
        </div>
        <div className="px-6 py-2">
          <div className="flex flex-col justify-between gap-3 mb-2 sm:flex-row">
            <span className="font-semibold text-gray-500">Price:</span>
            <span className="text-gray-900">{price}</span>
          </div>
          <div className="flex flex-col justify-between gap-3 mb-2 sm:flex-row">
            <span className="font-semibold text-gray-500">Category:</span>
            <span className="text-gray-900 capitalize">{categoryType}</span>
          </div>
          <div className="flex flex-col justify-between gap-3 mb-2 sm:flex-row">
            <span className="font-semibold text-gray-500">Truck ID:</span>
            <span className="text-gray-900">{truckId}</span>
          </div>
          <div className="flex flex-col justify-between gap-3 mb-2 sm:flex-row">
            <span className="font-semibold text-gray-500">Ingredients:</span>
            <span className="text-gray-900">{ingredients}</span>
          </div>
          <div className="flex flex-col justify-between gap-3 mb-2 sm:flex-row">
            <span className="font-semibold text-gray-500">Basic Deal:</span>
            <span className="text-gray-900">
              {basicPackageName} - {basicPackagePrice}
            </span>
          </div>
          <div className="flex flex-col justify-between gap-3 mb-2 sm:flex-row">
            <span className="font-semibold text-gray-500">Combo Deal:</span>
            <span className="text-gray-900">
              {comboDealPackageName} - {comboDealPackagePrice}
            </span>
          </div>
          <div className="flex flex-col justify-between gap-3 sm:flex-row">
            <span className="font-semibold text-gray-500">Available:</span>
            <span className={`text-${availability ? "green" : "red"}-600`}>
              {availability ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuItemDetail;
