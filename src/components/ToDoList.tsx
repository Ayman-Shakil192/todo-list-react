import { useState, useEffect } from "react";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { columns } from "../columns";
import AddTask, { Task } from "./AddTask";
import DeleteTask from "./DeleteTask";
import { message } from "antd";
import { Input } from "antd";
import axios from "axios";
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
  const [dataSource, setDataSource] = useState<ToDoItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  // Populating the table with dummy data
  const fetchData = () => {
    axios
      .get("https://dummyjson.com/todos?limit=150")
      .then((response) => {
        const todos = response.data.todos;

        const data = todos.map((todo: any, index: number) => {
          const randomDays = Math.floor(Math.random() * 365);
          const randomHours = Math.floor(Math.random() * 24);
          const randomMinutes = Math.floor(Math.random() * 60);
          const randomSeconds = Math.floor(Math.random() * 60);
          const createdAt = new Date(
            Date.now() -
              randomDays * 24 * 60 * 60 * 1000 -
              randomHours * 60 * 60 * 1000 -
              randomMinutes * 60 * 1000 -
              randomSeconds * 1000
          ).getTime();
          const dueDate = new Date(
            createdAt + Math.floor(Math.random() * 5 + 1) * 24 * 60 * 60 * 1000
          ).getTime();
          const selectedTags: string[] = [];
          const selectedTagCount = Math.floor(Math.random() * 4);
          for (let j = 1; j <= selectedTagCount; j++) {
            selectedTags.push(`tag${j}`);
          }
          return {
            key: index,
            created: createdAt,
            title: `Task ${index}`,
            description: todo.todo,
            dueDate: dueDate,
            tags: selectedTags,
            status: ["OPEN", "WORKING", "DONE", "OVERDUE"][
              Math.floor(Math.random() * 4)
            ],
          };
        }) as ToDoItem[];

        setLoading(false);
        setDataSource(data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching tasks: ", error);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const handleTaskAdded = (task: Task) => {
    // filter out duplicate tags
    const newTags = task.tags
      ? task.tags
          .map((tag) => tag.trim())
          .filter((tag, index, self) => self.indexOf(tag) === index) // filter out duplicates
      : undefined;
    const newTask: ToDoItem = {
      key: task.id,
      created: Date.now(),
      title: task.title,
      description: task.description || "",
      dueDate: task.dueDate ? task.dueDate.valueOf() : undefined,
      tags: newTags,
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
    const filteredDataSource = dataSource.filter(
      (task) =>
        task.title.toLowerCase().includes(value.toLowerCase()) ||
        task.description.toLowerCase().includes(value.toLowerCase()) ||
        task.tags?.includes(value.toLowerCase()) ||
        task.status.toLowerCase().includes(value.toLowerCase())
    );
    console.log("Filtered data source: ", filteredDataSource);
    setDataSource(filteredDataSource);
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
                style={{ width: 300 }}
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
            </div>
          </div>,
        ]}
        options={{
          setting: true,
          fullScreen: false,
          density: true,
          reload: () => {
            setLoading(true);
            fetchData();
          },
        }}
        search={false}
        pagination={{
          pageSize: pageSize,
          position: ["bottomCenter"],
          style: { marginTop: 50 },
          pageSizeOptions: ["5", "10", "15", "20"],
          onChange: (_page, pageSize) => {
            setPageSize(pageSize);
          },
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} tasks`,
        }}
        editable={{
          type: "multiple",
          editableKeys,
          onChange: setEditableRowKeys,
          onValuesChange(_record, dataSource) {
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
