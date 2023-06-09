import { ToDoItem } from "./components/ToDoList";
import moment from "moment";
import { Tag } from "antd";
import { ProColumns } from "@ant-design/pro-table";

export const columns: ProColumns<ToDoItem>[] = [
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
    dataIndex: "tags",
    width: 150,
    ellipsis: true,
    render: (_, { tags }) => {
      if (!Array.isArray(tags)) {
        tags = tags
          ? (tags as string).split(",").map((tag: string) => tag.trim())
          : [];
      }
      tags = [...new Set(tags)];
      return (
        <span>
          {Array.isArray(tags) && tags.length > 0
            ? tags.map((tag) => (
                <Tag key={tag} color="purple">
                  {tag.toUpperCase()}
                </Tag>
              ))
            : "No tags added"}
        </span>
      );
    },
    filters: [
      { text: "No Tags", value: "noTags" },
      { text: "Tags Present", value: "tagsPresent" },
    ],
    onFilter: (value, record) => {
      if (value === "noTags" && (!record.tags || record.tags.length === 0)) {
        return true;
      }
      if (value === "tagsPresent" && record.tags && record.tags.length > 0) {
        return true;
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
    render: (_text, { status }) => {
      const tagType = {
        open: "blue",
        working: "yellow",
        done: "green",
        overdue: "red",
        OPEN: "blue",
        WORKING: "yellow",
        DONE: "green",
        OVERDUE: "red",
      }[status];
      return <Tag color={tagType}>{status.toUpperCase()}</Tag>;
    },
  },
];
