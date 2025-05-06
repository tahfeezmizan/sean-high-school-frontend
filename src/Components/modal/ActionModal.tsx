"use client";
import Link from "next/link";
import { Modal,  } from "antd";
import { TTestimonialsType } from "../../../Type";



interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  openModal: () => void;
  data: TTestimonialsType
}






const ActionModal: React.FC<MyModalProps> = ({  isOpen, onClose, openModal, data }) => {

  return (
    <Modal
    // title="Pace"
      open={isOpen}
      onCancel={onClose}
      centered={false} // Disable default centering
      style={{ top: "80px", right: "20px", position: "absolute" }} 
      className="custom-ant-modal !w-[280px]  absolute  rounded-lg " 
      footer={null}
    >

       <div  className="flex flex-col justify-between gap-10 !p-0">
       <button >
          <Link
            onClick={openModal}
            href="#"
            className="bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40%  hover:from-blue-500 hover:to-blue-700 py-2 px-10 rounded-xl !text-white cursor-pointer  "
          >
            {data?.isOnHomePage ? "Add Home Page" : "Remove Home Page"}
          </Link>
        </button>

       </div>

    </Modal>
  );
};



export default ActionModal;