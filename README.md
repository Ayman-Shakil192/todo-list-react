
# AlgoBulls Frontend Developer Coding Assignment


This is a web-based to-do list application built using Vite and devloped with React providing  the following features:

* Tasks are displayed in a tabular format using Ant Pro table component
* The table has columns for timestamp created, title, description, due date, tag, and status
* The table supports pagination, sorting, and filtering based on the columns mentioned above
* User can perform operations like adding, modifying, and deleting to-do entries
* User can perform a case-insensitive search for any task based on the data in any of the columns mentioned above.

# Tech stack used

* [Vite](https://vitejs.dev/guide/)
* [React](https://react.dev/)
* [Ant Design Pro Components](https://procomponents.ant.design/en-US)
* [TypeScript](https://www.typescriptlang.org/)

# Live site URL

* [Live site](https://todo-list-react-ayman.netlify.app/)

# Populating the table data

The timestamp,title,Due date,tags and status have all been randomly generated , I made use of a dummy Mock [Todo API](https://dummyjson.com/docs/todos) to generate descriptions for each and every task as shown below in the code 

```typescript
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
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/Ayman-Shakil192/todo-list-react.git
```

Go to the project directory

```bash
  cd todo-list-react
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
