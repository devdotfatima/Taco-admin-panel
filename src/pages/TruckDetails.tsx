import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuItemsDataTable from "../components/MenuItemsDataTable";
import AddonsDataTable from "../components/AddonsDataTable";
import ExtrasDataTable from "../components/ExtrasDataTable";
import { getTruckDetails } from "../api";
import Header from "../components/Header";
import Loader from "../components/Loader";

const TruckDetails = () => {
  const { truckId } = useParams();
  const [loading, setLoading] = useState(true);
  const [truckDetails, setTruckDetails] = useState<any>(null);

  useEffect(() => {
    const fetchTruckDetails = async () => {
      if (truckId) {
        const response = await getTruckDetails(truckId);
        console.log(response);

        setTruckDetails(response.data[0]);

        setLoading(false);
      }
    };

    fetchTruckDetails();
  }, [truckId]);
  return (
    <>
      {loading ? (
        <>
          <Header pageTitle={"Truck Information"} />
          <Loader />
        </>
      ) : (
        <>
          <Header pageTitle={truckDetails.truckName} />
          <MenuItemsDataTable truckId={truckId || ""} />
          <AddonsDataTable truckId={truckId || ""} />
          <ExtrasDataTable truckId={truckId || ""} />
        </>
      )}
    </>
  );
};

export default TruckDetails;
