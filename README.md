
# AlgoBulls Frontend Developer Coding Assignment


This is a web-based to-do list application built using Vite and devloped with React providing  the following features:

* Tasks are displayed in a tabular format using Ant Pro table component
* The table has columns for timestamp created, title, description, due date, tag, and status
* The table supports pagination, sorting, and filtering based on the columns mentioned above
* User can perform operations like adding, modifying, and deleting to-do entries
* User can perform a case-insensitive search for any task based on the data in any of the columns mentioned above.

# Lets get started

Instead of using a mock API , a dummy data is created with random timestamps,title,description,due dates,tags and status to populate the table as follows.

```javascript
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

```

For screenshot purposes , pagination is set to 5 to display 5 records per page , it can be changed as per user convenience.

```javascript
<ProTable<DefaultType>
  ...// other props
  pagination={{
          ...// other props
          pageSize: preferredPageSize,
        }}
 />
```

![ss1](https://user-images.githubusercontent.com/88003292/231910101-198fecee-96e3-49db-ade6-a34c57a6d87a.png)

Tags and status can be filtered as shown

![ss2](https://user-images.githubusercontent.com/88003292/231910105-a16a2355-8bce-40e7-98fa-20ef138615a2.png)

Result

![ss3](https://user-images.githubusercontent.com/88003292/231910107-95bc3fd6-1159-4cda-985f-c178b85fe493.png)

Adding a task

![ss4](https://user-images.githubusercontent.com/88003292/231910175-0dc20382-b896-4832-ab94-a18bb2b82c8c.png)

Validation for empty fields

![ss5](https://user-images.githubusercontent.com/88003292/231910170-3892766e-318c-4b3c-a878-522c28b2730c.png)

Task added

![ss6](https://user-images.githubusercontent.com/88003292/231910192-9a500cf3-0a4d-4f36-ba1e-98400207f97f.png)

Asking confirmation from user to delete task

![ss7](https://user-images.githubusercontent.com/88003292/231910206-79be1ddf-607b-452d-a4c5-63d2b58ad0e7.png)

Task deleted

![ss8](https://user-images.githubusercontent.com/88003292/231910219-ea5e90d3-1987-4d59-ac28-f2411c848f1a.png)

Editing a task

![ss9](https://user-images.githubusercontent.com/88003292/231910251-1e1340e5-8e0b-430b-bc42-8384d7c055db.png)

Updating the fields 

![ss10](https://user-images.githubusercontent.com/88003292/231910278-ba150294-9142-4ecb-b627-c8bbceafe506.png)

Task Edited

![ss11](https://user-images.githubusercontent.com/88003292/231910301-6d9ff639-8021-4678-93e1-9ca3f7b19044.png)


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

# Tech stack used

* [Vite](https://vitejs.dev/guide/)
* [React](https://react.dev/)
* [Ant Design Pro Components](https://procomponents.ant.design/en-US)
* [TypeScript](https://www.typescriptlang.org/)

# Live site URL

* [Live site](https://todo-list-react-ayman.netlify.app/)


