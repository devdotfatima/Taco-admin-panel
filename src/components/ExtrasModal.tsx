import { useEffect, useState } from "react";
import { ExtraModalT } from "../utils/types";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { addExtrasItemInTruck, updateExtrasItemInTruck } from "../api";
import { Button } from "primereact/button";
import toast from "react-hot-toast";
import { InputSwitch } from "primereact/inputswitch";

const ExtrasModal = ({
  visible,
  updateVisibility,
  truckId,
  itemToEdit,
}: ExtraModalT) => {
  const isEditMode = !!itemToEdit;
  const [isLoading, setIsLoading] = useState(false);
  const [newItem, setNewItem] = useState({
    extraFoodName: "",
    extraFoodPrice: "",
    available: true,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "category") {
      setNewItem({ ...newItem, [name]: value });
      return;
    }
    setNewItem({ ...newItem, [name]: value });
  };

  let content = (
    <>
      <div className="flex flex-col gap-3 ">
        <div className="flex flex-col justify-between gap-2 sm:items-center sm:flex-row">
          <h2 className="font-semibold text-gray-400 font-poppins">Name</h2>
          <InputText
            id="extraFoodName"
            name="extraFoodName"
            required
            value={newItem.extraFoodName}
            onChange={handleInputChange}
            placeholder="Cheese"
            className="text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0"
          />
        </div>
        <div className="flex flex-col justify-between gap-2 sm:items-center sm:flex-row">
          <h2 className="font-semibold text-gray-400 font-poppins">Price</h2>
          <InputText
            id="extraFoodPrice"
            required
            name="extraFoodPrice"
            value={newItem.extraFoodPrice}
            onChange={handleInputChange}
            placeholder="$5"
            className="text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0"
          />
        </div>
        <div className="flex flex-col justify-between gap-2 sm:items-center sm:flex-row">
          <h4 className="font-semibold text-gray-400 font-poppins">
            Available
          </h4>
          <InputSwitch
            name="available"
            checked={newItem.available}
            pt={{
              slider: {
                className: `${newItem.available ? "bg-carrot" : "bg-gray-400"}`,
              },
            }}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  );

  const onSubmit = async () => {
    setIsLoading(true);

    const toastId = toast.loading(
      `${isEditMode ? "Updating" : " Creating"} Extras Item`
    );
    try {
      const newMenuItemId = isEditMode
        ? await updateExtrasItemInTruck({
            extraFoodName: newItem.extraFoodName,
            available: newItem.available,
            docId: itemToEdit.docId,
            extraFoodPrice: newItem.extraFoodPrice,
          })
        : await addExtrasItemInTruck({
            extraFoodName: newItem.extraFoodName,
            available: newItem.available,
            truckId: truckId,
            extraFoodPrice: newItem.extraFoodPrice,
          });
      if (newMenuItemId) {
        setIsLoading(false);
        toast.dismiss(toastId);
        toast.success(` Extra Item ${isEditMode ? "Updated" : "Created"}`);
        updateVisibility(false);
        setNewItem({
          extraFoodName: "",
          extraFoodPrice: "",
          available: true,
        });
      } else {
        setIsLoading(false);
        toast.dismiss(toastId);
        toast.error(" Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.dismiss(toastId);
      toast.error(" Something went wrong.");
    }
  };

  const footer = (
    <div className="flex justify-center">
      <Button
        disabled={isLoading}
        label={`${isEditMode ? "Update" : "Create"} Extra`}
        onClick={onSubmit}
        pt={{
          root: {
            className: " border-none",
          },
        }}
        className="w-1/2 px-6 py-2 text-white rounded max-w-96 bg-carrot"
      />
    </div>
  );
  useEffect(() => {
    if (isEditMode && itemToEdit && visible) {
      setNewItem({
        extraFoodName: itemToEdit.extraFoodName,
        extraFoodPrice: itemToEdit.extraFoodPrice,
        available: itemToEdit.available,
      });
    }
  }, [itemToEdit, isEditMode, visible]);
  return (
    <Dialog
      header={`${isEditMode ? "Edit" : "Create"} Extra Item`}
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
      onHide={() => {
        setNewItem({
          extraFoodName: "",
          extraFoodPrice: "",
          available: true,
        });

        updateVisibility(false);
      }}
      closable={true}
    >
      <div className="mt-10 leading-6 text-thm-600">{content}</div>
    </Dialog>
  );
};

export default ExtrasModal;
