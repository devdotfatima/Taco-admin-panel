import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPencil, BiTrash } from "react-icons/bi";
import { removeAddonFromTruck, getTruckAddons } from "../api";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import AddonModal from "./AddonModal";
import { AddOnItemT } from "../utils/types";

type Props = { truckId: string };

const AddonsDataTable = ({ truckId }: Props) => {
  const [loading, setLoading] = useState(true);

  const [showAddonModal, setShowAddonModal] = useState(false);
  const [selectedAddonItemId, setSelectedAddonItemId] = useState<null | string>(
    null
  );
  const [selectedAddonItem, setSelectedAddonItem] = useState<
    undefined | AddOnItemT
  >(undefined);

  const [showAddonItemDeleteModal, setShowAddonItemDeleteModal] =
    useState(false);
  const [truckAddonsItems, setTruckAddonsItems] = useState<any[]>([]);

  const updateAddonItemDeleteModalVisibility = (visible: boolean) => {
    setShowAddonItemDeleteModal(visible);
  };
  const updateAddonModalVisibility = (visible: boolean) => {
    setShowAddonModal(visible);
  };
  const addonsHeader = (
    <div className="flex justify-between w-full ">
      <h2 className="text-xl">Add ons</h2>
      <button
        onClick={() => updateAddonModalVisibility(true)}
        className="flex items-center px-3 py-1.5 text-sm font-medium text-white rounded bg-carrot "
      >
        Add Addon
      </button>
    </div>
  );
  const actionTemplate = (options: any) => {
    return (
      <div className="flex items-center justify-between w-full gap min-w-24">
        <button className="text-green-600">
          <BiPencil
            size={20}
            onClick={() => {
              setSelectedAddonItem(options);
              updateAddonModalVisibility(true);
            }}
          />
        </button>
        <button
          onClick={() => {
            setSelectedAddonItemId(options.docId);
            updateAddonItemDeleteModalVisibility(true);
          }}
          className="text-red-600"
        >
          <BiTrash size={20} />
        </button>
      </div>
    );
  };

  const deleteAddon = async () => {
    try {
      toast.loading("Deleting Addon");
      const isDeleted = await removeAddonFromTruck(selectedAddonItemId || "");
      if (isDeleted) {
        toast.dismiss();
        toast.success("Addon deleted successfully");
        updateAddonItemDeleteModalVisibility(false);
        fetchTruckAddonsData();
      } else {
        toast.dismiss();
        toast.error("Something went wrong");
        updateAddonItemDeleteModalVisibility(false);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
      updateAddonItemDeleteModalVisibility(false);
    }
  };

  const fetchTruckAddonsData = async () => {
    setLoading(true);
    try {
      const response = await getTruckAddons(truckId);
      setTruckAddonsItems(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching truck addons:", error);
    }
  };
  useEffect(() => {
    fetchTruckAddonsData();
    if (!showAddonModal) {
      setSelectedAddonItem(undefined);
    }
  }, [truckId, showAddonModal]);

  return (
    <>
      <DataTable
        value={truckAddonsItems}
        pt={{
          header: {
            className: "mt-10 border-0 sm:px-6",
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
        dataKey="docId"
        showGridlines={true}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={["price", "name"]}
        header={addonsHeader}
        emptyMessage="No Add ons found."
      >
        <Column
          header="Id"
          field="docId"
          pt={{
            headerContent: {
              className: " flex justify-center ",
            },
          }}
          className="text-center text-sm border-[1px] bg-white min-w-56"
          filter
          filterPlaceholder="Filter By ID"
        />
        <Column
          header="Name"
          field="addonName"
          pt={{
            headerContent: {
              className: " flex justify-center ",
            },
          }}
          className="text-center text-sm border-[1px] bg-white min-w-56"
          filter
          filterPlaceholder="Filter By Name"
        />
        <Column
          header="Price"
          field="addonPrice"
          pt={{
            headerContent: {
              className: " flex justify-center ",
            },
          }}
          className="text-center text-sm border-[1px] bg-white truncate min-w-56"
          filter
          filterPlaceholder="Filter By Price"
          style={{ maxWidth: "12rem" }}
        />
        <Column
          header="Available"
          field="available"
          pt={{
            headerContent: {
              className: " flex justify-center ",
            },
          }}
          className="text-center text-sm border-[1px] bg-white truncate min-w-56"
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
      </DataTable>
      <AddonModal
        updateVisibility={updateAddonModalVisibility}
        visible={showAddonModal}
        truckId={truckId}
        itemToEdit={selectedAddonItem}
      />
      <DeleteConfirmationModal
        selectedId={selectedAddonItemId || ""}
        updateVisibility={updateAddonItemDeleteModalVisibility}
        visible={showAddonItemDeleteModal}
        onConfirm={deleteAddon}
      />
    </>
  );
};

export default AddonsDataTable;
