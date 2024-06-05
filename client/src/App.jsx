import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false)
  const [editTodoId, setEditTodoId] = useState(null)
  const [changeTitle, setChangeTitle] = useState('')
  const [changeDescription, setChangeDescription] = useState('')

  useEffect(() => {
    fetchData();
  }, []); // Fetch data once when the component mounts

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data); // Update the state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleChange = (e) => {
    const valueData = e.target.value;
    if (e.target.name === 'title') {
      setTitle(valueData);
    } else if (e.target.name === 'description') {
      setDescription(valueData);
    } else if (e.target.name === 'changeDescription') {
      setChangeDescription(valueData);
    } else if (e.target.name === 'changeTitle') {
      setChangeTitle(valueData);
    }
      
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = { title, description };
    try {
      await axios.post('http://localhost:5000/api/todos', newTodo);
      fetchData(); // Add new todo to the state
      setTitle(''); // Clear input fields
      setDescription(''); // Clear input fields
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }
const handleDelete = async (id) => {
    try{
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id))
    } catch(err) {
      console.error('Error delete todo:', err)
    }
  }

  const handleEdit = async (id) => {
    setIsEdit(true);
    setEditTodoId(id);
    const todoToEdit = todos.find(todo => todo.id === id);
    setChangeTitle(todoToEdit.title);
    setChangeDescription(todoToEdit.description);
  }

  
  const handleEditSubmit = async (id,e) => {
    e.preventDefault();
    const updatedTodo = { title: changeTitle, description: changeDescription};
    console.log(updatedTodo);
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, updatedTodo);
      fetchData(); // Add new todo to the state
      setChangeTitle(''); // Clear input fields
      setChangeDescription(''); // Clear input fields
      setIsEdit(false);
      setEditTodoId(null); //
    } catch (error) {
      console.log('gagal')
      console.error('Error adding todo:', error);
    }
  }

  return (
    <div>
      <div className="judul">
        Todo App
      </div>
      <div className="todo-container">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Title' onChange={handleChange} value={title} name='title' />
          <input type="text" placeholder='Description' onChange={handleChange} value={description} name='description' />
          <button type='submit'>Add</button>
        </form>      
      </div>
      <div className="item-list">
        {todos.map((todo) => (
          <div key={todo.id}>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            <button onClick={()=>handleDelete(todo.id)}>Delete</button>
            <button onClick={()=>handleEdit(todo.id)}>Edit</button>
            {isEdit && editTodoId === todo.id &&
            <form onSubmit={(e) => handleEditSubmit(todo.id,e)}>
              <input type="text" placeholder='Title' onChange={handleChange} value={changeTitle} name='changeTitle' />
              <input type="text" placeholder='Description' onChange={handleChange} value={changeDescription} name='changeDescription' />
              <button type='submit'>Save Changes</button>
            </form>  }
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
