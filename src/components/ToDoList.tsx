import { useState, useEffect } from "react";
import ToDo from "./ToDo";

export interface ToDoList {
  id: number;
  desc: string;
  status: boolean;
}

const ToDoList: React.FC = () => {
  const [desc, setDesc] = useState(() => "");
  const [editToDo, setEditToDo] = useState(() => -1);
  const [toDoList, setToDoList] = useState<Array<ToDoList>>(() => {
    const tempToDoList = localStorage.getItem('To Do List')
    if (tempToDoList?.length) {
      return JSON.parse(tempToDoList)
    }
  });

  useEffect(() => {
    localStorage.setItem('To Do List', JSON.stringify(toDoList))
  }, [toDoList])

  useEffect(() => {
    toDoList.map((toDo) => {
      return toDo.id === editToDo ? setDesc(toDo.desc) : ""
    });
  }, [editToDo])

  const addTask = () => {
    if (desc.length === 0) {
      setDesc("");
      return;
    }

    if (toDoList.find((toDo) => toDo.desc.toLowerCase().trim() === desc.toLowerCase().trim()))
      return;

    if (editToDo > 0) {
      setToDoList(
        toDoList.map((toDo) =>
          toDo.id === editToDo
            ? {
              ...toDo,
              desc: desc.trim(),
              status: toDo.status ? !toDo.status : toDo.status,
            }
            : toDo
        )
      );
      setEditToDo(-1);
    } else {
      setToDoList(() => [
        { id: Math.floor(Math.random() * 100) + 1, desc: desc.trim(), status: false },
        ...toDoList,
      ]);
    }

    setDesc('');
  };

  const deleteTask = (id: number) => {
    setToDoList(() => toDoList.filter((toDo) => toDo.id !== id));
  };

  const updateDesc = (id: number) => {
    setEditToDo(id)
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
        value={desc}
        type="text"
        placeholder="Add a task"
        onChange={(e) => setDesc(e.target.value)}
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
