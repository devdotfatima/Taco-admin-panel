import Header from "../components/Header";
import { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { Link, useParams } from "react-router-dom";
import { BiPencil, BiSearch, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { TruckT } from "../utils/types.ts";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal.tsx";
import toast from "react-hot-toast";
import TruckModal from "../components/TruckModal.tsx";
import { getTrucks, getTrucksByTruckOwner, removeTruck } from "../api/index.ts";

const Trucks = () => {
  const [trucks, setTrucks] = useState<any>([]);
  const [showTruckModal, setShowTruckModal] = useState(false);
  const { truckOwnerId } = useParams();
  const [selectedTruckId, setSelectedTruckId] = useState<null | string>(null);
  const [selectedTruck, setSelectedTruck] = useState<undefined | TruckT>(
    undefined
  );
  const [showTruckDeleteModal, setShowTruckDeleteModal] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    truckName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    truckId: { value: null, matchMode: FilterMatchMode.EQUALS },
    truckSupervisorName: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
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
      <div className="flex justify-between w-full">
        <IconField
          iconPosition="left"
          className="flex items-center gap-4 px-2 text-gray-600 bg-white rounded-full w-96"
        >
          <BiSearch size={24} className="text-gray-400" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search Food Trucks"
            className="w-full py-2 font-medium text-gray-600 rounded-full ring-0"
          />
        </IconField>
        <button
          onClick={() => {
            updateTruckModalVisibility(true);
            setSelectedTruck(undefined);
          }}
          className="flex items-center px-3 py-1 text-sm font-medium bg-white rounded text-carrot"
        >
          Add Truck
        </button>
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
        const trucks = truckOwnerId
          ? await getTrucksByTruckOwner(truckOwnerId)
          : await getTrucks();
        setTrucks(trucks || []);
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
  useEffect(() => {
    const fetchTrucks = async () => {
      if (truckOwnerId) {
        const trucks = await getTrucksByTruckOwner(truckOwnerId);
        setTrucks(trucks || []); // Ensure that the state is always an array
        setLoading(false);
      } else {
        const trucks = await getTrucks();
        setTrucks(trucks || []); // Ensure that the state is always an array
        setLoading(false);
      }
    };

    fetchTrucks();
  }, [truckOwnerId]);
  return (
    <>
      <Header pageTitle="Food Trucks" />

      <DataTable
        value={trucks}
        pt={{
          header: {
            className: "bg-gradient-to-l from-carrot to-carrot-100 px-0 mb-8",
          },
        }}
        className="text-black"
        paginator
        rows={10}
        dataKey="truckId"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={[
          "truckName",
          "truckSupervisorName",
          // "status"
        ]}
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
          field="truckSupervisorName"
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
  );
};

export default Trucks;
