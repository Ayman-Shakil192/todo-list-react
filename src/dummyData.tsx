import axios from "axios";
import { ToDoItem } from "./components/ToDoList";

const fetchData = async () => {
  const response = await axios.get("https://dummyjson.com/todos?limit=150");
  const todos = response.data.todos;

  const tags: string[] = [];
  const randomTagCount = Math.floor(Math.random() * 4);
  for (let j = 1; j <= randomTagCount; j++) {
    tags.push(`tag${j}`);
  }

  return todos.map((todo: any, index: number) => {
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
};

export const dummyData: ToDoItem[] = await fetchData();
