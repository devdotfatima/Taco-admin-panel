import { useEffect, useMemo, useState } from "react";
import { MenuModalT } from "../utils/types";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { addMenuItemInTruck, updateMenuItemInTruck } from "../api";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { categories } from "../utils/const";
import { Button } from "primereact/button";
import toast from "react-hot-toast";
import { InputSwitch } from "primereact/inputswitch";
import { formatString } from "../utils/helpers";

enum STEPS {
  ITEM_DETAIL = 0,
  DEALS = 1,
}

const MenuModal = ({
  visible,
  updateVisibility,
  truckId,
  itemToEdit,
}: MenuModalT) => {
  const isEditMode = !!itemToEdit;
  const [step, setStep] = useState(STEPS.ITEM_DETAIL);
  const [isLoading, setIsLoading] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    description: "",
    ingredients: "",
    category: { name: "", code: "" },
    basicPackageName: "Basic",
    basicPackagePrice: "$15",
    comboDealPackageName: "Combo Deal",
    comboDealPackagePrice: "$35",
    available: true,
  });

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };
  const actionLabel = useMemo(() => {
    if (step === STEPS.DEALS) {
      return isEditMode ? "Update" : "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.ITEM_DETAIL) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const onSecondaryAction = useMemo(() => {
    return step === STEPS.ITEM_DETAIL ? undefined : onBack;
  }, [step]);

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
            id="name"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            placeholder="Beef Burger"
            className="text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0"
          />
        </div>
        <div className="flex flex-col justify-between gap-2 sm:items-center sm:flex-row">
          <h2 className="font-semibold text-gray-400 font-poppins">Price</h2>
          <InputText
            id="price"
            name="price"
            value={newItem.price}
            onChange={handleInputChange}
            placeholder="$20"
            className="text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0"
          />
        </div>
        <div className="flex flex-col justify-between gap-2 sm:items-center sm:flex-row">
          <h2 className="font-semibold text-gray-400 font-poppins">
            Food Category
          </h2>

          <Dropdown
            name="category"
            value={newItem.category}
            onChange={(e: DropdownChangeEvent) => handleInputChange(e)}
            options={categories}
            optionLabel="name"
            placeholder="Select Catgeory"
            className="text-center focus:ring-0 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0"
          />
        </div>
        <div className="flex flex-col justify-between gap-2 sm:items-center sm:flex-row">
          <h2 className="font-semibold text-gray-400 font-poppins">
            Description
          </h2>
          <InputTextarea
            id="description"
            name="description"
            value={newItem.description}
            onChange={handleInputChange}
            className=" sm:max-w-80 w-full focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0"
          />
        </div>

        <div className="flex flex-col justify-between gap-2 sm:items-center sm:flex-row">
          <h2 className="font-semibold text-gray-400 font-poppins">
            Ingredients
          </h2>
          <InputTextarea
            id="ingredients"
            name="ingredients"
            value={newItem.ingredients}
            onChange={handleInputChange}
            rows={2}
            className=" sm:max-w-80 w-full focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0"
          />
        </div>
      </div>
    </>
  );

  if (step === STEPS.DEALS) {
    content = (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex flex-col justify-between gap-2 sm:items-center sm:flex-row">
            <h4 className="font-semibold text-gray-400 font-poppins">
              Basic Deal
            </h4>
            <InputText
              id="basicPackageName"
              name="basicPackageName"
              value={newItem.basicPackageName}
              onChange={handleInputChange}
              placeholder="Deal Name"
              className="text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0"
            />
          </div>
          <div className="flex flex-col justify-between gap-2 sm:items-center sm:flex-row">
            <h4 className="font-semibold text-gray-400 font-poppins">
              Basic Deal Price
            </h4>
            <InputText
              id={`basicPackagePrice`}
              name="basicPackagePrice"
              value={newItem.basicPackagePrice}
              onChange={handleInputChange}
              placeholder="Deal Price"
              className="text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex flex-col justify-between gap-2 sm:items-center sm:flex-row">
            <h4 className="font-semibold text-gray-400 font-poppins">
              Combo Deal
            </h4>
            <InputText
              id="comboDealPackageName"
              name="comboDealPackageName"
              value={newItem.comboDealPackageName}
              onChange={handleInputChange}
              placeholder="Deal Name"
              className="text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0"
            />
          </div>
          <div className="flex flex-col justify-between gap-2 sm:items-center sm:flex-row">
            <h4 className="font-semibold text-gray-400 font-poppins">
              Combo Deal Price
            </h4>
            <InputText
              id={`comboDealPackagePrice`}
              name="comboDealPackagePrice"
              value={newItem.comboDealPackagePrice}
              onChange={handleInputChange}
              placeholder="Deal Price"
              className="text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex flex-col justify-between gap-2 sm:items-center sm:flex-row">
            <h4 className="font-semibold text-gray-400 font-poppins">
              Combo Deal
            </h4>
            <InputText
              id="comboDealPackageName"
              name="comboDealPackageName"
              value={newItem.comboDealPackageName}
              onChange={handleInputChange}
              placeholder="Deal Name"
              className="text-center focus:ring-0 p-2 bg-gray-100 border-[1px] border-gray-300 rounded outline-none ring-0"
            />
          </div>
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
    );
  }

  const onSubmit = async () => {
    setIsLoading(true);
    const toastId = toast.loading(
      `${isEditMode ? "Updating" : "Adding"} Menu Item`
    );
    try {
      const newMenuItemId = isEditMode
        ? await updateMenuItemInTruck({
            docId: itemToEdit.docId,
            name: newItem.name,
            category: newItem.category.code,
            description: newItem.description,
            price: newItem.price,
            ingredients: newItem.ingredients,
            basicPackageName: newItem.basicPackageName,
            basicPackagePrice: newItem.basicPackagePrice,
            comboDealPackageName: newItem.comboDealPackageName,
            comboDealPackagePrice: newItem.comboDealPackagePrice,
            available: true,
          })
        : await addMenuItemInTruck({
            name: newItem.name,
            category: newItem.category.code,
            description: newItem.description,
            truckId: truckId,
            price: newItem.price,
            ingredients: newItem.ingredients,
            basicPackageName: newItem.basicPackageName,
            basicPackagePrice: newItem.basicPackagePrice,
            comboDealPackageName: newItem.comboDealPackageName,
            comboDealPackagePrice: newItem.comboDealPackagePrice,
            available: true,
          });
      if (newMenuItemId) {
        setIsLoading(false);
        toast.dismiss(toastId);
        toast.success(` Menu Item ${isEditMode ? "Updated" : "Created"}`);
        updateVisibility(false);
        setNewItem({
          name: "",
          price: "",
          description: "",
          ingredients: "",
          category: { name: "", code: "" },
          basicPackageName: "Basic",
          basicPackagePrice: "$15",
          comboDealPackageName: "Combo Deal",
          comboDealPackagePrice: "$35",
          available: true,
        });
        setStep(STEPS.ITEM_DETAIL);
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
    <div
      className={` flex gap-8 items-center w-full justify-end ${
        onSecondaryAction && secondaryActionLabel
          ? "p-6 px-16 "
          : "px-40 pt-6 pb-6"
      }`}
    >
      {onSecondaryAction && secondaryActionLabel && (
        <Button
          label={secondaryActionLabel}
          onClick={onSecondaryAction}
          className="w-full px-6 py-2 font-bold text-white transition duration-100 ease-in-out bg-gray-800 border-none rounded focus:outline-none focus:ring focus:ring-thm-300 text-thm-500 hover:bg-thm-700 hover:text-carrot-100"
        />
      )}

      {actionLabel && (
        <Button
          disabled={isLoading}
          label={actionLabel}
          onClick={step === STEPS.ITEM_DETAIL ? onNext : onSubmit}
          pt={{
            root: {
              className: " border-none",
            },
          }}
          className="w-full px-6 py-2 text-white rounded max-w-96 bg-carrot"
        />
      )}
    </div>
  );
  useEffect(() => {
    if (isEditMode && itemToEdit && visible) {
      setNewItem({
        name: itemToEdit.name,
        price: itemToEdit.price,
        description: itemToEdit.description,
        ingredients: itemToEdit.ingredients,
        category: {
          name: formatString(itemToEdit.categoryType),
          code: itemToEdit.categoryType,
        },
        basicPackageName: itemToEdit.basicPackageName,
        basicPackagePrice: itemToEdit.basicPackagePrice,
        comboDealPackageName: itemToEdit.comboDealPackageName,
        comboDealPackagePrice: itemToEdit.comboDealPackagePrice,
        available: itemToEdit.availability,
      });
    }
  }, [itemToEdit, isEditMode, visible]);
  return (
    <Dialog
      header={`${isEditMode ? "Edit" : "Add"} Menu Item`}
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
          name: "",
          price: "",
          description: "",
          ingredients: "",
          category: { name: "", code: "" },
          basicPackageName: "Basic",
          basicPackagePrice: "$15",
          comboDealPackageName: "Combo Deal",
          comboDealPackagePrice: "$35",
          available: true,
        });
        setStep(STEPS.ITEM_DETAIL);
        updateVisibility(false);
      }}
      closable={true}
    >
      <div className="mt-10 leading-6 text-thm-600">{content}</div>
    </Dialog>
  );
};

export default MenuModal;
