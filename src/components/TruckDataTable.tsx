import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import TruckModal from "./TruckModal";
import { FilterMatchMode } from "primereact/api";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BiSearch, BiPencil, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import { removeTruck, getTrucksByTruckOwner, getTrucks } from "../api";
import { TruckT } from "../utils/types";
import Loader from "./Loader";

type Props = { truckOwnerId?: string };

const TruckDataTable = ({ truckOwnerId }: Props) => {
  const [trucks, setTrucks] = useState<any>([]);
  const [showTruckModal, setShowTruckModal] = useState(false);

  const [selectedTruckId, setSelectedTruckId] = useState<null | string>(null);
  const [selectedTruck, setSelectedTruck] = useState<undefined | TruckT>(
    undefined
  );
  const [showTruckDeleteModal, setShowTruckDeleteModal] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    truckName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    truckId: { value: null, matchMode: FilterMatchMode.EQUALS },
    truckSupervisorName: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const updateTruckModalVisibility = (visible: boolean) => {
    setShowTruckModal(visible);
  };
  const updateTruckDeleteModalVisibility = (visible: boolean) => {
    setShowTruckDeleteModal(visible);
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-col justify-between w-full gap-3 sm:flex-row">
        <IconField
          iconPosition="left"
          className="flex items-center gap-4 px-2 text-gray-600 bg-white rounded-full sm:w-96"
        >
          <BiSearch size={24} className="text-gray-400" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search Food Trucks"
            className="w-full py-2 font-medium text-gray-600 rounded-full ring-0"
          />
        </IconField>
        {truckOwnerId ? (
          <button
            onClick={() => {
              updateTruckModalVisibility(true);
              setSelectedTruck(undefined);
            }}
            className="self-end h-full px-3 py-3 text-sm font-medium bg-white rounded sm:flex sm:items-center text-carrot"
          >
            Add Truck
          </button>
        ) : null}
      </div>
    );
  };

  const header = renderHeader();

  const actionTemplate = (options: any) => {
    return (
      <div className="flex items-center justify-between w-full gap-3">
        <Link
          className="text-sm font-medium text-blue-600 rounded-full"
          to={`/trucks/${options.truckId}`}
        >
          <BsEye size={20} />
        </Link>
        <button className="text-green-600">
          <BiPencil
            size={20}
            onClick={() => {
              setSelectedTruck(options);
              updateTruckModalVisibility(true);
            }}
          />
        </button>
        <button
          onClick={() => {
            setSelectedTruckId(options.truckId);
            updateTruckDeleteModalVisibility(true);
          }}
          className="text-red-600"
        >
          <BiTrash size={20} />
        </button>
      </div>
    );
  };

  const deleteTruck = async () => {
    try {
      toast.loading("Deleting Truck");
      const isDeleted = await removeTruck(selectedTruckId || "");
      if (isDeleted) {
        toast.dismiss();
        toast.success("Truck deleted successfully");
        updateTruckDeleteModalVisibility(false);
        fetchTruckData();
      } else {
        toast.dismiss();
        toast.error("Something went wrong");
        updateTruckDeleteModalVisibility(false);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
      updateTruckDeleteModalVisibility(false);
    }
  };
  const fetchTruckData = async () => {
    setLoading(true);
    try {
      if (truckOwnerId) {
        console.log("hamshdb");

        const response = await getTrucksByTruckOwner(truckOwnerId);
        setTrucks(response.data);
        setLoading(false);
        return;
      }
      const response = await getTrucks();
      setTrucks(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching truck extras:", error);
    }
  };
  useEffect(() => {
    fetchTruckData();
    if (!showTruckModal) {
      setSelectedTruck(undefined);
    }
  }, [truckOwnerId, showTruckModal]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <DataTable
            value={trucks}
            pt={{
              header: {
                className:
                  "bg-gradient-to-l from-carrot to-carrot-100 px-0 mb-8",
              },
              loadingOverlay: {
                className: "bg-transparent",
              },
              loadingIcon: {
                className: "flex flex-col justify-center items-center mt-32",
              },
            }}
            className="text-black"
            paginator
            rows={10}
            dataKey="truckId"
            filters={filters}
            filterDisplay="row"
            loading={loading}
            globalFilterFields={["truckName", "truckSupervisorName", "truckId"]}
            header={header}
            emptyMessage="No Trucks found."
          >
            <Column
              field="truckId"
              header="ID"
              className="text-center text-sm border-[1px] bg-white overflow-x-auto"
              pt={{
                headerContent: {
                  className: " flex justify-center ",
                },
              }}
              filter
              filterPlaceholder="Search by ID"
            />
            <Column
              field="truckName"
              header="Truck Name"
              className="text-center text-sm border-[1px] bg-white min-w-52"
              pt={{
                headerContent: {
                  className: " flex justify-center ",
                },
                filterInput: {
                  className: "ring-0",
                },
              }}
              filter
              filterPlaceholder="Search by name"
            />

            <Column
              className="text-center text-sm border-[1px] bg-white min-w-52"
              field="supervisor.userFullName"
              header="Supervisor Name"
              pt={{
                headerContent: {
                  className: " flex justify-center ",
                },

                filterInput: { className: " text-carrot " },
              }}
              filter
              filterPlaceholder="Search by Supervisor Name"
            />
            <Column
              style={{ flex: "0 0 4rem" }}
              className="text-center text-sm border-[1px] bg-white min-w-24"
              header="Action"
              body={actionTemplate}
            ></Column>
          </DataTable>
          <TruckModal
            truckOwnerId={truckOwnerId || ""}
            visible={showTruckModal}
            updateVisibility={updateTruckModalVisibility}
            itemToEdit={selectedTruck}
          />
          <DeleteConfirmationModal
            visible={showTruckDeleteModal}
            updateVisibility={updateTruckDeleteModalVisibility}
            onConfirm={deleteTruck}
            selectedId={selectedTruckId || ""}
          />
        </>
      )}
    </>
  );
};

export default TruckDataTable;
