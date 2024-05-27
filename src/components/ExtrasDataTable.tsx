import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import ExtrasModal from "./ExtrasModal";
import { getTruckExtras, removeExtraFromTruck } from "../api";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import toast from "react-hot-toast";
import { ExtraItemT } from "../utils/types";

type Props = {
  truckId: string;
};

const ExtrasDataTable = ({ truckId }: Props) => {
  const [loading, setLoading] = useState(true);

  const [showExtrasModal, setShowExtrasModal] = useState(false);
  const [selectedExtrasItemId, setSelectedExtrasItemId] = useState<
    null | string
  >(null);
  const [selectedExtrasItem, setSelectedExtrasItem] = useState<
    undefined | ExtraItemT
  >(undefined);
  const [showExtrasItemDeleteModal, setShowExtrasItemDeleteModal] =
    useState(false);
  const [truckExtrasItems, setTruckExtrasItems] = useState<any[]>([]);
  const updateExtrasItemDeleteModalVisibility = (visible: boolean) => {
    setShowExtrasItemDeleteModal(visible);
  };
  const updateExtrasModalVisibility = (visible: boolean) => {
    setShowExtrasModal(visible);
  };
  const extrasheader = (
    <div className="flex justify-between w-full ">
      <h2 className="text-xl">Extras</h2>
      <button
        onClick={() => updateExtrasModalVisibility(true)}
        className="flex items-center px-3 py-1.5 text-sm font-medium text-white rounded bg-carrot "
      >
        Add Extras
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
              setSelectedExtrasItem(options);
              updateExtrasModalVisibility(true);
            }}
          />
        </button>
        <button
          onClick={() => {
            setSelectedExtrasItemId(options.docId);
            updateExtrasItemDeleteModalVisibility(true);
          }}
          className="text-red-600"
        >
          <BiTrash size={20} />
        </button>
      </div>
    );
  };

  const deleteExtra = async () => {
    try {
      toast.loading("Deleting Extra Item");
      const isDeleted = await removeExtraFromTruck(selectedExtrasItemId || "");
      if (isDeleted) {
        toast.dismiss();
        toast.success("Menu Item deleted successfully");
        updateExtrasItemDeleteModalVisibility(false);
        const truckMenu = await getTruckExtras(truckId || "");
        setTruckExtrasItems(truckMenu);
      } else {
        toast.dismiss();
        toast.error("Something went wrong");
        updateExtrasItemDeleteModalVisibility(false);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
      updateExtrasItemDeleteModalVisibility(false);
    }
  };

  useEffect(() => {
    const fetchTruckDetails = async () => {
      if (truckId) {
        const truckMenu = await getTruckExtras(truckId);
        setTruckExtrasItems(truckMenu);
        setLoading(false);
      } else {
      }
    };

    fetchTruckDetails();
  }, [truckId, showExtrasModal]);
  return (
    <>
      <DataTable
        value={truckExtrasItems}
        pt={{
          header: {
            className: "mt-10 border-0 px-6",
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
        header={extrasheader}
        emptyMessage="No Extras found."
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
          field="extraFoodName"
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
          field="extraFoodPrice"
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
      <ExtrasModal
        updateVisibility={updateExtrasModalVisibility}
        visible={showExtrasModal}
        truckId={truckId}
        itemToEdit={selectedExtrasItem}
      />
      <DeleteConfirmationModal
        selectedId={selectedExtrasItemId || ""}
        updateVisibility={updateExtrasItemDeleteModalVisibility}
        visible={showExtrasItemDeleteModal}
        onConfirm={deleteExtra}
      />
    </>
  );
};

export default ExtrasDataTable;
