import { ToDoItem } from "./ToDoList";

export const dummyData: ToDoItem[] = new Array(30).fill(0).map((_, index) => {
  const tags = [];
  const randomTagCount = Math.floor(Math.random() * 4); // Assign any number of tags between 0 and 3
  for (let j = 1; j <= randomTagCount; j++) {
    tags.push(`tag${j}`);
  }
  return {
    key: index,
    created: Date.now(),
    title: `Task ${index}`,
    description: `Description for task ${index}`,
    dueDate: Date.now() + 1000 * 60 * 60 * 24 * 7,
    tags: tags,
    status: ["OPEN", "WORKING", "DONE", "OVERDUE"][
      Math.floor(Math.random() * 4)
    ],
  };
});
