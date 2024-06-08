import { Dialog } from "primereact/dialog";
import { TruckModalT, TruckT, UserT } from "../utils/types";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import toast from "react-hot-toast";
import { Button } from "primereact/button";
import { addTruck, getUsers, updateTruck } from "../api/index.ts";
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { USER_ROLES } from "../utils/const.tsx";
import { Dropdown } from "primereact/dropdown";

const TruckModal = ({
  visible,
  updateVisibility,
  truckOwnerId,
  itemToEdit,
}: TruckModalT) => {
  const isEditMode = !!itemToEdit;
  const [isLoading, setIsLoading] = useState(false);
  const [supervisors, setSupervisors] = useState([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TruckT>({
    defaultValues: {
      truckAddress: "",
      truckName: "",
      truckSupervisorId: "",
      email: "",
    },
  });

  const getFormErrorMessage = (name: any, errors: FieldErrors<any>) => {
    const error = errors[name];
    if (error && typeof error.message === "string") {
      return <small className="p-error">{error.message}</small>;
    }
    return null;
  };

  const onSubmit: SubmitHandler<TruckT> = async (data: TruckT) => {
    setIsLoading(true);
    const toastId = toast.loading(
      `${isEditMode ? "Updating" : "Creating"} Truck`
    );
    try {
      if (isEditMode) {
        await updateTruck(itemToEdit.truckId || "", {
          truckAddress: data.truckAddress,
          truckName: data.truckName,
          truckSupervisorId: data.truckSupervisorId,
          truckId: itemToEdit.truckId || "",
        });
        toast.dismiss(toastId);
        setIsLoading(false);
        updateVisibility(false);
        toast.success("Truck Updated Successfully");
      } else {
        await addTruck({
          truckAddress: data.truckAddress,
          truckName: data.truckName,
          truckSupervisorId: data.truckSupervisorId,
          truckOwnerId: truckOwnerId,
        });
        toast.dismiss(toastId);
        setIsLoading(false);
        updateVisibility(false);
        toast.success("Truck Created Successfully");
      }
    } catch (error) {
      setIsLoading(false);
      toast.dismiss(toastId);
      toast.error("Something went wrong.");
    }
  };
  const content = (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Controller
        name="truckName"
        control={control}
        rules={{
          required: "Truck Name Is required",
        }}
        render={({ field, fieldState }) => (
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-400 font-poppins">
              Truck Name
            </h2>
            <div className="flex flex-col gap-1 ">
              <InputText
                id={field.name}
                {...field}
                placeholder="Jane Doe"
                className={`text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0 ${
                  fieldState.invalid ? "p-invalid  border-2 border-red-600" : ""
                }`}
              />

              {getFormErrorMessage("truckName", errors)}
            </div>
          </div>
        )}
      />

      <Controller
        name="truckAddress"
        control={control}
        rules={{
          required: "Address Is required",
        }}
        render={({ field, fieldState }) => (
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-400 font-poppins">
              Address
            </h2>
            <div className="flex flex-col gap-1 ">
              <InputText
                id={field.name}
                {...field}
                placeholder="Jane Doe"
                className={`text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0 ${
                  fieldState.invalid ? "p-invalid  border-2 border-red-600" : ""
                }`}
              />

              {getFormErrorMessage("truckAddress", errors)}
            </div>
          </div>
        )}
      />
      <Controller
        name="truckSupervisorId"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field }) => (
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-400 font-poppins">
              Truck Supervisor
            </h2>
            <div className="flex flex-col gap-1 ">
              <Dropdown
                id={field.name}
                {...field}
                options={supervisors}
                optionValue="userId"
                optionLabel="userFullName"
                placeholder="Select Supervisor"
                pt={{ input: { className: "w-[100%]" } }}
                className={`text-center focus:ring-0  bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0 `}
              />
            </div>
          </div>
        )}
      />

      <div className="flex justify-center mt-4">
        <Button
          label={`${isEditMode ? "Edit" : "Create"} Truck`}
          disabled={isLoading}
          type="submit"
          className="flex justify-center w-1/2 px-6 py-2 text-white rounded max-w-96 bg-carrot"
        />
      </div>
    </form>
  );
  const fetchUsers = async () => {
    // setLoading(true);
    try {
      if (truckOwnerId) {
        const response = await getUsers(
          USER_ROLES.TRUCK_SUPERVISOR,
          truckOwnerId
        );

        const formattedData = response.data.map((user: UserT) => ({
          userFullName: user.userFullName,
          userId: user.userId,
        }));
        setSupervisors(formattedData || []);
        // setLoading(false);
        return;
      }
    } catch (error) {
      // setLoading(false);
      console.error("Error fetching truck extras:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
    if (isEditMode && itemToEdit && visible) {
      reset({
        truckAddress: itemToEdit.truckAddress,
        truckName: itemToEdit.truckName,
        truckSupervisorId: itemToEdit.truckSupervisorId,
      });
    } else {
      reset({
        truckAddress: "",
        truckName: "",
        truckSupervisorId: "",
      });
    }
  }, [itemToEdit, isEditMode, visible, reset]);
  return (
    <Dialog
      header={`${isEditMode ? "Edit" : "Add"} Truck`}
      pt={{
        header: {
          className: "text-lg font-bold border-b-[1px] border-gray-200",
        },
      }}
      className="px-6 pt-6 bg-white shadow-lg rounded-xl"
      visible={visible}
      style={{ width: "620px" }}
      draggable={false}
      focusOnShow={false}
      onHide={() => updateVisibility(false)}
      closable={true}
    >
      <div className="mt-10 leading-6 text-thm-600">{content}</div>
    </Dialog>
  );
};

export default TruckModal;
