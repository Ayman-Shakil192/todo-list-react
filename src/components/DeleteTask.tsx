import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface DeleteTaskProps {
  taskId: string | number;
  onDelete: (taskId: string | number) => void;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ taskId, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      onDelete(taskId); // Call the onDelete callback with the taskId to be deleted
      message.success("Task deleted");
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        danger
        type="text"
        onClick={showModal}
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        Delete
        <DeleteOutlined />
      </Button>
      <Modal
        title="Delete task"
        open={open}
        okText="Delete"
        onOk={handleOk}
        confirmLoading={confirmLoading}
        cancelText="Cancel"
        onCancel={handleCancel}
        centered={true}
        okButtonProps={{
          danger: true,
          icon: <DeleteOutlined />,
        }}
      >
        <p>Are you sure you want to delete this task?</p>
      </Modal>
    </>
  );
};

export default DeleteTask;
