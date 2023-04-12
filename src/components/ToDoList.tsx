import React, { useState, useEffect } from "react";
import moment from "moment";
import { Tag } from "antd";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import CustomModal, { Task } from "./CustomModal";

interface ToDoItem {
  key: string | number;
  created: number;
  title: string;
  description: string;
  dueDate?: number;
  tags?: string[];
  status: string;
}

const columns: ProColumns<ToDoItem>[] = [
  {
    title: "Timestamp created",
    dataIndex: "created",
    valueType: "dateTime",
    width: 150,
    editable: false,
    defaultSortOrder: "descend",
    render: (_, { created }) => <span>{moment(created).format("lll")}</span>,
    sorter: (a, b) => a.created - b.created,
  },
  {
    title: "Title",
    dataIndex: "title",
    width: 150,
    ellipsis: true,
    formItemProps: {
      rules: [{ required: true }],
    },
    render: (_, { title }) => <span>{title}</span>,
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Description",
    dataIndex: "description",
    width: 200,
    ellipsis: true,
    formItemProps: {
      rules: [{ required: true }],
    },
    render: (_, { description }) => <span>{description}</span>,
    sorter: (a, b) => a.description.localeCompare(b.description),
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    valueType: "dateTime",
    width: 150,
    formItemProps: {
      rules: [{ type: "object" }],
    },
    render: (_, { dueDate }) => (
      <span>
        {dueDate ? moment(dueDate).format("MMM DD, YYYY") : "No due date"}
      </span>
    ),
    sorter: (a, b) => (a.dueDate ?? 0) - (b.dueDate ?? 0),
  },

  {
    title: "Tags",
    dataIndex: "tag",
    width: 150,
    formItemProps: {
      rules: [{ type: "array" }],
    },
    render: (_, { tags }) => (
      <span>
        {tags && tags.length > 0
          ? tags.map((tag) => (
              <Tag key={tag} color="purple">
                {tag.toUpperCase()}
              </Tag>
            ))
          : "No tags added"}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 150,
    valueEnum: {
      open: { text: "OPEN", status: "blue" },
      working: { text: "WORKING", status: "yellow" },
      done: { text: "DONE", status: "green" },
      overdue: { text: "OVERDUE", status: "red" },
    },
    formItemProps: {
      rules: [{ required: true }],
    },
    filters: [
      { text: "OPEN", value: "OPEN" },
      { text: "WORKING", value: "WORKING" },
      { text: "DONE", value: "DONE" },
      { text: "OVERDUE", value: "OVERDUE" },
    ],
    onFilter: (value, { status }) => status === value,
    render: (text, { status }) => {
      const tagType = {
        OPEN: "blue",
        WORKING: "yellow",
        DONE: "green",
        OVERDUE: "red",
      }[status];
      return <Tag color={tagType}>{status}</Tag>;
    },
  },
];

const ToDoList = () => {
  const [dataSource, setDataSource] = React.useState<ToDoItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskAdded = (task: Task) => {
    setTasks([...tasks, task]);

    const newTask: ToDoItem = {
      key: task.id,
      created: Date.now(),
      title: task.title,
      description: task.description ? task.description : "",
      dueDate: task.dueDate ? task.dueDate[1].valueOf() : undefined,
      tags:
        typeof task.tags === "string" && task.tags !== ""
          ? task.tags.split(",").map((tag: string) => tag.trim())
          : Array.isArray(task.tags)
          ? task.tags
          : [],
      status: "OPEN",
    };

    setDataSource([...dataSource, newTask]);
  };

  return (
    <ProTable<ToDoItem>
      columns={columns}
      dataSource={dataSource}
      rowKey="key"
      search={false}
      toolBarRender={() => [<CustomModal onTaskAdded={handleTaskAdded} />]}
      options={{
        search: false,
        setting: false,
        fullScreen: false,
        density: false,
      }}
      pagination={{
        pageSize: 5,
        position: ["bottomCenter"],
      }}
      loading={loading}
    />
  );
};

export default ToDoList;
