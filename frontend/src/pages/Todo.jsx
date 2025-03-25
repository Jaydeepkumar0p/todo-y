import React, { useState, useEffect } from 'react';
import TodoCards from './TodoCards';
import Update from './Update';
import axios from 'axios';

const Todo = () => {
  const [array, setArray] = useState([]);
  const [input, setInput] = useState({ title: "", body: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  const [id, setId] = useState(() => sessionStorage.getItem("id"));

  useEffect(() => {
    if (!id) return;
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/v2/getTasks/${id}`);
        setArray(response.data.list || []);
      } catch (error) {
        setError("Failed to fetch tasks.");
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [id]);

  const change = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!input.title || !input.body) {
      setError("Title and description cannot be empty!");
      return;
    }

    try {
      const response = await axios.post(`${window.location.origin}/api/v2/addTask`, {
        title: input.title,
        body: input.body,
        id,
      });

      setArray([...array, response.data.list].flat());
      setInput({ title: "", body: "" });
      setError("");
    } catch (error) {
      setError("Error adding task.");
      console.error("Error adding task:", error);
    }
  };

  const del = async (taskId) => {
    try {
      await axios.delete(`${window.location.origin}/api/v2/deleteTask/${taskId}`, { data: { id } });
      setArray(array.filter((task) => task._id !== taskId));
    } catch (error) {
      setError("Error deleting task.");
      console.error("Error deleting task:", error);
    }
  };

  const edit = (index) => {
    const taskToEdit = array[index];
    setInput({ title: taskToEdit.title, body: taskToEdit.body });
    setEditIndex(taskToEdit._id);
  };

  const updateTask = async () => {
    if (!input.title || !input.body) {
      setError("Title and description cannot be empty!");
      return;
    }

    try {
      await axios.put(`${window.location.origin}/api/v2/updateTask/${editIndex}`, {
        title: input.title,
        body: input.body,
        id,
      });

      setArray(array.map((task) =>
        task._id === editIndex ? { ...task, title: input.title, body: input.body } : task
      ));
      setInput({ title: "", body: "" });
      setEditIndex(null);
      setError("");
    } catch (error) {
      setError("Error updating task.");
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center text-gray-800'>Todo List</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className='mt-6 space-y-4'>
          <input
            type='text'
            name='title'
            onChange={change}
            value={input.title}
            placeholder='Enter title...'
            className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black'
          />

          <textarea
            placeholder='Enter description...'
            name='body'
            value={input.body}
            onChange={change}
            className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black resize-none'
            rows='4'
          />

          {editIndex === null ? (
            <button
              onClick={submit}
              className='w-full bg-black text-white p-3 rounded-xl shadow-md hover:bg-gray-900 transition'
            >
              Add Todo
            </button>
          ) : (
            <Update
              input={input}
              setInput={setInput}
              submit={updateTask}
              cancel={() => {
                setEditIndex(null);
                setInput({ title: "", body: "" });
              }}
            />
          )}

          <div className='mt-6 grid grid-cols-1 gap-4'>
            {array.map((item, index) => (
              <TodoCards
                key={item._id}
                title={item.title}
                body={item.body}
                id={item._id}
                delid={() => del(item._id)}
                edit={() => edit(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
