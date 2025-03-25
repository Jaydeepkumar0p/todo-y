import React from 'react';

const Update = ({ input, setInput, submit, cancel }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <div className='bg-white p-6 rounded-2xl shadow-xl w-full max-w-md'>
      <h2 className='text-2xl font-bold text-center text-gray-800 mb-4'>Update Todo</h2>

      <input
        type='text'
        name='title'
        value={input.title}
        onChange={handleChange}
        placeholder='Enter updated title...'
        className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black mb-4'
      />

      <textarea
        name='body'
        value={input.body}
        onChange={handleChange}
        placeholder='Enter updated description...'
        className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black resize-none mb-4'
        rows='4'
      />

      <div className='flex space-x-3'>
        <button
          onClick={submit}
          className='w-full bg-green-500 text-white p-3 rounded-xl shadow-md hover:bg-green-600 transition'
        >
          Update
        </button>

        <button
          onClick={cancel}
          className='w-full bg-red-500 text-white p-3 rounded-xl shadow-md hover:bg-red-600 transition'
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Update;
