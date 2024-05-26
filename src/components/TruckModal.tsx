import { Dialog } from "primereact/dialog";
import { TruckModalT } from "../utils/types";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { addTruck, createUser } from "../api";
import toast from "react-hot-toast";
import { Button } from "primereact/button";

const TruckModal = ({
  visible,
  updateVisibility,
  truckOwnerId,
  itemToEdit,
}: TruckModalT) => {
  const isEditMode = !!itemToEdit;
  const [isLoading, setIsLoading] = useState(false);
  // const [truckSupervisorName, setTruckSupervisorName] = useState("");
  // const [truckName, setTruckName] = useState<string>("");
  // const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [newItem, setNewItem] = useState({
    truckAddress: "",
    truckName: "",
    truckSupervisorName: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };
  const content = (
    <>
      <div className="flex flex-col gap-3 ">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-400 font-poppins">
            Truck Supervisor Name
          </h2>
          <InputText
            name="truckSupervisorName"
            value={newItem.truckSupervisorName}
            onChange={handleInputChange}
            placeholder="Jane Doe"
            className="text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0"
          />
        </div>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-400 font-poppins">
            Truck Name
          </h2>
          <InputText
            name="truckName"
            value={newItem.truckName}
            onChange={handleInputChange}
            placeholder="Jane Doe"
            className="text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0"
          />
        </div>
        {isEditMode ? null : (
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-400 font-poppins">Email</h2>
            <InputText
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="Jane Doe"
              className="text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-400 font-poppins">Address</h2>
          <InputText
            name="truckAddress"
            value={newItem.truckAddress}
            onChange={handleInputChange}
            className="text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0"
          />
        </div>
      </div>
    </>
  );
  const handleCreateUserAndAddTruck = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Creating Truck");
    try {
      const supervisorUID = await createUser(email, "password");

      if (supervisorUID) {
        await addTruck({
          truckAddress: newItem.truckAddress,
          truckName: newItem.truckAddress,
          truckSupervisorName: newItem.truckSupervisorName,
          truckOwnerId: truckOwnerId,
          supervisorUID,
        });
        toast.dismiss(toastId);
        setIsLoading(false);
        toast.success("Truck Created Successfully");
      } else {
        setIsLoading(false);
        toast.dismiss(toastId);
        toast.error("Something went wrong.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.dismiss(toastId);
      toast.error("Something went wrong.");
    }
  };

  const footer = (
    <div className="flex justify-center">
      <Button
        label={`${isEditMode ? "Edit" : "Create"} Truck`}
        disabled={isLoading}
        onClick={handleCreateUserAndAddTruck}
        className="flex justify-center w-1/2 px-6 py-2 text-white rounded max-w-96 bg-carrot"
      />
    </div>
  );
  useEffect(() => {
    if (isEditMode && itemToEdit && visible) {
      setNewItem({
        truckAddress: itemToEdit.truckAddress,
        truckName: itemToEdit.truckName,
        truckSupervisorName: itemToEdit.truckSupervisorName,
      });
    }
  }, [itemToEdit, isEditMode, visible]);
  return (
    <Dialog
      header={`${isEditMode ? "Edit" : "Add"} Truck`}
      pt={{
        header: {
          className: "text-lg font-bold border-b-[1px] border-gray-200",
        },
      }}
      footer={footer}
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
