import React from 'react';

// TODO: Add completedTodo prop handler to update state on parent
// TODO: Add removeTodo prop handler to update state on parent

const TodoItem = (...formData) => {
  const handleComplete = () => {};

  const handleDelete = () => {};

  return (
    <li className="todoTitle">{formData.title}</li>
    <li className="todoDescription">{formData.description}</li>
    <li className="todoAuthor">{formData.author}</li>
    <li className="todoBtns">
    <button
        type="button"
        className="completeBtn"
        onClick="handleComplete"
    >
        Complete
    </button>
    <button type="button" className="deleteBtn" onClick="handleDelete">
        Delete
    </button>
    </li>
  );
};

export default TodoItem;
