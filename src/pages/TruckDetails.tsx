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

  // const addonsheader = (
  //   <div className="flex justify-between w-full ">
  //     <h2 className="text-xl">Add ons</h2>
  //     <button
  //       onClick={() => updateMenuModalVisibility(true)}
  //       className="flex items-center px-3 py-1.5 text-sm font-medium text-white rounded bg-carrot "
  //     >
  //       Add Add-ons
  //     </button>
  //   </div>
  // );

  useEffect(() => {
    const fetchTruckDetails = async () => {
      if (truckId) {
        const truckData = await getTruckDetails(truckId);
        // const truckMenu = await getTruckMenuItems(truckId);
        setTruckDetails(truckData[0]);
        // setTruckMenuItems(truckMenu);
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

          {/* <DataTable
            value={truckMenuItems}
            pt={{
              header: {
                className: "mt-10 border-0 px-6",
              },
            }}
            className="text-black"
            paginator
            rows={10}
            dataKey="id"
            showGridlines={true}
            filterDisplay="row"
            loading={loading}
            globalFilterFields={["price", "name"]}
            header={addonsheader}
            emptyMessage="No Menu Items found."
          >
            <Column
              header="Id"
              field="docId"
              pt={{
                headerContent: {
                  className: " flex justify-center ",
                },
              }}
              className="text-center text-sm border-[1px] bg-white"
              filter
              filterPlaceholder="Filter By ID"
            />
            <Column
              header="Name"
              field="name"
              pt={{
                headerContent: {
                  className: " flex justify-center ",
                },
              }}
              className="text-center text-sm border-[1px] bg-white"
              filter
              filterPlaceholder="Filter By Name"
            />
            <Column
              header="Price"
              field="price"
              pt={{
                headerContent: {
                  className: " flex justify-center ",
                },
              }}
              className="text-center text-sm border-[1px] bg-white truncate"
              filter
              filterPlaceholder="Filter By Price"
              style={{ maxWidth: "12rem" }}
            />

            <Column
              style={{ flex: "0 0 4rem" }}
              className="text-center text-sm border-[1px] bg-white"
              header="Action"
              body={actionTemplate}
            ></Column>
          </DataTable> */}
        </>
      )}
    </>
  );
};

export default TruckDetails;
