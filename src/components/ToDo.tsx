import { ToDoList } from "./ToDoList";

interface Props {
  toDo: ToDoList;
  deleteTask: (id: number) => void;
  updateDesc: (id: number) => void;
  toggleToDo: (id: number) => void;
}

const ToDo: React.FC<Props> = ({
  toDo,
  deleteTask,
  updateDesc,
  toggleToDo,
}) => {
  const { id, desc, status } = toDo;

  return (
    <div>
      <h3>{status ? <del>{desc}</del> : desc}</h3>
      <h3 onDoubleClick={() => toggleToDo(id)}>
        {status ? "Completed" : "Incomplete"}
      </h3>
      <button onClick={() => updateDesc(id)}>Edit</button>
      <button onClick={() => deleteTask(id)}>Delete</button>
      <br />
      <br />
    </div>
  );
};

export default ToDo;
