import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { useState, useEffect } from "react";
import { BiSearch, BiPencil, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getUsers } from "../api";
import Header from "../components/Header";
import { USER_ROLES } from "../utils/const";

const Supervisors = () => {
  const [supervisors, setSupervisors] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    userFullName: { value: null, matchMode: FilterMatchMode.CONTAINS },
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
            placeholder="Search Customers"
            className="w-full py-2 font-medium text-gray-600 rounded-full ring-0"
          />
        </IconField>
        {/* <button
          onClick={() => updateProfileModalVisibility(true)}
          className="flex items-center px-3 py-1 text-sm font-medium bg-white rounded text-carrot"
        >
          Add Customer
        </button> */}
      </div>
    );
  };
  const header = renderHeader();

  const actionTemplate = (options: any) => {
    return (
      <div className="flex items-center justify-between w-full gap min-w-24">
        <Link
          className="text-sm font-medium text-blue-600 rounded-full"
          to={`/supervisors/${options.userId}`}
        >
          <BsEye size={20} />
        </Link>
        <button className="text-green-600">
          <BiPencil
            size={20}
            onClick={() => {
              // setSelectedTruckOwner(options);
              // updateProfileModalVisibility(true);
            }}
          />
        </button>
        <button className="text-red-600">
          <BiTrash
            size={20}
            onClick={() => {
              // setSelectedTruckOwnerId(options.userId);
              // updateTruckOwnerDeleteModalVisibility(true);
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
  useEffect(() => {
    const fetchSupervisors = async () => {
      const supervisors = await getUsers(USER_ROLES.TRUCK_SUPERVISOR);
      setSupervisors(supervisors || []);
      setLoading(false);
    };

    fetchSupervisors();
  }, []);
  return (
    <>
      <Header pageTitle="Supervisors" />
      <DataTable
        value={supervisors}
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
    </>
  );
};

export default Supervisors;
