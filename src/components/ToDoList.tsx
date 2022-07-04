import { useState, useRef, useEffect } from "react";
import ToDo from "./ToDo";

export interface ToDoListProps {
  id: number;
  desc: string;
  status: boolean;
}

const ToDoList: React.FC = () => {
  const [desc, setDesc] = useState<string>(() => "");
  const [editToDo, setEditToDo] = useState(() => -1);
  const inputRef = useRef<any>();
  const [toDoList, setToDoList] = useState<Array<ToDoListProps>>(() => [
    {
      id: 1,
      desc: "Feed the cat",
      status: false,
    },
    {
      id: 2,
      desc: "Wash the car",
      status: false,
    },
    {
      id: 3,
      desc: "Do laundry",
      status: false,
    },
  ]);

  const addTask = () => {
    setDesc(desc.trim());

    if (desc.length === 0) {
      setDesc("");
      return;
    }

    if (toDoList.find((toDo) => toDo.desc === desc)) return;

    if (editToDo > 0) {
      setToDoList(
        toDoList.map((toDo) =>
          toDo.id === editToDo
            ? {
                ...toDo,
                desc: desc,
                status: toDo.status ? !toDo.status : toDo.status,
              }
            : toDo
        )
      );
      setEditToDo(-1);
    } else
      setToDoList(() => [
        { id: toDoList.length + 1, desc, status: false },
        ...toDoList,
      ]);

    setDesc("");
  };

  const deleteTask = (id: number) => {
    const newToDoList = toDoList.filter((toDo) => toDo.id !== id);
    setToDoList(newToDoList);
  };

  const updateDesc = (id: number) => {
    toDoList.map((toDo) =>
      toDo.id === id ? (inputRef.current.value = toDo.desc) : ""
    );
    setEditToDo(id);
  };

  const toggleToDo = (id: number) => {
    setToDoList(
      toDoList.map((toDo) =>
        toDo.id === id ? { ...toDo, status: !toDo.status } : toDo
      )
    );
  };

  return (
    <>
      <h3>Your To Do List</h3>
      <input
        ref={inputRef}
        type="text"
        placeholder="Add a task"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
        onKeyUp={(e) => (e.key === "Enter" ? addTask() : null)}
      />
      <button onClick={addTask}>Add Task</button>

      <div className="to-do-list">
        {toDoList.map((toDo) => (
          <ToDo
            key={toDo.id}
            toDo={toDo}
            updateDesc={updateDesc}
            deleteTask={deleteTask}
            toggleToDo={toggleToDo}
          />
        ))}
      </div>
    </>
  );
};

export default ToDoList;
