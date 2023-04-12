import { PlusOutlined } from "@ant-design/icons";
import {
  DrawerForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import { v4 as uuid } from "uuid";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  tags?: string[];
  status: string;
  timestamp: number;
}

interface CustomModalProps {
  onTaskAdded: (task: Task) => void;
}

export default ({ onTaskAdded }: CustomModalProps) => {
  const [form] = Form.useForm<{}>();

  const handleSubmit = async (formData: {
    title: string;
    description: string;
    dueDate?: Date | undefined;
    tags?: string[] | string | undefined;
  }) => {
    await waitTime(2000);

    let tagsArray: string[] | undefined;

    if (typeof formData.tags === "string") {
      tagsArray = formData.tags.split(",");
    } else {
      tagsArray = formData.tags;
    }

    const task: Task = {
      id: uuid(),
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      tags: tagsArray,
      status: "OPEN",
      timestamp: Date.now().valueOf(),
    };
    console.log(task);
    onTaskAdded(task);
    message.success("Task added successfully");
    form.resetFields();
    return true;
  };

  return (
    <DrawerForm<{
      title: string;
      description: string;
      dueDate?: Date;
      tags?: string[];
    }>
      title="Create a new task"
      form={form}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          Add Task
        </Button>
      }
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={handleSubmit}
    >
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
    </DrawerForm>
  );
};
