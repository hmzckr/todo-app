import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import "./components/style.css";

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [willUpdateTodo, setWillUpdateTodo] = useState("");

  useEffect(() => {
    const todosFromLocalStorage = localStorage.getItem("todos");
    console.log(todosFromLocalStorage);
    if (todosFromLocalStorage === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      setTodos(JSON.parse(todosFromLocalStorage));
    }
  }, []);
  // DELETE BUTONU BAŞLANGIC KISMI
  const deleteTodo = (id) => {
    console.log(id);
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos(filteredTodos);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
  };

  const changeIsDone = (id) => {
    const searchedTodo = todos.find((item) => item.id === id);
    const updatedTodo = {
      ...searchedTodo,
      isDone: !searchedTodo.isDone,
    };
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos([updatedTodo, ...filteredTodos]);
    localStorage.setItem(
      "todos",
      JSON.stringify([updatedTodo, ...filteredTodos])
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoText === "") {
      alert("To Do text can't be empty!");
      return;
    }
    const hasTodos = todos.find((item) => item.text === todoText);
    if (hasTodos !== undefined) {
      alert("You have the Todo already");
      return;
    }
    if (isEdit === true) {
      const searchedTodo = todos.find((item) => item.id === willUpdateTodo);
      const updatedTodo = {
        ...searchedTodo,
        text: todoText,
      };
      const filteredTodos = todos.filter((item) => item.id !== willUpdateTodo);
      setTodos([...filteredTodos, updatedTodo]);
      localStorage.setItem(
        "todos",
        JSON.stringify([...filteredTodos, updatedTodo])
      );
      setTodoText("");
      setIsEdit(false);
      setWillUpdateTodo("");
    } else {
      const newTodo = {
        id: new Date().getTime(),
        isDone: false,
        text: todoText,
        date: new Date(),
      };
      console.log("newTodo", newTodo);
      setTodos([...todos, newTodo]); // TODO EKLEME 1. KISIM
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
      setTodoText("");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-5 display-5">To Do List </h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            value={todoText}
            type="text"
            className="form-control"
            placeholder="Add to To-Do list"
            onChange={(event) => setTodoText(event.target.value)}
          />
          <button
            className={`btn btn-${isEdit === true ? "success" : "primary"}`}
            type="submit"
          >
            {isEdit === true ? "Save" : "Add"}
          </button>
        </div>
      </form>
      {
        // todos.length <=0 ? () : () ----- Bu şekil if else fonskiyonudur. ? işareti şu anlama geliyor, eğer ilk koşul doğru ise () ilk olan calısır değilse ikinci () calısır.

        todos.length <= 0 ? (
          <div className="todosyetnot">
            <p className="text-center my-5">You don't have any Todos yet.</p>
          </div>
        ) : (
          // TODOS EKLEME YERİ 2. KISIM <> </> ARASI.

          <>
            {todos.map((item) => (
              <Todo
                item={item}
                deleteTodo={deleteTodo}
                setIsEdit={setIsEdit}
                setWillUpdateTodo={setWillUpdateTodo}
                setTodoText={setTodoText}
                changeIsDone={changeIsDone}
              />
            ))}
          </>
        )
      }
    </div>
  );
}

export default App;
