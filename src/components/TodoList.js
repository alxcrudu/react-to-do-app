import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";


function TodoList() {
  const [todos, setTodos] = useState([]);

// useEffect(() => {
//   getLocalTodos();
// }, []);

// useEffect(() => {
//   saveLocalTodos();
// }, [todos]);

// const saveLocalTodos = () => {
//   localStorage.setItem("todos", JSON.stringify(todos));
// };

// const getLocalTodos = () => {
//   if(localStorage.getItem("todos") === null) {
//     localStorage.setItem("todos", JSON.stringify([]));
//   } else {
//     let todoLocal = JSON.parse(localStorage.getItem("todos"));
//     setTodos(todoLocal)
//   }
// };

  const addTodo = todo => {
    if(!todo.text || /^\s*$/.test(todo.text)) {
        return
    }
    const newTodos = [todo, ...todos]
    setTodos(newTodos)
  };


  const updateTodo = (todoId, newValue) => {
    if(!newValue.text || /^\s*$/.test(newValue.text)) {
        return;
    }
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
  };

  const removeTodo = id => {
    const removeArr = [...todos].filter(todo => todo.id !== id)
    setTodos(removeArr)
  };


  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
        if(todo.id === id) {
            todo.isComplete = !todo.isComplete
        }
        return todo
    })
    setTodos(updatedTodos);
  };


  useEffect(() => {
    const storedTodos = localStorage.getItem("storedTodos");
    if (storedTodos !== "[]") {
      setTodos(JSON.parse(localStorage.getItem("storedTodos")));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("storedTodos", JSON.stringify(todos));
  }, [todos]);


  return (
    <div>
      <h1>What's the plan for today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo 
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;
