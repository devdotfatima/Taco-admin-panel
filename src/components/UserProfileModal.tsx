import { Dialog } from "primereact/dialog";
import { UserProfileModaLT, UserT } from "../utils/types";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Password } from "primereact/password";
import { USER_ROLES, genders } from "../utils/const";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  addUser,
  updateUser,
  // createUserInAuthentication
} from "../api";
import { Button } from "primereact/button";

const UserProfileModal = ({
  visible,
  updateVisibility,
  itemToEdit,
  truckOwnerId,
  role,
}: UserProfileModaLT) => {
  const isEditMode = !!itemToEdit;
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<UserT>({
    defaultValues: {
      userRole: role ? role : USER_ROLES.TRUCK_OWNER,
      userProfileImg: "",
      userDOB: new Date(),
      userGender: "",
    },
  });
  console.log(truckOwnerId);
  const onSubmit: SubmitHandler<UserT> = async (data) => {
    setIsLoading(true);
    const toastId = toast.loading(
      `${isEditMode ? "Updating" : "Creating"} User"`
    );
    try {
      {
        isEditMode
          ? await updateUser(itemToEdit.userId || "", {
              userFullName: data.userFullName,
              userPhone: data.userPhone,
              userDOB: data.userDOB,
              userGender: data.userGender,
              userProfileImg: data.userProfileImg || "",
            })
          : await addUser({
              truckOwnerId: truckOwnerId,
              userEmail: data.userEmail,
              userFullName: data.userFullName,
              userPassword: data.userPassword,
              userRole: data.userRole,
              userPhone: data.userPhone,
              userDOB: data.userDOB,
              userGender: data.userGender,
              userProfileImg: data.userProfileImg || "",
            });
      }
      toast.dismiss(toastId);
      setIsLoading(false);
      reset();
      updateVisibility(false);
      toast.success(`User ${isEditMode ? "Updated" : "Created"} User`);
    } catch (error) {
      setIsLoading(false);
      toast.dismiss(toastId);
      toast.error("Something went wrong.");
    }
  };

  const getFormErrorMessage = (name: any, errors: FieldErrors<any>) => {
    const error = errors[name];
    if (error && typeof error.message === "string") {
      return <small className="p-error">{error.message}</small>;
    }
    return null;
  };

  const content = (
    <>
      <form className="flex flex-col gap-3 " onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="userFullName"
          control={control}
          rules={{
            required: "Full Name Is required",
          }}
          render={({ field, fieldState }) => (
            <div className="flex flex-col justify-between gap-2 sm:gap-0 sm:items-center sm:flex-row">
              <h2 className="font-semibold text-gray-400 font-poppins">
                Full Name
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

                {getFormErrorMessage("userFullName", errors)}
              </div>
            </div>
          )}
        />
        {isEditMode ? null : (
          <Controller
            name="userEmail"
            control={control}
            rules={{
              required: "Email Is required",
            }}
            render={({ field, fieldState }) => (
              <div className="flex flex-col justify-between gap-2 sm:gap-0 sm:items-center sm:flex-row">
                <h2 className="font-semibold text-gray-400 font-poppins">
                  Email
                </h2>
                <div className="flex flex-col gap-1 ">
                  <InputText
                    id={field.name}
                    {...field}
                    placeholder="example@gmail.com"
                    className={`text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0 ${
                      fieldState.invalid
                        ? "p-invalid  border-2 border-red-600"
                        : ""
                    }`}
                  />

                  {getFormErrorMessage("userEmail", errors)}
                </div>
              </div>
            )}
          />
        )}
        {isEditMode ? null : (
          <Controller
            name="userPassword"
            control={control}
            rules={{
              required: "Password Is required",
            }}
            render={({ field, fieldState }) => (
              <div className="flex flex-col justify-between gap-2 sm:gap-0 sm:items-center sm:flex-row">
                <h2 className="font-semibold text-gray-400 font-poppins">
                  Password
                </h2>
                <div className="flex flex-col gap-1 ">
                  <Password
                    id={field.name}
                    {...field}
                    placeholder="Password"
                    pt={{
                      input: {
                        className:
                          " rounded rounded-r-lg ring-0 focus:border-black hover:border-black  w-full bg-gray-100 text-center",
                      },
                    }}
                    className={`text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0 ${
                      fieldState.invalid
                        ? "p-invalid  border-2 border-red-600"
                        : ""
                    }`}
                  />

                  {getFormErrorMessage("userPassword", errors)}
                </div>
              </div>
            )}
          />
        )}
        <Controller
          name="userDOB"
          control={control}
          rules={{
            required: false,
          }}
          render={({ field, fieldState }) => (
            <div className="flex flex-col justify-between gap-2 sm:gap-0 sm:items-center sm:flex-row">
              <h2 className="font-semibold text-gray-400 font-poppins">
                Birth Date
              </h2>
              <div className="flex flex-col gap-1 ">
                <Calendar
                  id={field.name}
                  {...field}
                  placeholder="05/15/2024"
                  pt={{
                    input: {
                      root: {
                        className:
                          "bg-gray-100  text-center outline-none outline-none focus:ring-0 p-2",
                      },
                    },
                  }}
                  className={` ${
                    fieldState.invalid
                      ? "p-invalid  border-[1px] border-red-600 rounded"
                      : ""
                  }`}
                />

                {getFormErrorMessage("userDOB", errors)}
              </div>
            </div>
          )}
        />

        <Controller
          name="userGender"
          control={control}
          rules={{
            required: false,
          }}
          render={({ field, fieldState }) => (
            <div className="flex flex-col justify-between gap-2 sm:gap-0 sm:items-center sm:flex-row">
              <h2 className="font-semibold text-gray-400 font-poppins">
                Gender Identity
              </h2>
              <div className="flex flex-col gap-1 ">
                <Dropdown
                  id={field.name}
                  {...field}
                  options={genders}
                  optionLabel="name"
                  optionValue="name"
                  placeholder="Select Gender"
                  className={`text-center focus:ring-0 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0 ${
                    fieldState.invalid
                      ? "p-invalid  border-[1px] border-red-600 rounded"
                      : ""
                  }`}
                />

                {getFormErrorMessage("userGender", errors)}
              </div>
            </div>
          )}
        />

        <Controller
          name="userPhone"
          control={control}
          rules={{
            required: "Contact Number Is required",
          }}
          render={({ field, fieldState }) => (
            <div className="flex flex-col justify-between gap-2 sm:gap-0 sm:items-center sm:flex-row">
              <h2 className="font-semibold text-gray-400 font-poppins">
                Contact Number
              </h2>

              <div className="flex flex-col gap-1 ">
                <InputMask
                  className={`text-center p-2 focus:ring-0 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0 ${
                    fieldState.invalid
                      ? "p-invalid  border-2 border-red-600"
                      : ""
                  }`}
                  id={field.name}
                  {...field}
                  mask="(999) 999-9999"
                  placeholder="(999) 999-9999"
                ></InputMask>

                {getFormErrorMessage("userPhone", errors)}
              </div>
            </div>
          )}
        />

        <div className="flex items-center justify-center w-full mt-10">
          <Button
            disabled={isLoading}
            label="submit"
            className="w-1/2 py-2 text-white uppercase rounded bg-carrot"
          />
        </div>
      </form>
    </>
  );
  useEffect(() => {
    if (isEditMode && itemToEdit) {
      reset({
        userFullName: itemToEdit.userFullName || "",
        userEmail: itemToEdit.userEmail || "",
        userPhone: itemToEdit.userPhone || "",
        userRole: itemToEdit.userRole || "TruckOwner",
        userProfileImg: itemToEdit.userProfileImg || "",
        userDOB: itemToEdit.userDOB ? new Date(itemToEdit.userDOB) : new Date(),
        userGender: itemToEdit.userGender || "",
      });
    }
  }, [isEditMode, itemToEdit, reset]);
  return (
    <Dialog
      header="User Information"
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
      onHide={() => {
        reset();
        updateVisibility(false);
      }}
      closable={true}
    >
      <div className="mt-10 leading-6 text-thm-600">{content}</div>
    </Dialog>
  );
};

export default UserProfileModal;
