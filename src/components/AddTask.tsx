// Importing required packages and components
import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  DrawerForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import { v4 as uuid } from "uuid";

// Function to simulate wait time
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

// Interface for defining task properties
export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  tags?: string[];
  status: string;
  timestamp: number;
}

// Props interface for CustomModal component
interface CustomModalProps {
  onTaskAdded: (task: Task) => void;
}

// Interface for defining form values
interface FormValues {
  title: string;
  description: string;
  dueDate?: Date;
  tags?: string[];
}

// CustomModal component
export default ({ onTaskAdded }: CustomModalProps) => {
  // Initialize form
  const [form] = Form.useForm<FormValues>();

  // Handle form submission
  const handleSubmit = async (formData: {
    title: string;
    description: string;
    dueDate?: Date | undefined;
    tags?: string[] | string | undefined;
  }) => {
    await waitTime(2000);

    let tagsArray: string[] | undefined;

    // Split tags string into an array
    if (typeof formData.tags === "string") {
      tagsArray = formData.tags.split(",");
    } else {
      tagsArray = formData.tags;
    }

    // Create new task object
    const task: Task = {
      id: uuid(),
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      tags: tagsArray,
      status: "OPEN",
      timestamp: Date.now().valueOf(),
    };

    // Log new task and call onTaskAdded callback function
    console.log(task);
    onTaskAdded(task);

    // Display success message, reset form fields, and return true
    message.success("Task added successfully");
    form.resetFields();
    return true;
  };

  return (
    // Render ModalForm component
    <ModalForm<{
      title: string;
      description: string;
      dueDate?: Date;
      tags?: string[];
    }>
      title="Create a new task"
      form={form}
      trigger={
        // Render Button component
        <Button type="primary">
          <PlusOutlined />
          Add Task
        </Button>
      }
      autoFocusFirstInput
      submitTimeout={2000}
      onFinish={handleSubmit}
    >
      {/* Render form fields */}
      <ProForm.Group>
        <ProFormText
          width="md"
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a title" }]}
          placeholder="Enter a title "
        />
        <ProFormText
          width="md"
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter the description" }]}
          placeholder="Enter a description"
        />
        <ProFormDateRangePicker width="md" name="dueDate" label="Due Date" />
        <ProFormText
          width="md"
          name="tags"
          label="Tags"
          placeholder="Enter one or more tags separated by commas"
        />
      </ProForm.Group>
    </ModalForm>
  );
};
