import React, { useState, useEffect } from "react";
import moment from "moment";
import { Tag } from "antd";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import AddTask, { Task } from "./AddTask";

interface ToDoItem {
  key: string | number;
  created: number;
  title: string;
  description: string;
  dueDate?: number;
  tags?: string[];
  status: string;
}

const ToDoList = () => {
  const dummyData: ToDoItem[] = [];
  for (let i = 1; i < 30; i++) {
    const tags = [];
    const randomTagCount = Math.floor(Math.random() * 3);
    for (let j = 1; j <= randomTagCount; j++) {
      tags.push(`tag${j}`);
    }
    const newDummyItem: ToDoItem = {
      key: i,
      created: Date.now(),
      title: `Task ${i}`,
      description: `Description for Task ${i + 1}`,
      dueDate: Date.now() + i * 1000000000,
      tags: tags,
      status: ["OPEN", "WORKING", "DONE", "OVERDUE"][
        Math.floor(Math.random() * 4)
      ],
    };
    dummyData.push(newDummyItem);
  }

  const [dataSource, setDataSource] = useState<ToDoItem[]>(dummyData);
  const [loading, setLoading] = useState<boolean>(false);
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

  const columns: ProColumns<ToDoItem>[] = [
    {
      title: "Timestamp created",
      dataIndex: "created",
      valueType: "dateTime",
      width: 100,
      editable: false,
      defaultSortOrder: "descend",
      render: (_, { created }) => <span>{moment(created).format("lll")}</span>,
      sorter: (a, b) => a.created - b.created,
    },
    {
      title: "Title",
      dataIndex: "title",
      width: 100,
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
      dataIndex: "tags",
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
      filters: [
        { text: "No Tags", value: "noTags" },
        { text: "Tags Present", value: "tagsPresent" },
      ],
      onFilter: (value, record) => {
        if (value === "noTags") {
          return !record.tags || record.tags.length === 0;
        } else if (value === "tagsPresent") {
          return record.tags && record.tags.length > 0;
        }
        return false;
      },
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

  return (
    <ProTable<ToDoItem>
      columns={columns}
      dataSource={dataSource}
      rowKey="key"
      search={false}
      toolBarRender={() => [<AddTask onTaskAdded={handleTaskAdded} />]}
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
