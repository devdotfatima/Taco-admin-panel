import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import MenuModal from "./MenuModal";
import toast from "react-hot-toast";
import { removeMenuItemFromTruck, getTruckMenuItems } from "../api";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";

type Props = { truckId: string };

const MenuItemsDataTable = ({ truckId }: Props) => {
  const [loading, setLoading] = useState(true);

  const [showMenuModal, setShowMenuModal] = useState(false);
  const [selectedMenuItemId, setSelectedMenuItemId] = useState<null | string>(
    null
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState<null | any>(null);
  const [showMenuItemDeleteModal, setShowMenuItemDeleteModal] = useState(false);
  const [truckMenuItems, setTruckMenuItems] = useState<any[]>([]);
  const updateMenuItemDeleteModalVisibility = (visible: boolean) => {
    setShowMenuItemDeleteModal(visible);
  };
  const updateMenuModalVisibility = (visible: boolean) => {
    setShowMenuModal(visible);
  };
  const menuItemsheader = (
    <div className="flex justify-between w-full ">
      <h2 className="text-xl">Menu Items</h2>
      <button
        onClick={() => updateMenuModalVisibility(true)}
        className="flex items-center px-3 py-1.5 text-sm font-medium text-white rounded bg-carrot "
      >
        Add Menu Item
      </button>
    </div>
  );

  const actionTemplate = (options: any) => {
    return (
      <div className="flex items-center justify-between w-full gap min-w-24">
        <Link
          className="text-sm font-medium text-blue-600 rounded-full"
          to={`/menu/${options.docId}`}
        >
          <BsEye size={20} />
        </Link>
        <button className="text-green-600">
          <BiPencil
            size={20}
            onClick={() => {
              setSelectedMenuItem(options);
              updateMenuModalVisibility(true);
            }}
          />
        </button>
        <button
          onClick={() => {
            setSelectedMenuItemId(options.docId);
            updateMenuItemDeleteModalVisibility(true);
          }}
          className="text-red-600"
        >
          <BiTrash size={20} />
        </button>
      </div>
    );
  };

  const deleteMenuItem = async () => {
    try {
      toast.loading("Deleting Menu Item");
      const isDeleted = await removeMenuItemFromTruck(selectedMenuItemId || "");
      if (isDeleted) {
        toast.dismiss();
        toast.success("Menu Item deleted successfully");
        updateMenuItemDeleteModalVisibility(false);
        fetchTruckMenuData();
      } else {
        toast.dismiss();
        toast.error("Something went wrong");
        updateMenuItemDeleteModalVisibility(false);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
      updateMenuItemDeleteModalVisibility(false);
    }
  };
  const fetchTruckMenuData = async () => {
    setLoading(true);
    try {
      const response = await getTruckMenuItems(truckId);
      setTruckMenuItems(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching truck extras:", error);
    }
  };

  useEffect(() => {
    fetchTruckMenuData();
    if (!showMenuModal) {
      setSelectedMenuItem(undefined);
    }
  }, [truckId, showMenuModal]);

  return (
    <>
      <DataTable
        value={truckMenuItems}
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
        header={menuItemsheader}
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
          className="text-center text-sm border-[1px] bg-white min-w-56"
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
          className="text-center text-sm border-[1px] bg-white min-w-56"
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
          className="text-center text-sm border-[1px] bg-white truncate min-w-56"
          filter
          filterPlaceholder="Filter By Price"
        />
        <Column
          header="Available"
          field="availability"
          pt={{
            headerContent: {
              className: " flex justify-center ",
            },
          }}
          className="text-center text-sm border-[1px] bg-white truncate min-w-56"
          filter
          filterPlaceholder="Filter By availability"
        />

        <Column
          style={{ flex: "0 0 4rem" }}
          className="text-center text-sm border-[1px] bg-white"
          header="Action"
          body={actionTemplate}
        ></Column>
      </DataTable>
      {showMenuModal ? (
        <MenuModal
          updateVisibility={updateMenuModalVisibility}
          visible={showMenuModal}
          truckId={truckId || ""}
          itemToEdit={selectedMenuItem}
        />
      ) : null}
      <DeleteConfirmationModal
        selectedId={selectedMenuItemId || ""}
        updateVisibility={updateMenuItemDeleteModalVisibility}
        visible={showMenuItemDeleteModal}
        onConfirm={deleteMenuItem}
      />
    </>
  );
};

export default MenuItemsDataTable;
