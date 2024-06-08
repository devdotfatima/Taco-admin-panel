import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import UserProfileModal from "./UserProfileModal";
import { FilterMatchMode } from "primereact/api";
import { UserRoleT, UserT } from "../utils/types";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import toast from "react-hot-toast";
import { BiSearch, BiPencil, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { removeTruckOwnerUser, getUsers } from "../api";
import { USER_ROLES } from "../utils/const";

type Props = {
  role: UserRoleT;
  truckOwnerId?: string;
};

const UsersDataTable = ({ role, truckOwnerId }: Props) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [users, setUsers] = useState<any>(null);
  const [selectedUserId, setSelectedUserId] = useState<null | string>(null);
  const [selectedUser, setSelectedUser] = useState<undefined | UserT>(
    undefined
  );
  const [showUserDeleteModal, setShowUserDeleteModal] = useState(false);
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
    return truckOwnerId ? (
      <>
        <div className="flex justify-between w-full ">
          <h2 className="text-xl">Supervisors</h2>
          {role === USER_ROLES.TRUCK_SUPERVISOR ? (
            <button
              onClick={() => updateProfileModalVisibility(true)}
              className="flex items-center px-3 py-1.5 text-sm font-medium text-white rounded bg-carrot "
            >
              Add Supervisior
            </button>
          ) : null}
        </div>
      </>
    ) : (
      <div className="flex justify-between w-full ">
        <IconField
          iconPosition="left"
          className="flex items-center gap-4 px-2 text-gray-600 bg-white rounded-full w-96"
        >
          <BiSearch size={24} className="text-gray-400" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search "
            className="w-full py-2 font-medium text-gray-600 rounded-full ring-0"
          />
        </IconField>
        {role === USER_ROLES.TRUCK_OWNER ? (
          <button
            onClick={() => updateProfileModalVisibility(true)}
            className="flex items-center px-3 py-1 text-sm font-medium bg-white rounded text-carrot"
          >
            Add Owner
          </button>
        ) : null}

        {role === USER_ROLES.TRUCK_SUPERVISOR && truckOwnerId ? (
          <button
            onClick={() => updateProfileModalVisibility(true)}
            className="flex items-center px-3 py-1 text-sm font-medium bg-white rounded text-carrot"
          >
            Add Supervisior
          </button>
        ) : null}
      </div>
    );
  };
  const header = renderHeader();

  const actionTemplate = (options: any) => {
    let route = "";
    if (role === USER_ROLES.TRUCK_OWNER) {
      route = "owners";
    }
    if (role === USER_ROLES.TRUCK_SUPERVISOR) {
      route = "trucks";
    }

    if (role === USER_ROLES.CUSTOMERS) {
      route = "customers";
    }

    return (
      <div className="flex items-center justify-between w-full gap min-w-24">
        <Link
          className="text-sm font-medium text-blue-600 rounded-full"
          to={`/${route}/${options.userId}`}
        >
          <BsEye size={20} />
        </Link>
        <button className="text-green-600">
          <BiPencil
            size={20}
            onClick={() => {
              setSelectedUser(options);
              updateProfileModalVisibility(true);
            }}
          />
        </button>
        <button className="text-red-600">
          <BiTrash
            size={20}
            onClick={() => {
              setSelectedUserId(options.userId);
              updateUserDeleteModalVisibility(true);
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
  const updateUserDeleteModalVisibility = (visible: boolean) => {
    setShowUserDeleteModal(visible);
  };
  const deleteUser = async () => {
    try {
      toast.loading("Deleting User");

      const isDeleted =
        role === USER_ROLES.TRUCK_SUPERVISOR
          ? await removeTruckOwnerUser(
              selectedUserId || "",
              USER_ROLES.TRUCK_SUPERVISOR
            )
          : await removeTruckOwnerUser(selectedUserId || "");
      if (isDeleted) {
        toast.dismiss();
        toast.success("User deleted successfully");
        updateUserDeleteModalVisibility(false);
        fetchUsers();
      } else {
        toast.dismiss();
        toast.error("Something went wrong");
        updateUserDeleteModalVisibility(false);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
      updateUserDeleteModalVisibility(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      if (truckOwnerId && role === USER_ROLES.TRUCK_SUPERVISOR) {
        const response = await getUsers(
          USER_ROLES.TRUCK_SUPERVISOR,
          truckOwnerId
        );
        setUsers(response.data || []);
        setLoading(false);
        return;
      }
      if (role === USER_ROLES.TRUCK_OWNER) {
        const response = await getUsers(USER_ROLES.TRUCK_OWNER);
        setUsers(response.data || []);
        setLoading(false);
        return;
      }
      if (role === USER_ROLES.TRUCK_SUPERVISOR) {
        const response = await getUsers(USER_ROLES.TRUCK_SUPERVISOR);
        setUsers(response.data || []);
        setLoading(false);
        return;
      }

      if (role === USER_ROLES.CUSTOMERS) {
        const response = await getUsers(USER_ROLES.CUSTOMERS);
        setUsers(response.data || []);
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching truck extras:", error);
    }
  };
  useEffect(() => {
    fetchUsers();

    if (!showProfileModal) {
      setSelectedUser(undefined);
    }
  }, [role, showProfileModal]);

  return (
    <>
      {" "}
      <DataTable
        value={users}
        pt={{
          header: {
            className: `${
              truckOwnerId
                ? "mt-10 border-0 px-6"
                : "bg-gradient-to-l from-carrot to-carrot-100 mb-8"
            } px-0 `,
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
        dataKey="userId"
        showGridlines={true}
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={["userFullName", "Email"]}
        header={header}
        emptyMessage={<p className="flex justify-center">No Results.</p>}
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
      {showProfileModal ? (
        <UserProfileModal
          truckOwnerId={truckOwnerId}
          role={truckOwnerId ? USER_ROLES.TRUCK_SUPERVISOR : undefined}
          itemToEdit={selectedUser}
          visible={showProfileModal}
          updateVisibility={updateProfileModalVisibility}
        />
      ) : null}
      <DeleteConfirmationModal
        visible={showUserDeleteModal}
        updateVisibility={updateUserDeleteModalVisibility}
        onConfirm={deleteUser}
        selectedId={selectedUserId || ""}
      />
    </>
  );
};

export default UsersDataTable;
