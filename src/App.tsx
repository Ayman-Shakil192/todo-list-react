import React from "react";
import "./App.css";
import ToDoList from "./components/ToDoList";

const App: React.FC = () => {
  return (
    <div className="App">
      <nav>
        <h3>AlgoBulls Frontend Developer Coding Assignment</h3>
      </nav>
      <ToDoList />
      <footer>
        <p>
          Developed by{" "}
          <a
            href="https://github.com/Ayman-Shakil192"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ayman Shakil
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
