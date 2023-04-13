import { useState } from "react";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { dummyData } from "../dummyData";
import { columns } from "../columns";
import AddTask, { Task } from "./AddTask";
import DeleteTask from "./DeleteTask";
import { message } from "antd";
import { Input } from "antd";
import React from "react";

export interface ToDoItem {
  key: string | number;
  created: number;
  title: string;
  description: string;
  dueDate?: number;
  tags?: string[];
  status: string;
}

const { Search } = Input;

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.key);
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
        </div>
      );
    },
  };

  const onSearch = (value: string) => {
    console.log("Search value: ", value);
    const filteredDataSource = dummyData.filter(
      (task) =>
        task.title.toLowerCase().includes(value.toLowerCase()) ||
        task.description.toLowerCase().includes(value.toLowerCase())
    );
    console.log("Filtered data source: ", filteredDataSource);
    setDataSource(filteredDataSource);
  };

  const handleReload = () => {
    setLoading(true);
    setTimeout(() => {
      setDataSource(dummyData);
      setLoading(false);
      message.success("Tasks reloaded");
    }, 1000);
  };

  return (
    <>
      <ProTable<ToDoItem>
        columns={[...columns, actionColumn]}
        rowKey="key"
        loading={loading}
        toolBarRender={() => [
          <div
            style={{
              display: "flex",
            }}
          >
            <div>
              <Search
                placeholder="Search for tasks"
                onSearch={onSearch}
                size="large"
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              <div>
                <AddTask onTaskAdded={handleTaskAdded} />
              </div>
              <div
                style={{
                  marginLeft: 10,
                }}
              >
                <ReloadOutlined onClick={handleReload} />
              </div>
            </div>
          </div>,
        ]}
        options={{
          setting: true,
          fullScreen: false,
          density: true,
          reload: false,
        }}
        search={false}
        pagination={{
          pageSize: 10,
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
