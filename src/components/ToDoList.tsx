import React, { useState } from "react";
import ProTable, { EditableProTable, ProColumns } from "@ant-design/pro-table";
import { dummyData } from "./dummyData";
import { columns } from "../columns";
import AddTask, { Task } from "./AddTask";

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

  return (
    <>
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
          style: { marginTop: 50 },
        }}
        loading={loading}
      />
    </>
  );
};

export default ToDoList;
