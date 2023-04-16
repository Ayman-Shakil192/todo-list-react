
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

# Working

Here is a video demonstration showing the functionalities and working of the application.

* The application supports pagination and can display upto 5,10,15 and 20 tasks per page
* User's can sort the Timestamp created, Title, Description and Due Date columns in ascending and descending order 
* User's can filter Tags based on their presence (Present or Not present) and STATUS based on their values like (OPEN,WORKING,DONE,OVERDUE)
* User's can add task's which by default is set to OPEN status and the Timestamp is generated automatically on the time of creation
* User's can modify tasks and even delete them based on their preferences
* User's can perform a case insensitive search on either fields to search for a particular task.

https://user-images.githubusercontent.com/88003292/232334817-baeced86-88da-490e-862c-1334e09a3755.mp4

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
