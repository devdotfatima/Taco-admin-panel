import Header from "../components/Header";
import { useParams } from "react-router-dom";
import TruckDataTable from "../components/TruckDataTable";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { getUser } from "../api";
import UsersDataTable from "../components/UsersDataTable";
import { USER_ROLES } from "../utils/const";

const TruckOwnerDetail = () => {
  const { truckOwnerId } = useParams();
  const [loading, setLoading] = useState(true);
  const [truckOwnerDetails, setTruckOwnerDetails] = useState<any>(null);
  useEffect(() => {
    const fetchtruckOwnerDetails = async () => {
      if (truckOwnerId) {
        const response = await getUser(truckOwnerId);

        setTruckOwnerDetails(response.data);

        setLoading(false);
      }
    };

    fetchtruckOwnerDetails();
  }, [truckOwnerId]);
  return (
    <>
      {loading ? (
        <>
          <Header pageTitle={"Owner Information"} />
          <Loader />
        </>
      ) : (
        <>
          <Header pageTitle={truckOwnerDetails.userFullName} />

          <TruckDataTable truckOwnerId={truckOwnerId} />

          <UsersDataTable
            role={USER_ROLES.TRUCK_SUPERVISOR}
            truckOwnerId={truckOwnerId}
          />
        </>
      )}
    </>
  );
};

export default TruckOwnerDetail;
