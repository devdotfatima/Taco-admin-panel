import Header from "../components/Header";
import { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { Link } from "react-router-dom";
import { BiPencil, BiSearch, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import UserProfileModal from "../components/UserProfileModal";
import { getUsers, removeTruckOwnerUser } from "../api";
import { USER_ROLES } from "../utils/const";
import { UserT } from "../utils/types";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";

const TruckOwners = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [truckOwners, setTruckOwners] = useState<any>(null);
  const [selectedTruckOwnerId, setSelectedTruckOwnerId] = useState<
    null | string
  >(null);
  const [selectedTruckOwner, setSelectedTruckOwner] = useState<
    undefined | UserT
  >(undefined);
  const [showTruckOwnerDeleteModal, setShowTruckOwnerDeleteModal] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    userFullName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    userId: { value: null, matchMode: FilterMatchMode.EQUALS },
    userEmail: { value: null, matchMode: FilterMatchMode.EQUALS },
    userPhone: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
  });

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between w-full ">
        <IconField
          iconPosition="left"
          className="flex items-center gap-4 px-2 text-gray-600 bg-white rounded-full w-96"
        >
          <BiSearch size={24} className="text-gray-400" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search Food Truck Owners"
            className="w-full py-2 font-medium text-gray-600 rounded-full ring-0"
          />
        </IconField>
        <button
          onClick={() => updateProfileModalVisibility(true)}
          className="flex items-center px-3 py-1 text-sm font-medium bg-white rounded text-carrot"
        >
          Add Owner
        </button>
      </div>
    );
  };
  const header = renderHeader();

  const actionTemplate = (options: any) => {
    return (
      <div className="flex items-center justify-between w-full gap min-w-24">
        <Link
          className="text-sm font-medium text-blue-600 rounded-full"
          to={`/owners/${options.userId}`}
        >
          <BsEye size={20} />
        </Link>
        <button className="text-green-600">
          <BiPencil
            size={20}
            onClick={() => {
              setSelectedTruckOwner(options);
              updateProfileModalVisibility(true);
            }}
          />
        </button>
        <button className="text-red-600">
          <BiTrash
            size={20}
            onClick={() => {
              setSelectedTruckOwnerId(options.userId);
              updateTruckOwnerDeleteModalVisibility(true);
            }}
          />
        </button>
      </div>
    );
  };
  const ownerNameImageTemplate = (option: any) => {
    return (
      <div className="flex items-center gap-2">
        {option.userProfileImg ? (
          <img
            alt={option.name}
            src={`${option.userProfileImg}`}
            className="w-12 h-12 p-[0.5px] border-2 rounded-full border-carrot"
          />
        ) : (
          <FaUser className="w-12 h-12 p-[0.5px] border-2 rounded-full border-carrot" />
        )}

        <span>{option.userFullName}</span>
      </div>
    );
  };

  const updateProfileModalVisibility = (visible: boolean) => {
    setShowProfileModal(visible);
  };
  const updateTruckOwnerDeleteModalVisibility = (visible: boolean) => {
    setShowTruckOwnerDeleteModal(visible);
  };
  const deleteTruckOwner = async () => {
    try {
      toast.loading("Deleting Truck Owner");
      const isDeleted = await removeTruckOwnerUser(selectedTruckOwnerId || "");
      if (isDeleted) {
        toast.dismiss();
        toast.success("Truck Owner deleted successfully");
        updateTruckOwnerDeleteModalVisibility(false);
        const owners = await getUsers(USER_ROLES.TRUCK_OWNER);
        setTruckOwners(owners || []);
      } else {
        toast.dismiss();
        toast.error("Something went wrong");
        updateTruckOwnerDeleteModalVisibility(false);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
      updateTruckOwnerDeleteModalVisibility(false);
    }
  };
  useEffect(() => {
    const fetchTruckOwners = async () => {
      const owners = await getUsers(USER_ROLES.TRUCK_OWNER);
      setTruckOwners(owners || []);
      setLoading(false);
    };

    fetchTruckOwners();
  }, []);
  return (
    <>
      <Header pageTitle="Truck Owners" />

      <DataTable
        value={truckOwners}
        pt={{
          header: {
            className: "bg-gradient-to-l from-carrot to-carrot-100 px-0 mb-8",
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
        dataKey="id"
        showGridlines={true}
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={["userFullName", "Email"]}
        header={header}
        emptyMessage="No Truck Owners found."
      >
        <Column
          field="userId"
          header="ID"
          className="text-center text-sm border-[1px] bg-white"
          pt={{
            headerContent: {
              className: " flex justify-center ",
            },
          }}
          filter
          filterPlaceholder="Search by ID"
        />

        <Column
          header="Name"
          filterField="userFullName"
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "14rem" }}
          body={ownerNameImageTemplate}
          filter
          pt={{
            headerContent: {
              className: " flex justify-center ",
            },
          }}
          className="text-center text-sm border-[1px] bg-white"
          filterPlaceholder="Filter By Name"
        />
        <Column
          className="text-left text-sm border-[1px] bg-white"
          field="userEmail"
          header="Email"
          pt={{
            headerContent: {
              className: " flex justify-center ",
            },
          }}
          filter
          filterPlaceholder="Search by Email"
        />
        <Column
          className="text-center text-sm border-[1px] bg-white"
          field="userPhone"
          header="Phone #"
          pt={{
            headerContent: {
              className: " flex justify-center ",
            },

            filterInput: { className: "text-carrot " },
          }}
          filter
          filterPlaceholder="Search by Contact"
        />

        <Column
          style={{ flex: "0 0 4rem" }}
          className="text-center text-sm border-[1px] bg-white"
          header="Action"
          body={actionTemplate}
        ></Column>
      </DataTable>

      <UserProfileModal
        itemToEdit={selectedTruckOwner}
        visible={showProfileModal}
        updateVisibility={updateProfileModalVisibility}
      />
      <DeleteConfirmationModal
        visible={showTruckOwnerDeleteModal}
        updateVisibility={updateTruckOwnerDeleteModalVisibility}
        onConfirm={deleteTruckOwner}
        selectedId={selectedTruckOwnerId || ""}
      />
    </>
  );
};

export default TruckOwners;
