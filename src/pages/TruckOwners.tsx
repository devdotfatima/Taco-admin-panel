import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { USER_ROLES } from "../utils/const";
import UsersDataTable from "../components/UsersDataTable";

const TruckOwners = () => {
  const location = useLocation();
  const endpoint = location.pathname;

  const pageTitle =
    endpoint === "/customers"
      ? "Customers"
      : endpoint === "/owners"
      ? "Truck Owners"
      : endpoint === "/supervisors"
      ? "Truck Supervisors"
      : null;

  const role =
    endpoint === "/customers"
      ? USER_ROLES.CUSTOMERS
      : endpoint === "/owners"
      ? USER_ROLES.TRUCK_OWNER
      : endpoint === "/supervisors"
      ? USER_ROLES.TRUCK_SUPERVISOR
      : USER_ROLES.TRUCK_OWNER;
  return (
    <>
      <Header pageTitle={pageTitle || ""} />
      <UsersDataTable role={role} />
    </>
  );
};

export default TruckOwners;
