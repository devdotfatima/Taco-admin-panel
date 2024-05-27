import { Dialog } from "primereact/dialog";
import { TruckModalT, TruckT } from "../utils/types";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { addUser, createUserInAuthentication } from "../api";
import toast from "react-hot-toast";
import { Button } from "primereact/button";
import { addTruck, updateTruck } from "../api/index.ts";
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { USER_ROLES } from "../utils/const.tsx";

const TruckModal = ({
  visible,
  updateVisibility,
  truckOwnerId,
  itemToEdit,
}: TruckModalT) => {
  const isEditMode = !!itemToEdit;
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TruckT>({
    defaultValues: {
      truckAddress: "",
      truckName: "",
      truckSupervisorName: "",
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
        await updateTruck({
          truckAddress: data.truckAddress,
          truckName: data.truckName,
          truckSupervisorName: data.truckSupervisorName,
          truckId: itemToEdit.truckId || "",
        });
        toast.dismiss(toastId);
        setIsLoading(false);
        updateVisibility(false);
        toast.success("Truck Updated Successfully");
      } else {
        const supervisorUID = await createUserInAuthentication(
          data.email,
          "password"
        );
        await addUser({
          userEmail: data.email,
          userFullName: data.truckSupervisorName,
          userId: supervisorUID || "",
          userRole: USER_ROLES.TRUCK_SUPERVISOR,
          userPhone: "",
          userDOB: new Date(),
          userGender: "",
          userProfileImg: "",
        });
        if (supervisorUID) {
          await addTruck({
            truckAddress: data.truckAddress,
            truckName: data.truckName,
            truckSupervisorName: data.truckSupervisorName,
            truckOwnerId: truckOwnerId,
            truckId: supervisorUID,
          });
          toast.dismiss(toastId);
          setIsLoading(false);
          updateVisibility(false);
          toast.success("Truck Created Successfully");
        } else {
          setIsLoading(false);
          toast.dismiss(toastId);
          toast.error("Something went wrong.");
        }
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
        name="truckSupervisorName"
        control={control}
        rules={{
          required: "Supervisor Name Is required",
        }}
        render={({ field, fieldState }) => (
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-400 font-poppins">
              Truck Supervisor Name
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

              {getFormErrorMessage("truckSupervisorName", errors)}
            </div>
          </div>
        )}
      />

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

      {isEditMode ? null : (
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email Is required",
          }}
          render={({ field, fieldState }) => (
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-400 font-poppins">
                Email
              </h2>
              <div className="flex flex-col gap-1 ">
                <InputText
                  id={field.name}
                  {...field}
                  placeholder="Jane Doe"
                  className={`text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0 ${
                    fieldState.invalid
                      ? "p-invalid  border-2 border-red-600"
                      : ""
                  }`}
                />

                {getFormErrorMessage("email", errors)}
              </div>
            </div>
          )}
        />
      )}
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

  useEffect(() => {
    if (isEditMode && itemToEdit && visible) {
      reset({
        truckAddress: itemToEdit.truckAddress,
        truckName: itemToEdit.truckName,
        truckSupervisorName: itemToEdit.truckSupervisorName,
      });
    } else {
      reset({
        truckAddress: "",
        truckName: "",
        truckSupervisorName: "",
        email: "",
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
