import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { DeleteConfirmationModalT } from "../utils/types";
import { MdWarning } from "react-icons/md";

const DeleteConfirmationModal = ({
  visible,
  updateVisibility,
  onConfirm,
}: DeleteConfirmationModalT) => {
  const content = (
    <div className="flex flex-col items-center gap-8 text-xl">
      Are you sure you want to delete this ?
      <MdWarning size={60} className="text-red-500" />
    </div>
  );
  const footer = (
    <div className="flex items-center justify-between gap-5">
      <Button
        onClick={() => {
          updateVisibility(false);
        }}
        label="Cancel"
        className="w-full px-6 py-2 font-bold text-white transition duration-100 ease-in-out bg-gray-800 border-none rounded focus:outline-none focus:ring focus:ring-thm-300 text-thm-500 hover:bg-thm-700 hover:text-carrot-100"
      />

      <Button
        onClick={onConfirm}
        label="Confirm"
        pt={{
          root: {
            className: " border-none",
          },
        }}
        className="w-full px-6 py-2 text-white bg-red-500 rounded max-w-96"
      />
    </div>
  );
  return (
    <Dialog
      header="Confirmation"
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
        updateVisibility(false);
      }}
      closable={true}
    >
      <div className="mt-10 leading-6 text-thm-600">{content}</div>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
