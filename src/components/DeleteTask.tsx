import React, { useState } from "react";
import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface DeleteTaskProps {
  taskId: string | number;
  onDelete: (taskId: string | number) => void;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ taskId, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
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
    <Popconfirm
      title="Delete task"
      description="Are you sure you want to delete this task?"
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
      placement="left"
    >
      <Button
        danger
        type="text"
        onClick={showPopconfirm}
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        Delete
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};

export default DeleteTask;
