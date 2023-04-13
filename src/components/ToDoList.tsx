import { useState } from "react";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { dummyData } from "./dummyData";
import { columns } from "../columns";
import AddTask, { Task } from "./AddTask";
import DeleteTask from "./DeleteTask";
import { message } from "antd";
import { EditOutlined } from "@ant-design/icons";

export interface ToDoItem {
  key: string | number;
  created: number;
  title: string;
  description: string;
  dueDate?: number;
  tags?: string[];
  status: string;
}

const ToDoList = () => {
  const [dataSource, setDataSource] = useState<ToDoItem[]>(dummyData);
  const [loading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const handleTaskAdded = (task: Task) => {
    const newTask: ToDoItem = {
      key: task.id,
      created: Date.now(),
      title: task.title,
      description: task.description || "",
      dueDate: task.dueDate ? task.dueDate.valueOf() : undefined,
      tags:
        task.tags && task.tags.length > 0
          ? task.tags.map((tag) => tag.trim())
          : undefined,
      status: "OPEN",
    };
    setTasks([...tasks, task]);
    setDataSource([...dataSource, newTask]);
  };

  const handleTaskDeleted = (taskId: string | number) => {
    const newDataSource = dataSource.filter((task) => task.key !== taskId);
    setDataSource(newDataSource);
    console.log("Task deleted: ", taskId);
  };

  const actionColumn: ProColumns<ToDoItem> = {
    title: "Actions",
    dataIndex: "key",
    valueType: "option",
    width: 150,
    render: (_text, record, _, action) => {
      return (
        <>
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.key);
            }}
            style={{
              marginRight: 16,
            }}
          >
            Edit
            <EditOutlined />
          </a>
          <DeleteTask
            key={record.key}
            onDelete={handleTaskDeleted}
            taskId={record.key}
          />
        </>
      );
    },
  };

  return (
    <>
      <ProTable<ToDoItem>
        columns={[...columns, actionColumn]}
        rowKey="key"
        search={false}
        loading={loading}
        toolBarRender={() => [<AddTask onTaskAdded={handleTaskAdded} />]}
        options={{
          search: true,
          setting: true,
          fullScreen: true,
          density: true,
          reload: true,
        }}
        pagination={{
          pageSize: 5,
          position: ["bottomCenter"],
          style: { marginTop: 50 },
        }}
        editable={{
          type: "multiple",
          editableKeys,
          onChange: setEditableRowKeys,
          onValuesChange(record, dataSource) {
            console.log("onValuesChange: ", record);
            setDataSource(dataSource);
          },
          onSave: async (key, row) => {
            console.log("onSave: ", key, row);
            message.success("Task updated");
          },
          actionRender: (row, config) => {
            return [
              <a
                key="save"
                onClick={() => {
                  config?.onSave?.(row.key, row, row, undefined);
                }}
              >
                Save
              </a>,
              <a key="cancel" onClick={() => config?.cancelEditable?.(row.key)}>
                Cancel
              </a>,
            ];
          },
        }}
        dataSource={dataSource}
      />
    </>
  );
};

export default ToDoList;
