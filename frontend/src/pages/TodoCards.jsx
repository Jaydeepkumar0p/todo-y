import React from 'react';

const TodoCards = ({ title, body, id, delid, edit }) => {
  return (
    <div className='bg-white p-4 rounded-2xl shadow-md border border-gray-200'>
      <h3 className='text-xl font-semibold text-gray-800'>{title}</h3>
      <p className='text-gray-600 mt-2'>{body}</p>

      <div className='flex justify-end mt-4 space-x-2'>
        <button
          className='px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition'
          onClick={() => edit(id)} // Added edit functionality
        >
          Edit
        </button>

        <button
          className='px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition'
          onClick={() => delid(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCards;
