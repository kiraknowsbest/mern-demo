import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [todoContent, setTodoContent] = useState('')
  const handleChange = (e) => {
    setTodoContent(e.target.value)
  };

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      return createTodo();
    }
  }

  const createTodo = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label: todoContent })
    };
    fetch(`http://localhost:5000/api/todos/create`, requestOptions)
      .then(response => response.json())
      .then(({ status }) => {
        console.log('status: ', status)
        if (status === 'SUCCESS') {
          setTodoContent('')
        } else if (status === 'ERROR') {
          alert('oops')
        } else {
          alert('unknown error')
        }
      })
      .catch((e) => alert(e));
  };

  return (
    <>
      <h2>Todo Home</h2>
      <p>make some <Link to="/todos">todos</Link> so that you can remember what needs to be done</p>
      <label>
        What's your todo?
        <input
          name="todo"
          placeholder="walk the dog"
          value={todoContent}
          onChange={handleChange}
          onKeyUp={onKeyUp}
        />
      </label>
      <button
        onClick={createTodo}
      >
        Create!
      </button>
    </>
  )
}

export default Home
