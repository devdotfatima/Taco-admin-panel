import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuItemsDataTable from "../components/MenuItemsDataTable";
import AddonsDataTable from "../components/AddonsDataTable";
import ExtrasDataTable from "../components/ExtrasDataTable";
import { getTruckDetails } from "../api";
import Header from "../components/Header";

const TruckDetails = () => {
  const { truckId } = useParams();
  const [loading, setLoading] = useState(true);
  const [truckDetails, setTruckDetails] = useState<any>(null);

  useEffect(() => {
    const fetchTruckDetails = async () => {
      if (truckId) {
        const truckData = await getTruckDetails(truckId);
        setTruckDetails(truckData[0]);

        setLoading(false);
      } else {
      }
    };

    fetchTruckDetails();
  }, [truckId]);
  return (
    <>
      <Header pageTitle="Truck Information" />
      {loading ? (
        <>Loading</>
      ) : (
        <>
          <div>{truckDetails.truckName}</div>
          <MenuItemsDataTable truckId={truckId || ""} />
          <AddonsDataTable truckId={truckId || ""} />
          <ExtrasDataTable truckId={truckId || ""} />
        </>
      )}
    </>
  );
};

export default TruckDetails;
