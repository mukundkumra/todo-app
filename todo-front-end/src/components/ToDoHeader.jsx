import React from 'react';

function ToDoHeader(props) {

  return (
    <div className="heading">
      <h1>{props.title}</h1>
    </div>
  );
}

export default ToDoHeader;