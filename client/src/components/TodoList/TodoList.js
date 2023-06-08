import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  // make a request for all todos when component is loading
  useEffect(() => {
    fetch('http://localhost:5000/api/todos')
      .then(res => res.json())
      .then(data => {
        console.log('data: ')
        console.log(data)
        setTodos(data)
      })
  }, []);

  const deleteTodo = (e) => {
    const id = e.target.dataset.id;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id })
    };
    fetch(`http://localhost:5000/api/todos/delete`, requestOptions)
      .then(response => response.json())
      .then(({ status }) => {
        console.log('status: ', status)
        if (status === 'SUCCESS') {
          setTodos(todos.filter(todo => todo._id !== id))
        } else if (status === 'ERROR') {
          alert('oops')
        } else {
          alert('unknown error')
        }
      })
      .catch((e) => alert(e));
  }

  return (
    <>
      <h2><Link to="/">Home</Link> / Todos</h2>
      {todos.map(todo => (
        <p key={todo._id}>
          {`[`}
          <span
            onClick={deleteTodo}
            data-id={todo._id}
            className="delete-link"
          >
            remove
          </span>
          {`]`}
          {todo.label}
          <span class="secondary">{new Date(todo.created_at).toString()}</span>
        </p>
      ))}
    </>
  );
}

export default TodoList
