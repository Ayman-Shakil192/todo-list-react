import { ToDoItem } from "./components/ToDoList";

export const dummyData: ToDoItem[] = new Array(80).fill(0).map((_, index) => {
  const tags = [];
  const randomTagCount = Math.floor(Math.random() * 4); // Assign any number of tags between 0 and 3
  for (let j = 1; j <= randomTagCount; j++) {
    tags.push(`tag${j}`);
  }
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
  return {
    key: index,
    created: createdAt,
    title: `Task ${index}`,
    description: `Description for task ${index}`,
    dueDate: dueDate,
    tags: tags,
    status: ["OPEN", "WORKING", "DONE", "OVERDUE"][
      Math.floor(Math.random() * 4)
    ],
  };
});
